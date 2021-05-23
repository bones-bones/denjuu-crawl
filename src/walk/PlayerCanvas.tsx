import styled from '@emotion/styled';
import React, { createRef, useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import tileSheet from '../images/tileSheet.png';
import playerSheet from '../images/playerSheet.png';
import { RootState } from '../store';

const TileSheet = new Image();
TileSheet.src = tileSheet;
const PlayerSheet = new Image();
PlayerSheet.src = playerSheet;
export const PlayerCanvas = () => {
    const canvasRef = createRef<HTMLCanvasElement>();
    const canvasContext = useRef<CanvasRenderingContext2D>();
    const step = useSelector(({ counter: { step } }: RootState) => step);

    useLayoutEffect(() => {
        canvasContext.current = canvasRef.current!.getContext(
            '2d'
        ) as CanvasRenderingContext2D;
        canvasContext.current.imageSmoothingEnabled = false;
    });

    useLayoutEffect(() => {
        let ir = 0;
        const intl = setInterval(() => {
            if (canvasRef.current) {
                canvasContext.current?.clearRect(
                    0,
                    0,
                    canvasRef.current.width,
                    canvasRef.current.height
                );

                const tileSize = 16;
                //5x14
                //1x1
                //6,9

                //1,11
                //1,13
                for (let k = 0; k < 8; k++) {
                    for (let i = 0; i < 8; i++) {
                        if (k == 0) {
                            canvasContext.current?.drawImage(
                                TileSheet,
                                1 * tileSize,
                                0 * tileSize,
                                tileSize,
                                tileSize,
                                i * tileSize * 2,
                                k * tileSize * 2,
                                tileSize * 2,
                                tileSize * 2
                            );
                        } else if (k == 3) {
                            canvasContext.current?.drawImage(
                                TileSheet,
                                1 * tileSize,
                                11 * tileSize,
                                tileSize,
                                tileSize,
                                i * tileSize * 2,
                                k * tileSize * 2,
                                tileSize * 2,
                                tileSize * 2
                            );
                        } else if (k == 4) {
                            canvasContext.current?.drawImage(
                                TileSheet,
                                1 * tileSize,
                                13 * tileSize,
                                tileSize,
                                tileSize,
                                i * tileSize * 2,
                                k * tileSize * 2,
                                tileSize * 2,
                                tileSize * 2
                            );
                        } else if (k == 6) {
                            canvasContext.current?.drawImage(
                                TileSheet,
                                5 * tileSize,
                                14 * tileSize,
                                tileSize,
                                tileSize,
                                i * tileSize * 2,
                                k * tileSize * 2,
                                tileSize * 2,
                                tileSize * 2
                            );
                        } else if (k > 6) {
                            canvasContext.current?.drawImage(
                                TileSheet,
                                1 * tileSize,
                                1 * tileSize,
                                tileSize,
                                tileSize,
                                i * tileSize * 2,
                                k * tileSize * 2,
                                tileSize * 2,
                                tileSize * 2
                            );
                        } else {
                            canvasContext.current?.drawImage(
                                TileSheet,
                                0 * tileSize,
                                0 * tileSize,
                                tileSize,
                                tileSize,
                                i * tileSize * 2,
                                k * tileSize * 2,
                                tileSize * 2,
                                tileSize * 2
                            );
                        }
                    }
                }

                // const canvasWidth = canvasRef.current?.getBoundingClientRect()
                //     .width;
                // const canvasOffset = step.value % canvasWidth;

                // const SPEED = 1;

                const currentMoment = new Date().getTime();
                canvasContext.current?.save();
                canvasContext.current?.translate(canvasRef.current.width, 0);
                canvasContext.current?.scale(-1, 1);
                if (currentMoment - step.lastUpdatedTime < 1300) {
                    let step = 6;
                    if (ir == 0) {
                        step += 1;
                    } else if (ir == 2) {
                        step += 2;
                    }
                    canvasContext.current?.drawImage(
                        PlayerSheet,
                        step * tileSize,
                        0 * tileSize,
                        tileSize,
                        tileSize,
                        6 * tileSize,
                        6 * tileSize,
                        tileSize * 2,
                        tileSize * 2
                    );
                    ir = (ir + 1) % 4;
                } else {
                    canvasContext.current?.drawImage(
                        PlayerSheet,
                        6 * tileSize,
                        0 * tileSize,
                        tileSize,
                        tileSize,
                        6 * tileSize,
                        6 * tileSize,
                        tileSize * 2,
                        tileSize * 2
                    );
                }
                canvasContext.current?.restore();
            }
        }, 200);
        return () => clearInterval(intl);
    });
    return <PCanvas ref={canvasRef} width={'256px'} height={'256px'} />;
};

const PCanvas = styled.canvas`
    border: 1px solid white;

    width: 60vw;
`;
