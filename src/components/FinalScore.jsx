import { useContext, useEffect } from "react"
import styled from "styled-components"
import { AppContext, StorageKey } from "../App"

const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: var(--primary-500);

`

const Wrapper = styled.div`
    font-size: 4vw;

`

const Score = styled.div`
    font-size: 20vw;
    font-weight: bold;
    background: linear-gradient(to bottom right, #a8ff78, #78ffd6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

`

const RestartButton = styled.div`
    font-size: 38px;
    background: var(--primary-500);
    color: var(--surface-a);
    padding: 8px 32px;
    border-radius: 8px;
    box-shadow: 2px 3px 4px #00000088;
    transition: all 222ms;

    cursor: pointer;
    user-select: none;

    &:hover {
        transform: scale(1.1);
    }
`

export const FinalScore = () => {

    const [state, setState] = useContext(AppContext)

    const handleClick = () => setState({
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

    useEffect(() => {
        if (state.mode == 'score') {
            let highScore = Number(window.localStorage.getItem(StorageKey) ?? 0)
            if (highScore < state.score) {
                window.localStorage.setItem(StorageKey, state.score)
            }
        }
    }, [state.mode])

    return (
        <Container>
            <Wrapper>Final Score</Wrapper>
            <Score>{state.score}</Score>
            <RestartButton onClick={handleClick}>Back to Menu</RestartButton>
        </Container>
    )
}