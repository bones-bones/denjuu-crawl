import styled from '@emotion/styled';
import React, { createRef, useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { getNow } from '../common';
import { BorderedContainer } from '../components';
import { DenjuuTypeIcon } from '../data';
import playerSheet from '../images/playerSheet.png';
import tileSheet from '../images/tileSheet.png';
import { RootState } from '../store';

const TileSheet = new Image();
TileSheet.src = tileSheet;
const PlayerSheet = new Image();
PlayerSheet.src = playerSheet;
export const PlayerCanvas = () => {
    const canvasRef = createRef<HTMLCanvasElement>();
    const canvasContext = useRef<CanvasRenderingContext2D>();
    const step = useSelector(({ counter: { step } }: RootState) => step);
    const location = useSelector(
        ({ counter: { location } }: RootState) => location
    );

    useLayoutEffect(() => {
        canvasContext.current = canvasRef.current!.getContext(
            '2d'
        ) as CanvasRenderingContext2D;
        canvasContext.current.imageSmoothingEnabled = false;
    });

    useLayoutEffect(() => {
        let stepOffset = 0;

        const draw = setInterval(() => {
            if (location?.map) {
                //if (true) {

                // } else {

                const playerX = (step.value % 65) * 0.25;
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
                    const drawArray = location.map;

                    for (let y = 0; y < 8; y++) {
                        for (let x = 0; x < 8; x++) {
                            canvasContext.current?.drawImage(
                                TileSheet,
                                drawArray[y][x].x * tileSize,
                                drawArray[y][x].y * tileSize,
                                (drawArray[y][x].width || 1) * tileSize,
                                (drawArray[y][x].height || 1) * tileSize,
                                x * tileSize * 2,
                                y * tileSize * 2,
                                (drawArray[y][x].width || 1) * tileSize * 2,
                                (drawArray[y][x].height || 1) * tileSize * 2
                            );
                        }
                    }

                    // const canvasWidth = canvasRef.current?.getBoundingClientRect()
                    //     .width;
                    // const canvasOffset = step.value % canvasWidth;

                    // const SPEED = 1;

                    const currentMoment = getNow();
                    const drawPlayerX = 15 - playerX;
                    canvasContext.current?.save();
                    canvasContext.current?.translate(
                        canvasRef.current.width,
                        0
                    );
                    canvasContext.current?.scale(-1, 1);

                    if (currentMoment - step.lastUpdatedTime < 1300) {
                        let step = 6;
                        if (stepOffset == 0) {
                            step += 1;
                        } else if (stepOffset == 2) {
                            step += 2;
                        }
                        canvasContext.current?.drawImage(
                            PlayerSheet,
                            step * tileSize,
                            0 * tileSize,
                            tileSize,
                            tileSize,
                            drawPlayerX * tileSize,
                            6 * tileSize,
                            tileSize * 2,
                            tileSize * 2
                        );
                        stepOffset = (stepOffset + 1) % 4;
                    } else {
                        canvasContext.current?.drawImage(
                            PlayerSheet,
                            6 * tileSize,
                            0 * tileSize,
                            tileSize,
                            tileSize,
                            drawPlayerX * tileSize,
                            6 * tileSize,
                            tileSize * 2,
                            tileSize * 2
                        );
                    }
                    canvasContext.current?.restore();
                }
            }
        }, 200);
        return () => clearInterval(draw);
    });
    return (
        <>
            <BorderedContainer>
                <LocationTypeBox>
                    {location?.type && <DenjuuTypeIcon type={location.type} />}
                    {location?.type}
                </LocationTypeBox>
            </BorderedContainer>{' '}
            <BorderedContainer>
                <PCanvas ref={canvasRef} width={'256px'} height={'256px'} />
            </BorderedContainer>
        </>
    );
};
const LocationTypeBox = styled.div({
    width: '16vw',
    height: '12w',
    margin: '4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
});
const PCanvas = styled.canvas({
    width: '60vw',
});

// if (y == 0) {
//     canvasContext.current?.drawImage(
//         TileSheet,
//         1 * tileSize,
//         0 * tileSize,
//         tileSize,
//         tileSize,
//         x * tileSize * 2,
//         y * tileSize * 2,
//         tileSize * 2,
//         tileSize * 2
//     );
// } else if (y == 3) {
//     canvasContext.current?.drawImage(
//         TileSheet,
//         1 * tileSize,
//         11 * tileSize,
//         tileSize,
//         tileSize,
//         x * tileSize * 2,
//         y * tileSize * 2,
//         tileSize * 2,
//         tileSize * 2
//     );
// } else if (y == 4) {
//     canvasContext.current?.drawImage(
//         TileSheet,
//         1 * tileSize,
//         13 * tileSize,
//         tileSize,
//         tileSize,
//         x * tileSize * 2,
//         y * tileSize * 2,
//         tileSize * 2,
//         tileSize * 2
//     );
// } else if (y == 6) {
//     canvasContext.current?.drawImage(
//         TileSheet,
//         5 * tileSize,
//         14 * tileSize,
//         tileSize,
//         tileSize,
//         x * tileSize * 2,
//         y * tileSize * 2,
//         tileSize * 2,
//         tileSize * 2
//     );
// } else if (y > 6) {
//     canvasContext.current?.drawImage(
//         TileSheet,
//         1 * tileSize,
//         1 * tileSize,
//         tileSize,
//         tileSize,
//         x * tileSize * 2,
//         y * tileSize * 2,
//         tileSize * 2,
//         tileSize * 2
//     );
// } else {
//     canvasContext.current?.drawImage(
//         TileSheet,
//         0 * tileSize,
//         0 * tileSize,
//         tileSize,
//         tileSize,
//         x * tileSize * 2,
//         y * tileSize * 2,
//         tileSize * 2,
//         tileSize * 2
//     );
// }
