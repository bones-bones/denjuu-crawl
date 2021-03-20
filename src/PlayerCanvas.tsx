import styled from "@emotion/styled";
import React, { createRef, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import run from './images/Run.png';
import idle from './images/Idle.png';

import { AppState } from "./store";

const Run = new Image();
Run.src = run;
const Idle = new Image()
Idle.src = idle;
export const PlayerCanvas = () => {
    const canvasRef = createRef<HTMLCanvasElement>();
    const canvasContext = useRef<CanvasRenderingContext2D>();
    const lastUpdated = useSelector(({ step: { lastUpdated } }: AppState) => lastUpdated);

    useEffect(() => {
        canvasContext.current = canvasRef.current!.getContext(
            '2d'
        ) as CanvasRenderingContext2D;
    });

    useEffect(() => {

        let ir = 0;
        let ii = 0;
        const intl = setInterval(() => {
            if (canvasRef.current) {
                canvasContext.current?.clearRect(
                    0,
                    0,
                    canvasRef.current.width,
                    canvasRef.current.height
                );
                const currentMoment = new Date().getTime()
                if (currentMoment - lastUpdated < 1300) {
                    const inc = 1120 / 8;
                    canvasContext.current?.drawImage(Run, (ir % 8) * - inc, 0);
                    ir++;
                    ii = 0;
                } else {
                    const inc = 1120 / 8;
                    canvasContext.current?.drawImage(Idle, (ii % 8) * - inc, 0);
                    ii++;
                    ir = 0;
                }
            }
        }, 100);
        return () => {
            clearInterval(intl);
        };
    });
    return <PCanvas ref={canvasRef} width={'140px'} />;
};

const PCanvas = styled.canvas`
    border: 1px solid white;
    width: 200px;
`;
