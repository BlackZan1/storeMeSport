import React from 'react';
import Parallax from 'parallax-js';

const ParallaxComponent = ({id, children}) => {
    const loadParallax = () => {
        const scene = document.getElementById('scene');
        const parallax = new Parallax(scene, {
            relativeInput: true
        })
        parallax.friction(0.2, 0.2);
    }

    return (
        <div style={{height: 'inherit', width: 'inherit'}} id={id} onLoad={() => loadParallax()}>
            {
                children
            }
        </div>
    )
}

export default ParallaxComponent;