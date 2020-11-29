import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
    height: 6vh;
    background-color: rgb(233,227,233);
    width: 100%;
    
    position: fixed;
    bottom: 0;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    p {
        margin: 0;
    }
`;

const FooterComponent = () => {
    return (
        <Footer>
            <p>2020 - All rights reserved</p>
        </Footer>
    );
}

export default FooterComponent;