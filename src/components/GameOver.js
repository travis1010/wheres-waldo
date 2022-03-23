import '../styles/GameOver.css'

function GameOver(props) {
  return (
    <div className="GameOver">
      <div className='messageBox'>
        <h2>Congratulations!<br/>You won in {props.time} seconds.</h2>
        <form className='highScoreForm'>
          <h2>You got a high score!</h2>
          <div>
            <input id='name' name='name' type='text' placeholder='Name' required/>
            <button onClick={props.addHighScore}>Enter Name</button>
          </div>
        </form>
        <button onClick={props.levelSelect}>New Level</button>
        <button onClick={props.highScores}>High Scores</button>
      </div>
    </div>
  )
}

export default GameOver;