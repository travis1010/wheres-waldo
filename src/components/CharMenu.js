import { useEffect, useState } from 'react';
import '../styles/CharMenu.css'

function CharMenu(props) {
  const [px, setPx] = useState(null);
  const [py, setPy] = useState(null);

  useEffect(() => {
    const charMenu = document.querySelector('.CharMenu');
    const levelImage = document.querySelector('.levelImage')
    //show menu on click
    levelImage.addEventListener('click', (event) => {
      event.preventDefault();

      const {clientX: mouseX, clientY: mouseY } = event;
      charMenu.style.top = `${mouseY}px`
      charMenu.style.left = `${mouseX}px`

      if (charMenu.classList.contains('visible')) {
        charMenu.classList.remove('visible');
      } else {
        charMenu.classList.add('visible');
      }
      


      const bounds = levelImage.getBoundingClientRect();
      const left = bounds.left;
      const top = bounds.top;
      const x = mouseX - left;
      const y = mouseY - top;
      const cw = levelImage.clientWidth;
      const ch = levelImage.clientHeight;
      const iw = levelImage.naturalWidth;
      const ih = levelImage.naturalHeight;
      setPx(Math.round(x / cw * iw));
      setPy(Math.round(y / ch * ih));
    });
  }, [])


  useEffect(() => {
    console.log(px, py);
  }, [py])

  return (
    <div className="CharMenu">
      <div className="charOption" onClick={() => {props.checkForChar('Waldo', px, py)}}>Waldo</div>
      <div className="charOption" onClick={() => {props.checkForChar('Odlaw', px, py)}}>Odlaw</div>
      <div className="charOption" onClick={() => {props.checkForChar('Wizard', px, py)}}>Wizard</div>
    </div>
  );
}

export default CharMenu;