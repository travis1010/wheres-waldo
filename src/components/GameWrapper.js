import '../styles/GameWrapper.css'
import CharMenu from './CharMenu'
import Scoreboard from './Scoreboard';
import GameOver from './GameOver';

import LevelImages from './LevelImages'


import { useEffect, useState } from 'react';

import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, setDoc, doc } from 'firebase/firestore/lite';

export const firebaseConfig = {
  apiKey: "AIzaSyBG1TfEZt9gFQ-NIPFHR1kVFsCLlpnAyQA",
  authDomain: "wheres-waldo-e27c9.firebaseapp.com",
  projectId: "wheres-waldo-e27c9",
  storageBucket: "wheres-waldo-e27c9.appspot.com",
  messagingSenderId: "421477815179",
  appId: "1:421477815179:web:acbc4cd9a8335d1e4c158e"
};



function GameWrapper(props) {
  const [level, setLevel] = useState(null);
  const [charsFound, setCharsFound] = useState({"Waldo": false, "Odlaw": false, "Wizard": false});
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const [image, setImage] = useState(null);
  const [highScore, setHighScore] = useState([]);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  let seconds = 0;
  

  async function loadLevel(levelName) {
    setImage(LevelImages[levelName])
    const docRef = doc(db, 'wheres-waldo', 'levels');
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const levels = docSnapshot.data()
      console.log({levels});
      setLevel(levels[levelName]);
      loadLevelScores();
    } else {
      console.log('error!! doc not found');
    }
  }

  async function loadLevelScores() {
    const docRef = doc(db, 'high-scores', props.level);
    const docSnapshot = await getDoc(docRef);
    
    if (docSnapshot.exists()) {
      console.log(docSnapshot.data().scores)
      setHighScore(docSnapshot.data().scores);
    } else {
      console.log('error!! doc not found');
    }
  }
    
  

  function checkForChar(char, x, y) {
    document.querySelector('.CharMenu').classList.remove('visible');
    if (x > level[char].minX && x < level[char].maxX && y > level[char].minY && y < level[char].maxY) {
      console.log('hittttt')
      const charsFoundCopy = {...charsFound};
      charsFoundCopy[char] = true;
      setCharsFound({...charsFoundCopy});
      document.getElementById(`${char}Check`).style.visibility = 'visible';
    }
  }

  function startTimer() {
    let myTimer = setInterval(incrementSeconds, 1000);
    setTimer(myTimer);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  function incrementSeconds() {
    seconds++;
    setTime(seconds);
  }

  function showGameOver() {
    document.querySelector('.GameOver').style.display = 'flex';
  }

  function hideGameOver() {
    document.querySelector('.GameOver').style.display = 'none';
  }

  function showHighScore() {
    document.querySelector('.highScoreForm').style.display = 'flex';
  }

  function hideHighScore() {
    document.querySelector('.highScoreForm').style.display = 'none';
  }

  function checkHighScore(currentScore) {
    for(const score of highScore.slice(0, 10)) {
      if(currentScore < score.score) {
        return true;
      }
    }
    return false;
  }

  async function addHighScore(e) {
    e.preventDefault();
    console.log(e.target.form.name)
    const name = e.target.form.name.value;
    const newItem = {name: name, score: time}
    const tempHighScore = [...highScore, newItem]
    tempHighScore.sort((a, b) => (a.score > b.score) ? 1 : -1)
    console.log(tempHighScore)
    setHighScore(tempHighScore);
    const docRef = doc(db, 'high-scores', props.level);
    await setDoc(docRef, {scores: tempHighScore}, {merge: true})
    props.highScores();
  }

  useEffect(() => {
    console.log(highScore)
  }, [highScore])


  useEffect(() => {
    console.log(charsFound);
    if(charsFound.Waldo && charsFound.Odlaw && charsFound.Wizard) {
      console.log('you won in ' + time + ' seconds!')
      stopTimer();
      showGameOver();
      if (checkHighScore(time)) {
        console.log('high score!');
        showHighScore();
      } else {
        console.log('not a high score');
        hideHighScore();
      }
    }
  }, [charsFound])
  
  useEffect(() => {
    loadLevel(props.level);
    startTimer();
  }, [])


  return (
    <div className='GameWrapper'>
      <Scoreboard time={time} levelSelect={props.levelSelect} highScores={props.highScores}/>
      <CharMenu checkForChar={checkForChar}/>
      <img className='levelImage' src={image}/>
      <GameOver time={time} levelSelect={props.levelSelect} highScores={props.highScores} addHighScore={addHighScore}/>
    </div>
  );
}


export default GameWrapper;

