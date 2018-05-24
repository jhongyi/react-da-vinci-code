import React, { Component } from 'react';
import styled from 'styled-components';

const HomeDiv = styled.div`
  text-align: center;
`;

const ContentDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 1%;

  .app-intro {
    font-size: large;
    width: 45%;
  }
`;

const PasswordSpan = styled.div`
  display:inline-flex;
  flex-direction: row;
  border: 1px solid #ff1212;
  margin: 0 auto;
  width: 3rem;
  height: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  cursor: pointer;
  margin: 0 0.3rem 0.3rem 0;

  &:hover {
    background: yellow;
    border: 1px solid gray;
  }
`;

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: Math.floor(Math.random() * Math.floor(99)) + 1,
      chooseNumber: Array.from({ length: 99 }, (v, i) => i + 1),
      gameEnd: false,
      min: 1,
      max: 99
    };
  }

  handleChooseNumber = (guess) => {
    const chk = Math.max(this.state.answer, guess);
    const newChooseNumber = [];
    if (guess === this.state.answer) {
      this.setState({
        ...this.state,
        gameEnd: !this.state.gameEnd
      });
      alert('你答對了!');
    } else if (guess !== this.state.answer) {
      if (chk === guess) {
        for (let i = this.state.min; i <= chk; i += 1) {
          newChooseNumber.push(i);
        }
        this.setState({
          ...this.state,
          max: guess,
          chooseNumber: newChooseNumber
        });
      } else {
        for (let i = guess; i <= this.state.max; i += 1) {
          newChooseNumber.push(i);
        }
        this.setState({
          ...this.state,
          min: guess,
          chooseNumber: newChooseNumber
        });
      }
    }
  }

  resetGame = () => {
    this.setState({
      answer: Math.floor(Math.random() * Math.floor(99)) + 1,
      chooseNumber: Array.from({ length: 99 }, (v, i) => i + 1),
      gameEnd: !this.state.gameEnd,
      min: 1,
      max: 99,
    });
  }

  render() {
    return (
      <HomeDiv>
        <ContentDiv>
          <div className="app-intro">
            <h1>終極密碼</h1>
            {
              this.state.gameEnd ?
                <button onClick={this.resetGame}>進行下一局</button>
                :
                this.state.chooseNumber.map((number, index) =>
                  <PasswordSpan key={index} onClick={() => this.handleChooseNumber(number)}>
                    {number}
                  </PasswordSpan>
                )
            }
          </div>
        </ContentDiv>
      </HomeDiv>
    );
  }
}
