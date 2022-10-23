import { useContext, useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components"
import { AppContext } from "../App";

import CardBackImage from '../assets/images/cards/card-back.png';

const Container = styled.div`
    display: flex;
    position: relative;
    width: calc(var(--card-base-size-horizontal) * var(--card-size-multiplier));
    height: calc(var(--card-base-size-vertical) * var(--card-size-multiplier));

    transition: all 222ms;
    box-shadow: 2px 3px 4px #00000088;
    border-radius: 8px;
    overflow: hidden;

    transition: all 383ms;

    perspective: 100px;
    transform-style: preserve-3d;

    cursor: pointer;
    user-select: none;

    &:hover {
        transform: scale(1.1);
    }

    &.flipped {
        transform: rotateY(180deg) rotateZ(${p => p.rotation}deg);
    }

    &.flipped .card-back {
        opacity: 0;
    }

    &.flipped .card-front {
        opacity: 1;
    }

    &.cleared {
        transition: all 1000ms;
        transform: translateY(100vh);
    }
`

const CardBack = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background: var(--card-back);
    background-image: url(${CardBackImage});
    background-size: calc(100% - 8px);
    background-position: 4px;
    background-repeat: no-repeat;
    transform: translateZ(1px);
    transition: all 0ms;
    transition-delay: 111ms;
`

const CardFront = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background: var(--primary-500);
    background-image: url(${p => p.type});
    background-size: calc(100% - 8px);
    background-position: 4px;
    background-repeat: no-repeat;
    transform: rotateX(0deg) translateZ(-1px);
    opacity: 0;
    transition: opacity 0ms, background-color 222ms;
    transition-delay: 111ms;

    &.matched {
        background-color: var(--green-500);
    }
`
/**
 * Card Component
 * @prop {index} The order that the card should appear in in the grid.
 * @prop {type} URL of image to be used on the front side of the card. 
 */
export const Card = ({ index, type }) => {

    const [state, setState] = useContext(AppContext)
    const [cleared, setCleared] = useState(false)

    let randomRotation = useMemo(() => 20 * Math.random() - 10, []);

    const flip = () => {
        if (!state.guesses.includes(index) && state.settings.canGuess) {
            setState({
                ...state,
                guesses: [...state.guesses, index]
            })
        }
    }

    const isFlipped = () => 
        (state.guesses.includes(index) || state.matches.includes(index)) 
            ? "flipped"
            : ""
    

    const isMatched = () =>
        state.matches.includes(index) 
            ? "matched" 
            : ""

    const isCleared = () => cleared ? "cleared" : ""

    useEffect(() => {
        if (isMatched()) {
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    setCleared(true)
                    resolve()
                }, 621)
            })
        }
    }, [isMatched()])

    return (
        <Container index={index} onClick={flip} rotation={randomRotation} className={`${isFlipped()} ${isCleared()}`}>
            <CardBack className="card-back" />
            <CardFront type={type} className={`card-front ${isMatched()}`} />
        </Container>
    )
}