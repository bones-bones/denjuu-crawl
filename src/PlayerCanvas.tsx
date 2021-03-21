import styled from "@emotion/styled";
import React, { createRef, useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";
import run from './images/Run.png';
import idle from './images/Idle.png';
import sky from './images/sky.png';
import grass from './images/grass.png';
import hill from './images/hill.png';
import clouds from './images/clouds.png';
import { AppState } from "./store";

const Run = new Image();
Run.src = run;
const Idle = new Image()
Idle.src = idle;
const Sky = new Image()
Sky.src = sky
const Grass = new Image();
Grass.src = grass
const Hill = new Image();
Hill.src = hill
const Clouds = new Image();
Clouds.src = clouds
export const PlayerCanvas = () => {
    const canvasRef = createRef<HTMLCanvasElement>();
    const canvasContext = useRef<CanvasRenderingContext2D>();
    const step = useSelector(({ step }: AppState) => step);

    useLayoutEffect(() => {
        canvasContext.current = canvasRef.current!.getContext(
            '2d'
        ) as CanvasRenderingContext2D;
    });

    useLayoutEffect(() => {

        let ir = 0;
        let ii = 0;
        const intl = setInterval(() => {
            // console.log(step.lastUpdated);
            if (canvasRef.current) {
                canvasContext.current?.clearRect(
                    0,
                    0,
                    canvasRef.current.width,
                    canvasRef.current.height
                );

                canvasContext.current?.drawImage(Sky, 0, 0);
                canvasContext.current?.drawImage(Sky, Sky.width, 0);

                const canvasWidth = (canvasRef.current?.getBoundingClientRect().width)

                const canvasOffset = step.value % canvasWidth;


                // const SPEED = 1;

                const cloudsOffset = (canvasOffset % Clouds.width) / 6
                // console.log('cv', canvasWidth, 'gw', Grass.width)
                for (let i = 0; i < canvasWidth; i += Clouds.width) {    //3
                    canvasContext.current?.drawImage(Clouds, i - cloudsOffset, -50);
                }



                const hillOffset = (canvasOffset % Hill.width) / 4
                // console.log('cv', canvasWidth, 'gw', Grass.width)
                for (let i = 0; i < canvasWidth; i += Hill.width) {    //3
                    canvasContext.current?.drawImage(Hill, i - hillOffset, -30);
                }


                const tgrassoffste = canvasOffset % Grass.width
                // console.log('cv', canvasWidth, 'gw', Grass.width)
                for (let i = 0; i < canvasWidth; i += Grass.width) {    //3bl
                    canvasContext.current?.drawImage(Grass, i - tgrassoffste, -25);
                }



                const currentMoment = new Date().getTime();


                const [x, y, width] = [70, 135 * 2, 10]
                const gradient = canvasContext.current?.createRadialGradient(x, y, width / 2 / 2, x, y, width * 2)!;
                gradient.addColorStop(0, 'black');
                console.log((Math.max(ir, ii)));
                gradient.addColorStop(Math.min(0.5, ((ir || ii) % 4) / 4), 'black');
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                canvasContext.current!.setTransform(1, 0, 0, 0.5, 0, 0);
                canvasContext.current?.arc(x, y, 50, 20, 2 * Math.PI);
                canvasContext.current!.fillStyle = gradient;
                canvasContext.current?.fill();
                canvasContext.current!.setTransform(1, 0, 0, 1, 0, 0);


                if (currentMoment - step.lastUpdated < 1300) {
                    const inc = 1120 / 8;
                    canvasContext.current?.drawImage(Run, (ir % 8) * - inc - 5, 55);
                    ir++;
                    ii = 0;
                } else {
                    const inc = 1120 / 8;
                    canvasContext.current?.drawImage(Idle, (ii % 8) * - inc, 55);
                    ii++;
                    ir = 0;
                }


            }
        }, 200);
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