import LevelImages from './LevelImages'
import '../styles/LevelSelect.css';

function LevelSelect(props) {
  return (
    <div className="LevelSelect">
      <button className='viewHighScores' onClick={props.highScores}>High Scores</button>
      <h1>Where's Waldo?</h1>
      <h2> Select Level </h2>
      
      <div className='levelContainer'>
        <img src={LevelImages.Beach} onClick={() => props.loadLevel('Beach')}/>
        <img src={LevelImages.Fruits} onClick={() => props.loadLevel('Fruits')}/>
        <img src={LevelImages.Hollywood} onClick={() => props.loadLevel('Hollywood')}/>
        <img src={LevelImages.Ski} onClick={() => props.loadLevel('Ski')}/>
        <img src={LevelImages.Space} onClick={() => props.loadLevel('Space')}/>
        <img src={LevelImages.Track} onClick={() => props.loadLevel('Track')}/>
      </div>
    </div>
  );
}

export default LevelSelect;