import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, setDoc, doc, addDoc } from 'firebase/firestore/lite';
import { useEffect, useState } from "react";
import { firebaseConfig } from './GameWrapper';
import LevelScores from "./LevelScores";
import '../styles/HighScores.css'

function HighScores(props) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [scores, setScores] = useState({});

  useEffect(() => {
    async function loadScores() {
      const tempScores = {};
      const levels = ['Beach', 'Fruits', 'Hollywood', 'Ski', 'Space', 'Track']
      for (const level of levels) {
        const docRef = doc(db, 'high-scores', level);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          tempScores[level] = docSnapshot.data().scores.slice(0, 10);
        } else {
          console.log('error!! doc not found');
        }
      }
      setScores(tempScores);
    }
    loadScores();
  }, [])

  return (
    <div className="HighScores">
      <button onClick={props.levelSelect}>Back</button>
      <h1>High Scores</h1>

      <div className="HighScoresContainer">
        {
          Object.keys(scores).map((key) => (
            <LevelScores key={key} scores={scores[key]} level={key}/>
          ))
        }
      </div>
    </div>
  )
}

export default HighScores;


