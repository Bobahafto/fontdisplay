// import React from 'react';
import './übung.css';

const ScrollingText = () => {
    const text = "HaygoodLaryszDigitalSolutions";
    
    const repeatedText = Array(4).fill(text);
  
    return (
      <div className="scrolling-container">
        <button className='back'>Back
        </button>
        <div className="scrolling-wrapper">
          {repeatedText.map((text, index) => (
            <span key={index} className="scrolling-text">
              {text}
            </span>
          ))}
        </div>
      </div>
      
    );
  };
  
  export default ScrollingText;