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

    

    return (
        <Container>
            <div>
                Score: {/** Score Here */}
            </div>
            <div>
                Next Correct Guess: {/** Next Correct Guess Score Here */}
            </div>
        </Container>
    )
}