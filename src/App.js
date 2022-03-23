import './styles/App.css'
import GameWrapper from './components/GameWrapper';
import LevelSelect from './components/LevelSelect';
import HighScores from './components/HighScores';
import {  useState } from 'react';


function App() {
  const [state, setState] = useState('levelSelect');
  const [level, setLevel] = useState('');

  function loadLevel(name) {
    setLevel(name)
    setState('game');
  }

  function levelSelect() {
    setState('levelSelect');
  }

  function highScores() {
    setState('scores');
  }
 
  return (
    <div className="App">
      {state === 'levelSelect' && <LevelSelect loadLevel={loadLevel} highScores={highScores}/>}
      {state === 'game' && <GameWrapper level={level} levelSelect={levelSelect} highScores={highScores}/>}
      {state === 'scores' && <HighScores levelSelect={levelSelect} />}
    </div>
  );
}

export default App;
