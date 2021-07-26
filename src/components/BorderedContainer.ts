import styled from '@emotion/styled';

export const BorderedContainer = styled.div({
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    ':before': {
        outlineColor: 'rgba(0, 0, 0, 1)',
        borderRadius: '15px',
        borderTop: '2vw groove',
        borderLeft: '2vw groove',
        borderBottom: '0.5vh groove',
        borderRight: '1vw groove',
        content: '" "',
        position: 'absolute',
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        pointerEvents: 'none',
        zIndex: 5,
    },
});
