import styled from '@emotion/styled';
import React, { createRef, useEffect, useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { DenjuuTypeIcon } from '../data';
import playerSheet from '../images/playerSheet.png';
import tileSheet from '../images/tileSheet.png';
import { RootState } from '../store';
import { Tile } from './types';

const TileSheet = new Image();
TileSheet.src = tileSheet;
const PlayerSheet = new Image();
PlayerSheet.src = playerSheet;
export const PlayerCanvas = () => {
    const canvasRef = createRef<HTMLCanvasElement>();
    const secondCanvasRef = createRef<HTMLCanvasElement>();
    const canvasContext = useRef<CanvasRenderingContext2D>();
    const mapCurrent = useRef<string>('');
   // const step = useSelector(({ counter: { step } }: RootState) => step);
    const location = useSelector(
        ({ counter: { location } }: RootState) => location
    );

    useLayoutEffect(() => {
        canvasContext.current = canvasRef.current!.getContext(
            '2d'
        ) as CanvasRenderingContext2D;
        canvasContext.current.imageSmoothingEnabled = false;
    });
    useEffect(() => { fetch('https://zpjxcq.getshortstack.com/api/map').then(e => { e.arrayBuffer().then(a => { 
        mapCurrent.current = URL.createObjectURL(new Blob([a],{type:'image/jpeg'})) }) }) }, [])

    useLayoutEffect(() => {
        // let stepOffset = 0;

        const draw = setInterval(() => {
            if (location?.map) {

                //if (true) {

                const im = new Image()
                im.src = mapCurrent.current
              
                canvasContext.current?.drawImage(im, 0, 0,256,256)
                const imageData=canvasContext.current?.getImageData(0,0,256,256)

                const gatheredMap:Array<number[][]>=[
                    [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],],
[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],],
[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],],
[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],],
[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],],
[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],],
[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],],
[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],],
                ]
                for(let i=0;i<256*256;i++){
                    if(imageData){
                    const xpos=Math.floor((i%256)/32)
                    const ypos=Math.floor(i/256/32)
                  //  console.log(xpos,ypos)
                    gatheredMap[xpos][ypos][0]=(gatheredMap[xpos][ypos][0]+imageData!.data[i*4])/2
                    gatheredMap[xpos][ypos][1]=(gatheredMap[xpos][ypos][1]+imageData!.data[i*4+1])/2
                    gatheredMap[xpos][ypos][2]=(gatheredMap[xpos][ypos][2]+imageData!.data[i*4+2])/2
                    }
                }
               // console.log(gatheredMap)

                // for (let x=0;x<gatheredMap.length;x++){
                //     for (let y=0;y<gatheredMap[x].length;y++){
                //         canvasContext.current!.fillStyle=`rgb(${gatheredMap[x][y].join(',')})`
                //         canvasContext.current?.fillRect(x*32,y*32,32,32)
                //     }
                // }
                // } else {

                //     const playerX = (step.value % 65) * 0.25;
                //     if (canvasRef.current) {
                //         canvasContext.current?.clearRect(
                //             0,
                //             0,
                //             canvasRef.current.width,
                //             canvasRef.current.height
                //         );

                //         const tileSize = 16;
                //         //5x14
                //         //1x1
                //         //6,9
                //         //1,11
                //         //1,13
                //         const drawArray = location.map;

                //         for (let y = 0; y < 8; y++) {
                //             for (let x = 0; x < 8; x++) {
                //                 canvasContext.current?.drawImage(
                //                     TileSheet,
                //                     drawArray[y][x].x * tileSize,
                //                     drawArray[y][x].y * tileSize,
                //                     (drawArray[y][x].width || 1) * tileSize,
                //                     (drawArray[y][x].height || 1) * tileSize,
                //                     x * tileSize * 2,
                //                     y * tileSize * 2,
                //                     (drawArray[y][x].width || 1) * tileSize * 2,
                //                     (drawArray[y][x].height || 1) * tileSize * 2
                //                 );
                //             }
                //         }

                //         // const canvasWidth = canvasRef.current?.getBoundingClientRect()
                //         //     .width;
                //         // const canvasOffset = step.value % canvasWidth;

                //         // const SPEED = 1;

                //         const currentMoment = getNow();
                //         const drawPlayerX = 15 - playerX;
                //         canvasContext.current?.save();
                //         canvasContext.current?.translate(
                //             canvasRef.current.width,
                //             0
                //         );
                //         canvasContext.current?.scale(-1, 1);

                //         if (currentMoment - step.lastUpdatedTime < 1300) {
                //             let step = 6;
                //             if (stepOffset == 0) {
                //                 step += 1;
                //             } else if (stepOffset == 2) {
                //                 step += 2;
                //             }
                //             canvasContext.current?.drawImage(
                //                 PlayerSheet,
                //                 step * tileSize,
                //                 0 * tileSize,
                //                 tileSize,
                //                 tileSize,
                //                 drawPlayerX * tileSize,
                //                 6 * tileSize,
                //                 tileSize * 2,
                //                 tileSize * 2
                //             );
                //             stepOffset = (stepOffset + 1) % 4;
                //         } else {
                //             canvasContext.current?.drawImage(
                //                 PlayerSheet,
                //                 6 * tileSize,
                //                 0 * tileSize,
                //                 tileSize,
                //                 tileSize,
                //                 drawPlayerX * tileSize,
                //                 6 * tileSize,
                //                 tileSize * 2,
                //                 tileSize * 2
                //             );
                //         }
                //         canvasContext.current?.restore();
                //     }
                // }
            }
        }, 500);
        return () => clearInterval(draw);
    });
    return (
        <>
            {location?.type && <DenjuuTypeIcon type={location.type} />}
            <PCanvas ref={canvasRef} width={'256px'} height={'256px'} />
            <InvisibleCanvas ref={secondCanvasRef}/>
        </>
    );
};

const InvisibleCanvas=styled.canvas({
    display:'none'
})
const PCanvas = styled.canvas({
    border: '1px solid white',
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
