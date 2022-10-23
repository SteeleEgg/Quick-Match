import { useContext } from "react"
import styled from "styled-components"
import { AppContext, StorageKey } from "../App"

const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    grid-gap: 16px;
`

const RulesWrapper = styled.div`
    background: var(--surface-a);
    padding: 16px 32px;
    border-radius: 16px;
    color: var(--text-color);
    margin: 2rem;
    text-align: center;
    box-shadow: 2px 3px 4px #00000088;

    & p {
        font-size: 18px;
    }

    & p:last-of-type {
        font-size: 28px;
    }
`

const MenuButton = styled.div`
    font-size: 33px;
    background: var(--primary-500);
    padding: 8px 32px;
    border-radius: 4px;
    font-weight: bold;
    box-shadow: 2px 3px 4px #00000088;

    transition: all 222ms;

    cursor: pointer;
    user-select: none;

    text-align: center;

    &:hover {
        transform: scale(1.1);
    }

`

export const MainMenu = () => {

    const [state, setState] = useContext(AppContext)

    const handleNewGame = () => {
        setState({
            ...state,
            mode: 'game',
        })
    }

    return (
        <Container>
            <RulesWrapper>
                <h1>Rules</h1>
                <p>Make two matches and get <b>{state.settings.correctGuessMultiplier} points</b>.</p>
                <p>Each consecutive correct guess will increase your multiplier.</p>
                <p>Making an incorrect guess will remove points.</p>
                <p>The penalty will increase by 1 for each wrong guess until you make a correct guess.</p>
                <hr></hr>
                <p><b>High Score: {Number(window.localStorage.getItem(StorageKey) ?? 0)}</b></p>
            </RulesWrapper>
            <MenuButton onClick={handleNewGame}>Start New Game</MenuButton>
        </Container>
    )
}