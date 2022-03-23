import '../styles/LevelScores.css'
import { useEffect } from "react";
import LevelImages from './LevelImages'

function LevelScores(props) {
  const backgroundStyle = {
    backgroundImage: 'url(' + LevelImages[props.level] + ')',
  }
  
  useEffect(() => {
  
  }, [])
  return(
    <div className="LevelScores">
      
      <ol type="1">
      {
        props.scores.map((item, index) => (
          <li key={index}>
            <div className='scoreRow'>
              <span>{item.name}</span>
              <span>{item.score} s</span>
            </div>
          </li>
        ))
      }
      </ol>
      <div className='levelBackground' style={backgroundStyle}></div>
    </div>
  )
}

export default LevelScores;