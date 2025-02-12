import { useState, useRef } from 'react'

import './übung.css'

function Übung() {
    const [displayLetter, setDisplayLetter] = useState('A');
    const [text, setText] = useState('STREAM');
    const [isUpperCase, setIsUpperCase] = useState(true);
    const [fontWeight, setFontWeight] = useState('400');
    const [letterSpacing, setLetterSpacing] = useState('0');
    const [isGlowing, setIsGlowing] = useState(false);
    const textareaRef = useRef(null);
  
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const MAX_LENGTH = 12;
  
    const updateDisplay = (letter) => {
      setDisplayLetter(letter);
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 3000);
    };
  
    const handleTextChange = (event) => {
      const newText = event.target.value;
      if (newText.length <= MAX_LENGTH) {
        setText(newText);
        if (newText.length > 0) {
          const cursorPos = event.target.selectionStart;
          if (cursorPos > 0) {
            updateDisplay(newText[cursorPos - 1]);
          }
        }
      }
    };
  
    const handleLetterClick = (letter) => {
      if (textareaRef.current) {
        const cursorPos = textareaRef.current.selectionStart;
        const newLetter = isUpperCase ? letter : letter.toLowerCase();
        const newText = text.slice(0, cursorPos) + newLetter + text.slice(cursorPos);
        
        if (newText.length <= MAX_LENGTH) {
          setText(newText);
          updateDisplay(newLetter);
          // Set cursor position after inserted letter
          setTimeout(() => {
            textareaRef.current.setSelectionRange(cursorPos + 1, cursorPos + 1);
          }, 0);
        }
      }
    };
  
    const handleLetterHover = (letter) => {
      updateDisplay(isUpperCase ? letter : letter.toLowerCase());
    };
  
    const toggleCase = () => {
      setIsUpperCase(!isUpperCase);
    };
  
    const handleWeightChange = (event) => {
      setFontWeight(event.target.value);
    };
  
    const handleSpacingChange = (event) => {
      setLetterSpacing(event.target.value);
    };
  
    const handleWeightButtonClick = (weight) => {
      setFontWeight(weight);
    };


// Ab hier bearbeiten
  return (
    //Div für gesamten Font Displayer
        <div id="panel">
          <section className="input-section">
            <div className='font-name'>
              <label>Roboto</label>
            </div>
            <div className="input-wrapper">
              <textarea 
                ref={textareaRef}
                id="textinput-graber"
                value={text}
                onChange={handleTextChange}
                placeholder="Type here (max 20 characters)..."
                maxLength={MAX_LENGTH}
                style={{
                  fontWeight,
                  letterSpacing: `${letterSpacing}px`
                }}
              />
            </div>
            
            <div className="slider-container">
              <div className="slider-group">
                <label>Weight</label>
                <input
                  type="range"
                  id="weightSlider"
                  min="100"
                  max="900"
                  step="100"
                  value={fontWeight}
                  className="slider"
                  onChange={handleWeightChange}
                />
                <span id="weightValue">{fontWeight}</span>
              </div>
              
              <div className="slider-group">
                <label>Spacing</label>
                <input
                  type="range"
                  id="spacingSlider"
                  min="-50"
                  max="40"
                  value={letterSpacing}
                  className="slider"
                  onChange={handleSpacingChange}
                />
                <span id="spacingValue">{letterSpacing}px</span>
              </div>
              
              <div className="weight-buttons">
                {['100', '400', '700', '900'].map((weight, index) => (
                  <button
                    key={weight}
                    className="weight-btn"
                    data-weight={weight}
                    onClick={() => handleWeightButtonClick(weight)}
                  >
                    {['Light', 'Normal', 'Bold', 'Black'][index]}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="char-count">
              {text.length} / {MAX_LENGTH}
            </div>
          </section>

          <div id="top-section-graber">
            <section id="displaySection">
              <div id="displayLetter-graber" className={isGlowing ? 'glow' : ''}>
                {displayLetter}
              </div>
            </section>
    
            <section id="alphabetPanel-graber">
              <div id="reihe-1" className="letter-row">
                {alphabet.slice(0, 9).map((letter) => (
                  <div
                    key={letter}
                    className="letter-button"
                    data-letter={letter}
                    onMouseEnter={() => handleLetterHover(letter)}
                    onClick={() => handleLetterClick(letter)}
                  >
                    {isUpperCase ? letter : letter.toLowerCase()}
                  </div>
                ))}
              </div>
              <div id='reihe-2' className="letter-row">
                {alphabet.slice(9, 18, ).map((letter) => (
                  <div
                    key={letter}
                    className="letter-button"
                    data-letter={letter}
                    onMouseEnter={() => handleLetterHover(letter)}
                    onClick={() => handleLetterClick(letter)}
                  >
                    {isUpperCase ? letter : letter.toLowerCase()}
                  </div>
                ))}
              </div>
              <div id='reihe-3' className="letter-row">
                {alphabet.slice(19).map((letter) => (
                  <div
                    key={letter}
                    className="letter-button"
                    data-letter={letter}
                    onMouseEnter={() => handleLetterHover(letter)}
                    onClick={() => handleLetterClick(letter)}
                  >
                    {isUpperCase ? letter : letter.toLowerCase()}
                  </div>
                ))}
              </div>
              <div className="letter-row" />
              <div id='shift-btn'
                className={`shift-button ${!isUpperCase ? 'active' : ''}`}
                onClick={toggleCase}
              >
                ⇧
              </div>
            </section>
          </div>
        </div>
      );
    };
  

export default Übung
