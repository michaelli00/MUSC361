import React, { useState } from 'react';
import Container from 'react-bootstrap/container';
import Row from 'react-bootstrap/row';
import Select from 'react-select'
import Abcjs from 'react-abcjs';
import { 
  TWELVE_TONE_DROPDOWN_OPTIONS,
  TWELVE_TONE_TO_NOTE_MAPPING 
} from '../../utils/Constants';

import './PitchMultiplication.css';

function PitchMultiplication() {
  const [pm1Selection, setPM1Selection] = useState([]);
  const [pm2Selection, setPM2Selection] = useState([]);

  const handlePM1Changes = (vals) => {
    const newPM1 = vals.map(val=>val.value);
    newPM1.sort((a,b) => a - b);
    setPM1Selection(newPM1);
  };

  const handlePM2Changes = (vals) => {
    const newPM2 = vals.map(val=>val.value);
    newPM2.sort((a,b) => a - b);
    setPM2Selection(newPM2);
    
  };

  const pm1NotesString = pm1Selection.length === 1 ? `${TWELVE_TONE_TO_NOTE_MAPPING[pm1Selection[0]]}2` : `${pm1Selection.map(v => TWELVE_TONE_TO_NOTE_MAPPING[v]).join('2')}2`;
  const pm2NotesString = pm2Selection.length === 1 ? `${TWELVE_TONE_TO_NOTE_MAPPING[pm2Selection[0]]}2` : `${pm2Selection.map(v => TWELVE_TONE_TO_NOTE_MAPPING[v]).join('2')}2`;

  const pmResultSet = new Set();
  pm1Selection.map(p1 => pm2Selection.map(p2 => pmResultSet.add((p1 + p2) % 12)));
  const pmResultSelection = [...pmResultSet];
  pmResultSelection.sort((a,b) => a - b);
  const pmResultString = pmResultSelection.length === 1 ? `${TWELVE_TONE_TO_NOTE_MAPPING[pmResultSelection[0]]}2` : `${pmResultSelection.map(v => TWELVE_TONE_TO_NOTE_MAPPING[v]).join('2')}2`;

  return (
    <Container className="PitchMultiplication">
      <Row>
        <h1>Pitch Multiplication</h1>
      </Row>
      <Row className="pitch-multiplication-row">
        <div className="pm-operand-title">
          <h3>Select Pitch Classes for the First Operand</h3>
          <Select
            isMulti
            closeMenuOnSelect={false}
            escapeClearsValue={false}
            isSearchable={false}
            placeholder="Select pitch classes"
            options={TWELVE_TONE_DROPDOWN_OPTIONS}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handlePM1Changes}
          />
        </div>
        <Abcjs
          abcNotation={`X:1\nK:C\nL:4\n${pm1NotesString}`}
          parserParams={{}}
          engraverParams={{}}
          renderParams={{ viewportHorizontal: true }}
        />
        <div className="row-info">
          {pm1Selection.length ? `Pitch classes used: ${pm1Selection.join(', ')}` : ''}
        </div>
      </Row>
      <Row className="pitch-multiplication-row">
        <div className="pm-operand-title">
          <h3>Select Pitch Classes for the Second Operand</h3>
          <Select
            isMulti
            closeMenuOnSelect={false}
            escapeClearsValue={false}
            isSearchable={false}
            placeholder="Select pitch classes"
            options={TWELVE_TONE_DROPDOWN_OPTIONS}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handlePM2Changes}
          />
        </div>
        <Abcjs
          abcNotation={`X:1\nK:C\nL:4\n${pm2NotesString}`}
          parserParams={{}}
          engraverParams={{}}
          renderParams={{ viewportHorizontal: true }}
        />
        <div className="row-info">
          {pm2Selection.length ? `Pitch classes used: ${pm2Selection.join(', ')}` : ''}
        </div>
      </Row>
      <Row className="pitch-multiplication-row">
        <h3>Resulting Pitch Classes from Pitch Multiplication</h3>
        <Abcjs
          abcNotation={`X:1\nK:C\nL:4\n${pmResultString}`}
          parserParams={{}}
          engraverParams={{}}
          renderParams={{ viewportHorizontal: true }}
        />
        <div className="row-info">
          {pmResultSelection.length ? `Resulting pitch classes: ${pmResultSelection.join(', ')}` : ''}
        </div>
      </Row>
    </Container>
  );
}

export default PitchMultiplication;
