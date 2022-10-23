import { createContext, useEffect, useState } from "react"
import styled from "styled-components"
import CelticBackground from './assets/images/celtic-pattern.png'
import { Card } from "./components/Card"
import { FinalScore } from "./components/FinalScore"
import { GameArea } from "./components/GameArea"
import { MainMenu } from "./components/MainMenu"
import { ScoreIndicator } from "./components/ScoreIndicator"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`

const Background = styled.div`
  position: absolute;

  width: 100vw;
  height: 100vh;
  background-image: url(${CelticBackground});
  background-repeat: repeat;
  background-position: 50% 50%;

  mix-blend-mode: overlay;
  filter: blur(5px) opacity(0.1);

  z-index: 1;

`

const Wrapper = styled.div`

  position: absolute;
  
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;

  z-index: 2;

  justify-content: center;
  align-items: center;

  transition: all 888ms ease-in-out;

  transform: translateY(${p => p.active ? '0vw' : '100vw'});

`

export const AppContext = createContext()
export const StorageKey =  "raz-match-2-high-score"

const App = () => {

  const [state, setState] = useState({
    mode: 'menu',
    highScore: 0,
    settings: {
      rows: 3, 
      cols: 6,
      correctGuessMultiplier: 10,
      canGuess: true,
    },
    consecutiveCorrect: 0,
    consecutiveWrong: 0,
    score: 0,
    cards: [],
    guesses: [],
    matches: [],
  })

  return (
    <AppContext.Provider value={[state, setState]}>
      <Container>
        <Background />
        <Wrapper active={state.mode == "menu"}>
          <MainMenu />
        </Wrapper>
        <Wrapper active={state.mode == "game"}>
          <ScoreIndicator />
          <GameArea />
        </Wrapper>
        <Wrapper active={state.mode == "score"}>
          <FinalScore />
        </Wrapper>
      </Container>
    </AppContext.Provider>
  )
}

export default App
