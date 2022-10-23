import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { AppContext } from "../App"

const Container = styled.div`
    display: flex;
    justify-content: center;
    font-size: 33px;
    padding: 16px;
    color: var(--text-color);
    flex-direction: column;
    text-align: center;
`

export const ScoreIndicator = () => {

    const [state] = useContext(AppContext)
    const [score, setScore] = useState(0)

    useEffect(() => {
        let direction = 
            score > state.score ? 
            -1 :  score < state.score ? 1 
            : 0

        setTimeout(() => {
            setScore(score + direction)
        }, Math.max(0, 56 - Math.abs(score - state.score)))

    }, [state.score, score])

    return (
        <Container>
            <div>
                Score: {score}
            </div>
            <div>
                Next Correct Guess: {state.settings.correctGuessMultiplier * (state.consecutiveCorrect + 1)}
            </div>
        </Container>
    )
}