import { keyframes } from '@emotion/react';

export const statusToAnimation = (status: string) => {
    switch (status) {
        case 'damage': {
            return damageKf;
        }
        default:
            return kf;
    }
};

const kf = keyframes`
from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }`;

const damageKf = keyframes`
from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,-135px);
  }

  30% {
    transform: perspective(500px) translate3d( 30px,0, 0);
    background-color:red;
    border-radius:10px;
  }

  70% {
    transform: translate3d( 15px,0, 0);
  }

  90% {
    transform: translate3d(4px,0,0);
  }
`;
