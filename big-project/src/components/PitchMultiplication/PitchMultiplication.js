import React, { useState } from 'react';
import Container from 'react-bootstrap/container';
import Row from 'react-bootstrap/row';
import Col from 'react-bootstrap/col';
import Multiselect from 'multiselect-react-dropdown';
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
    const newPM1 = vals.map(val=>val.key);
    newPM1.sort((a,b) => a - b);
    setPM1Selection(newPM1);
  };

  const handlePM2Changes = (vals) => {
    const newPM2 = vals.map(val=>val.key);
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
        <Col md={4}>
          <Multiselect
            disablePreSelectedValues
            showCheckbox={true}
            displayValue="key"
            closeOnSelect={false}
            placeholder="Select pitch classes"
            avoidHighlightFirstOption={true}
            hidePlaceholder={true}
            options={TWELVE_TONE_DROPDOWN_OPTIONS}
            onSelect={handlePM1Changes} 
            onRemove={handlePM1Changes} 
          />
        </Col>
        <Col md={4}>
          <Abcjs
            abcNotation={`X:1\nK:C\nL:4\n${pm1NotesString}`}
            parserParams={{}}
            engraverParams={{ responsive: 'resize' }}
            renderParams={{ viewportHorizontal: true }}
          />
        </Col>
        <Col md={4}>
          {pm1Selection.length ? `Pitch classes used: ${pm1Selection.join(', ')}` : ''}
        </Col>
      </Row>
      <Row className="pitch-multiplication-row">
        <Col md={4}>
          <Multiselect
            disablePreSelectedValues
            displayValue="key"
            showCheckbox={true}
            closeOnSelect={false}
            placeholder="Select pitch classes"
            avoidHighlightFirstOption={true}
            hidePlaceholder={true}
            options={TWELVE_TONE_DROPDOWN_OPTIONS}
            onSelect={handlePM2Changes} 
            onRemove={handlePM2Changes} 
          />
        </Col>
        <Col md={4}>
          <Abcjs
            abcNotation={`X:1\nK:C\nL:4\n${pm2NotesString}`}
            parserParams={{}}
            engraverParams={{ responsive: 'resize' }}
            renderParams={{ viewportHorizontal: true }}
          />
        </Col>
        <Col md={4}>
          {pm2Selection.length ? `Pitch classes used: ${pm2Selection.join(', ')}` : ''}
        </Col>
      </Row>
      <Row className="pitch-multiplication-row">
        <Col md={4}>
          <Abcjs
            abcNotation={`X:1\nK:C\nL:4\n${pmResultString}`}
            parserParams={{}}
            engraverParams={{ responsive: 'resize' }}
            renderParams={{ viewportHorizontal: true }}
          />
        </Col>
        <Col md={4}>
          {pmResultSelection.length ? `Resulting pitch classes: ${pmResultSelection.join(', ')}` : ''}
        </Col>
      </Row>
    </Container>
  );
}

export default PitchMultiplication;
