import React from 'react';
import Container from 'react-bootstrap/container';
import Blockquote from '@yozora/react-blockquote'
import '@yozora/react-blockquote/lib/esm/index.css'
import './Home.css';

function Home() {

  return (
    <Container className="Home">
      <h1 className="title"><b>How did Pierre Boulez use mathematics to develop and build upon total serialism?</b></h1>
      <div className="blurb">
        The goal of this project is to analyze mathematical ideas Boulez introduced into some of his total serialist works. As a convenient way of displaying these mathematical ideas, I developed a few web tools to allow readers to play around with how these ideas work. One of the reasons why I decided to build and use these tools as a way to analyze Boulez's music was because of a quote from an interview with Boulez:
      </div>
      <Blockquote>
        <div>
          "Had computers existed at that time I would have put the data through them and made the piece that way. But I did it by hand. I was myself a small and very primitive computer. It was a demonstration through the absurd."
        </div>
        <br/>
        <div className="composer-name-quote">
          - Pierre Boulez
        </div>
      </Blockquote>
      <div className="blurb">
        From this quote, it's clear that Boulez's total serialist techniques could be modeled using some sort of computer algorithm. In this project, I take this idea to heart. 
      </div>
    </Container>
  );
}

export default Home;
