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

    /**
     * This is the score indicator. It should step the score text towards the score stored in state
     * and display how many points the next correct guess will be worth.
     * 
     * To Do:
     * - Import state from AppContext. You don't need setState because this component doesn't change state, only reads it.
     * - Create a score state to store the component's internal score keeping.
     * - Create a useEffect that'll step this component's score towards the AppContext's score.
     * - You'll need to use a timer to prevent the score from changing all at once.
     * - Hint: The useEffect dependency array can have multiple dependencies.
     */

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