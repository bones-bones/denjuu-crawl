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

const kf = keyframes({
    'from, 20%, 53%, 80%, to': {
        transform: 'translate3d(0,0,0)',
    },

    '40%, 43%': {
        transform: 'translate3d(0, -30px, 0)',
    },

    '70%': {
        transform: 'translate3d(0, -15px, 0)',
    },

    '90%': {
        transform: 'translate3d(0,-4px,0)',
    },
});

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

/*
This effect tints a character
* filter: `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg'>
    <filter id="linear">
    <feColorMatrix
    id="aa"
      type="matrix"
      values="1 0 0 1.9 -2.2
              0 1 0 0.0 0.3
              0 0 1 0 0.5
              0 0 0 1 0.2
              "/>
    <feComposite in='aa' in2='SourceGraphic' operator='in'/>
  </filter></svg>`)}#linear")`,
*/
