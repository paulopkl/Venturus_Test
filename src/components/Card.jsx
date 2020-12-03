import React from 'react';
import styled from 'styled-components';

const Card = styled.section`
    background-color: ${props => props.style.backgrounColor ? '' : 'rgb(255, 255, 255)'};
    border-width: 0;
    border-radius: 15px;
    box-shadow: 0px 0px 5px #eee;

    @media(max-width: 1200px) {
        width: 90vw !important;
        margin-top: 3vh;
    }
`;

const CardComponent = props => <Card style={{ ...props.styles }}>{props.children}</Card>

export default CardComponent;