import { useState, useRef, useEffect } from 'react';
import './übung.css';

import AlignLeftIcon from "../src/Assets/SVG/align-left.svg";
import AlignCenterIcon from "../src/Assets/SVG/align-center.svg";
import CrossIcon from "../src/Assets/SVG/Cross.svg";



function Gtex() {
  const [displayLetter, setDisplayLetter] = useState('A');
  const [text, setText] = useState('GAZUS');
  const [previousText, setPreviousText] = useState('STREAM'); // Speichert den vorherigen Zustand
  const [isUpperCase, setIsUpperCase] = useState(true);
  const [fontWeight, setFontWeight] = useState('400');
  const [letterSpacing, setLetterSpacing] = useState('0');
  const [isGlowing, setIsGlowing] = useState(false);
  const [fontSize, setFontSize] = useState(18); // Startgröße in rem
  const [lineHeight, setLineHeight] = useState(1.2); // Startzeilenhöhe
  const [isSingleLine, setIsSingleLine] = useState(true); // Kontrolliert, ob der Text einzeilig bleibt
  const [hasClicked, setHasClicked] = useState(false); // Überwachung, ob in die Textarea geklickt wurde
  const [textAlign, setTextAlign] = useState('center'); // Neue State für Textausrichtung
  const [isLoremActive, setIsLoremActive] = useState(false); // Kontrolliert, ob der Lorem Ipsum Text aktiv ist
  const textareaRef = useRef(null);
  const containerRef = useRef(null);

  const MIN_FONT_SIZE = 8; // Mindestgröße in rem für normalen Text
  const MAX_FONT_SIZE = 15; // Maximale Schriftgröße
  const LOREM_FONT_SIZE = 3; // Schriftgröße für Lorem Ipsum (kann angepasst werden)
  const PADDING = 30; // Abstand in Pixel!!! Textinput border rand

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const LOREM_TEXT = `The quick brown fox moves across an open field passing tall trees and narrow paths its sharp eyes scanning the distance a light breeze sweeps over the land shifting leaves and grass in a constant pattern far beyond the horizon a city rises with structures built from glass and steel reflecting the pale sky sounds of footsteps and voices echo between the buildings as people navigate the busy streets

  the sky changes slowly from pale blue to a deeper shade as the sun lowers and light begins to fade in the streets headlights illuminate the roads shadows stretch across the sidewalks while windows glow with warm interior light a train passes in the distance its sound blending into the general noise of the city the fox stops for a moment listening its ears turning to catch the subtle changes in its surroundings before moving forward again
  
  streetlights turn on one by one casting a yellowish glow on wet asphalt reflections of signs and buildings create fragments of color on the surface of the road the air cools down and a faint smell of rain lingers in the streets people continue walking their paces varying some rushing others taking their time the fox remains a silent observer moving unseen through the cityscape.`;

  const updateDisplay = (letter) => {
    const newLetter = isUpperCase ? letter.toUpperCase() : letter.toLowerCase();
    setDisplayLetter(newLetter);
    setIsGlowing(true);
    setTimeout(() => setIsGlowing(false), 3000);
  };

  useEffect(() => {
    const adjustTextSize = () => {
      const editableText = textareaRef.current;
      const container = containerRef.current;

      if (!editableText || !container) return;

      const containerWidth = container.offsetWidth - PADDING * 2;
      const containerHeight = container.offsetHeight - PADDING * 2;

      let newFontSize = isLoremActive ? LOREM_FONT_SIZE : MAX_FONT_SIZE;
      let allowLineBreak = false;

      const tempSpan = document.createElement('span');
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.whiteSpace = 'nowrap';
      tempSpan.style.fontSize = `${newFontSize}rem`;
      tempSpan.style.lineHeight = `${lineHeight}`;
      tempSpan.style.fontFamily = 'Roboto, sans-serif';
      tempSpan.textContent = text;
      document.body.appendChild(tempSpan);

      while (
        (tempSpan.offsetWidth > containerWidth || tempSpan.offsetHeight > containerHeight) &&
        newFontSize > (isLoremActive ? 2.5 : MIN_FONT_SIZE)
      ) {
        newFontSize -= 0.5;
        tempSpan.style.fontSize = `${newFontSize}rem`;
      }

      if (newFontSize <= (isLoremActive ? 2.5 : MIN_FONT_SIZE)) {
        allowLineBreak = true;
        tempSpan.style.whiteSpace = 'normal';
      }

      if (allowLineBreak) {
        while (
          tempSpan.offsetHeight > containerHeight &&
          newFontSize > (isLoremActive ? 2.5 : MIN_FONT_SIZE)
        ) {
          newFontSize -= 0.5;
          tempSpan.style.fontSize = `${newFontSize}rem`;
        }
      }

      document.body.removeChild(tempSpan);

      setFontSize(newFontSize);
      setIsSingleLine(!allowLineBreak);
      editableText.style.textAlign = textAlign;
    };

    adjustTextSize();
  }, [text, fontSize, textAlign, isLoremActive]);
  

  const handleTextChange = (event) => {
    const newText = event.target.value;

    if (!hasClicked) {
      setHasClicked(true);
      setText('');
    } else {
      setText(newText);
    }

    if (newText.length > 0) {
      const cursorPos = event.target.selectionStart;
      if (cursorPos > 0) {
        updateDisplay(newText[cursorPos - 1]);
      }
    }
  };

  const [isButtonsRight, setIsButtonsRight] = useState(false);

  const handleTextareaClick = () => {
    if (!hasClicked) {
      setHasClicked(true);
      setText('');
    }
  };

  const toggleCase = () => {
    setIsUpperCase(!isUpperCase);
  };

  const alignTextLeft = () => {
    setTextAlign('left');
  };

  const alignTextCenter = () => {
    setTextAlign('center');
  };

  const toggleLoremText = () => {
    setIsLoremActive((prev) => {
      if (prev) {
        setText(previousText); // Zurück zum vorherigen Zustand
        setFontSize(MAX_FONT_SIZE); // Zurück zur ursprünglichen Größe
        setTextAlign('center'); // Zurück zur Standardausrichtung
      } else {
        setPreviousText(text); // Speichert den aktuellen Zustand
        setText(LOREM_TEXT);
        setFontSize(LOREM_FONT_SIZE); // Schriftgröße für Lorem Ipsum
        setTextAlign('left'); // Anfangsstatus: linksausgerichtet
      }
      return !prev;
    });
  };

  const handleLetterClick = (letter) => {
    const cursorPos = textareaRef.current.selectionStart;

    if (!hasClicked) {
      setHasClicked(true);
      setText(letter);
    } else {
      const newLetter = isUpperCase ? letter : letter.toLowerCase();
      const newText = text.slice(0, cursorPos) + newLetter + text.slice(cursorPos);
      setText(newText);
    }

    updateDisplay(letter);

    const handleMouseDown = (letter) => {
      handleLetterInput(letter); // Startet sofort einen Buchstaben
      repeatInterval.current = setInterval(() => handleLetterInput(letter), 100); // Fügt Buchstaben wiederholt hinzu
    };

    const handleMouseUp = () => {
      clearInterval(repeatInterval.current); // Stoppt Wiederholung
    };

    const handleMouseLeave = () => {
      clearInterval(repeatInterval.current); // Stoppt Wiederholung, falls Maus den Button verlässt
    };

    // Scrollen der Textarea erzwingen
    setTimeout(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.setSelectionRange(cursorPos + 1, cursorPos + 1);
        textarea.scrollTop = textarea.scrollHeight; // Text nach oben erweitern
      }
    }, 0);
  };

  const handleWeightButtonClick = (weight) => {
    setFontWeight(weight);
  };

  const clearText = () => {
    setText('');
    setDisplayLetter('');
  };

  const weightOptions = [100, 400,  700, 900];   //Hier Zahlenwerte vorgeben, im Weight dropdown benennen
  const getClosestWeight = (value) => {
    return weightOptions.reduce((prev, curr) => 
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
  };


  return (
    <div
      id="panel"
      ref={containerRef}
      className={isLoremActive ? 'lorem-active' : ''} // Dynamisch Klasse hinzufügen
      style={{ padding: `${PADDING}px`, boxSizing: 'border-box' }}
    >
      <section className="input-section">
        <div className="font-name">
          <label>G-Tex</label>
          

          </div>
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            id="textinput-gtex"
            value={text}
            onChange={handleTextChange}
            onClick={handleTextareaClick}
            placeholder=" "
            style={{
              fontWeight,
              letterSpacing: `${letterSpacing}px`,
              fontSize: `${fontSize}rem`,
              lineHeight: "1.0",  // Direkte Zuweisung Lineheight im Textcontainer
              lineHeight: isLoremActive ? "1.09" : "1.2",  // Dynamische Line Height
              padding: isLoremActive ? "0px 22rem 0px 22rem" : " 3.5rem 8rem 0rem 8rem",   // Unterschiedliches Padding je nach Modus ######################
              whiteSpace: isSingleLine ? 'nowrap' : 'normal',
              textAlign,
              overflow: 'hidden',

              width: '100%',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div className="slider-container">
  <div className="slider-group">
    <label>Spacing</label>
    <input
      type="range"
      id="spacingSlider"
      min="-50"
      max="40"
      value={letterSpacing}
      className="slider"
      onChange={(e) => setLetterSpacing(e.target.value)}
    />
    <span id="spacingValue">{letterSpacing}px</span>
  </div>



  <div className="align-buttons">
  <button className="styled-button align-left-button" onClick={alignTextLeft}>
  <img
    src={AlignLeftIcon}
    alt="Align Left"
   
  />

</button>
<button className="styled-button align-center-button" onClick={alignTextCenter}>
  <img
    src={AlignCenterIcon}
    alt="Align Center"

  />
  
</button>
  <button className="styled-button lorem-ipsum" onClick={toggleLoremText}>
    {isLoremActive ? 'Display' : 'Reading'}
  </button>
</div>





             
  <div className="weight-buttons">
    {['100', '400', '700', '900'].map((weight, index) => (
      <button
        key={weight}
        onClick={() => handleWeightButtonClick(weight)}
      >
        {['Light', 'Normal', 'Bold', 'Black'][index]}
      </button>
    ))}
  </div>
</div>
      </section>

      <div id="top-section-gtex">
        <section id="displaySection">
          <div id="displayLetter-gtex" className={isGlowing ? 'glow' : ''}
          style={{ fontWeight }}
          >
            {displayLetter}
            
          </div>
        </section>

        <section id="alphabetPanel-gtex">
          <div id="reihe-1" className="letter-row">
            {alphabet.slice(0, 9).map((letter) => (
              <div
                key={letter}
                className="letter-button"
                style={{ fontWeight }}
                onMouseEnter={() => updateDisplay(letter)}
                onClick={() => handleLetterClick(letter)}
              >
                {isUpperCase ? letter : letter.toLowerCase()}
              </div>
            ))}
          </div>
          <div id="reihe-2" className="letter-row">
            {alphabet.slice(9, 18).map((letter) => (
              <div
                key={letter}
                className="letter-button"
                style={{ fontWeight }}
                onMouseEnter={() => updateDisplay(letter)}
                onClick={() => handleLetterClick(letter)}
              >
                {isUpperCase ? letter : letter.toLowerCase()}
              </div>
            ))}
          </div>
          <div id="reihe-3" className="letter-row">
            {alphabet.slice(18).map((letter) => (
              <div
                key={letter}
                className="letter-button"
                style={{ fontWeight }}
                onMouseEnter={() => updateDisplay(letter)}
                onClick={() => handleLetterClick(letter)}
              >
                {isUpperCase ? letter : letter.toLowerCase()}
              </div>
            ))}
            <div className="button-column">
          
              <div
                id="clear-btn-big"
                className="letter-button"
                onClick={clearText}
              >
               <img
    src={CrossIcon}
    alt="CrossIcon" >
  </img>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Gtex