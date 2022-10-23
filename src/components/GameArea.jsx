import { useCallback, useContext, useEffect, useMemo } from "react"
import styled from "styled-components"
import { AppContext } from "../App"
import { Card } from "./Card"

import CIBalance from '../assets/images/cards/balance.png';
import CIChalice from '../assets/images/cards/chalice.png';
import CIKing from '../assets/images/cards/king.png';
import CIKnight from '../assets/images/cards/knight.png';
import CIMoon from '../assets/images/cards/moon.png';
import CIPentacle from '../assets/images/cards/pentacle.png';
import CIQueen from '../assets/images/cards/queen.png';
import CISun from '../assets/images/cards/sun.png';
import CISword from '../assets/images/cards/sword.png';
import CIWand from '../assets/images/cards/wand.png';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    padding: 16px;
`

const Wrapper = styled.div`
    display: grid;
    grid-gap: 1.5vw;
    grid-template-columns: repeat(${p => p.cols}, calc(var(--card-base-size-horizontal) * var(--card-size-multiplier)));
    grid-template-rows: repeat(${p => p.rows}, calc(var(--card-base-size-vertical) * var(--card-size-multiplier)));
`

const types = [
    CIBalance,
    CIChalice,
    CIKing,
    CIKnight,
    CIMoon,
    CIPentacle,
    CIQueen,
    CISun,
    CISword,
    CIWand,
]

export const GameArea = () => {

    const [state, setState] = useContext(AppContext)

    const shuffledTypes = useMemo(() => types.sort((a, b) => 0.5 - Math.random()), [])
    const GetCardType = (index) => shuffledTypes[Math.floor(index / 2)]

    const CardLayout = useMemo(() => {
        let cards = state.settings.cols * state.settings.rows;
        let children = []
        for (let i = 0; i < cards; i++) {
            children.push(
                <Card key={i} type={GetCardType(i)} index={i} />
            )
        }

        return children.sort((a, b) => 0.5 - Math.random());
    }, [])

    const runCheck = useCallback(async () => {
        setState(prev => {
            let stx = {...prev}
            stx.settings.canGuess = false;
            return stx;
        })

        let typeA = GetCardType(state.guesses[0])
        let typeB = GetCardType(state.guesses[1])
        await doCheck(typeA, typeB).then(isMatch => {
            setState(prev => {
                let stx = {...prev}
                stx.guesses = []
                if (isMatch) {
                    stx.matches = [...stx.matches, ...state.guesses]
                    stx.consecutiveCorrect++
                    stx.consecutiveWrong = 0
                    stx.score += stx.consecutiveCorrect * stx.settings.correctGuessMultiplier
                } else {
                    stx.consecutiveWrong++
                    stx.consecutiveCorrect = 0
                    stx.score = Math.max(0, stx.score - stx.consecutiveWrong)
                }
                stx.settings.canGuess = true;


                if (stx.matches.length == stx.settings.rows * stx.settings.cols) {
                    stx.mode = "score"
                }

                return stx;
            })
        })

        
    }, [state.guesses.length])

    const doCheck = async (typeA, typeB) => await new Promise((resolve, reject) => {
        if (typeA == typeB) {
            resolve(true)
        } else {
            setTimeout(() => {
                resolve(false)
            }, 621)
        }
    })

    useEffect(() => {
        let { guesses } = state;
        if (guesses.length == 2) {
            runCheck()
        }
    }, [state.guesses.length])

    return (
        <Container>
            <Wrapper 
                rows={state.settings.rows} 
                cols={state.settings.cols}
            >
                {CardLayout}
            </Wrapper>
        </Container>
    )
}