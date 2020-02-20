import React from 'react';
import styled from 'styled-components';

const BigModal = styled.div`
    background: inherit;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: fadeIn .3s ease;
`

export const BigLoader: React.FC = () => {
    return (
        <BigModal>
            {/* <img width='300' src="https://i.ya-webdesign.com/images/chocobo-transparent-pixel-art-6.gif" alt="Loading..."/> */}
            <img width='300' src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/f1055231234507.564a1d234bfb6.gif" alt="Loading..."/>
        </BigModal>
    )
}