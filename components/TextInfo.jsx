import { useState } from 'react';
import './übung.css';

const InteractiveAlphabet = () => {
  const [displayLetter, setDisplayLetter] = useState('A');
  
  // Create alphabet array and split it into two rows
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const midpoint = Math.ceil(alphabet.length / 2);
  const firstRow = alphabet.slice(0, midpoint);
  const secondRow = alphabet.slice(midpoint);

  return (
    <div className="container">
    <div className='gradient'></div>
        <div className="upper-section">
            <div className="info-section">
            <p>Hover over any letter in the alphabet grid below to display it in the right panel.</p>
            <p>The alphabet is split into two rows for easier visualization.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, quos vitae ea, earum nobis asperiores error reiciendis laudantium dolorum recusandae odit distinctio ad. Ea consequuntur explicabo distinctio reiciendis blanditiis quibusdam.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, maiores repudiandae sapiente pariatur molestias, atque sint recusandae sit nesciunt, possimus nobis! Asperiores reiciendis debitis porro tempora facere error, labore dolore.</p>
            </div>
            <div className="display-section">
            {displayLetter}
            </div>
      </div>
      
      <div className="alphabet-grid">
        <h2>Fructure</h2>
        <div className="alphabet-row">
          {firstRow.map((letter) => (
            <div
              key={letter}
              className="letter"
              onMouseEnter={() => setDisplayLetter(letter)}
              onMouseLeave={() => setDisplayLetter('')}
            >
              {letter}
            </div>
          ))}
        </div>
        <div className="alphabet-row">
          {secondRow.map((letter) => (
            <div
              key={letter}
              className="letter"
              onMouseEnter={() => setDisplayLetter(letter)}
              onMouseLeave={() => setDisplayLetter('')}
            >
              {letter}
            </div>
          ))}
        </div>
      </div>
      <button className='get-font'>Get Font</button>
    </div>
  );
};

export default InteractiveAlphabet;