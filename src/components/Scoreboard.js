import '../styles/Scoreboard.css'

import waldo from '../images/waldo.png'
import odlaw from '../images/odlaw.png'
import wizard from '../images/wizard.png'

function Scoreboard(props) {
  return (
    <div className='Scoreboard'>
      <h2>Where's Waldo?</h2>
      <button onClick={props.levelSelect}>Level Select</button>
      <div className='chars'>
        <div className='char'>
          <div id="WaldoCheck" className='checkMark'>&#10004;</div>
          <img src={waldo}/>
          <label>Waldo</label>
        </div>
        <div className='char'>
        <div id="OdlawCheck"className='checkMark'>&#10004;</div>
          <img src={odlaw}/>
          <label>Odlaw</label>
        </div>
        <div className='char'>
        <div id="WizardCheck" className='checkMark'>&#10004;</div>
          <img src={wizard} />
          <label>Wizard</label>
        </div>
      </div>
      <button onClick={props.highScores}>High Scores</button>
      <div className='timer'>Time: {props.time}s</div>
    </div>
  );
}

export default Scoreboard;