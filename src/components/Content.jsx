import React from 'react';
import styled from 'styled-components';

const Content = styled.main`
    padding: 3rem 3vw calc(3rem * 2) 3vw;
    background-color: rgb(247,243,247);

    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const ContentComponent = props => {
    return (
        <Content>
            {props ? props.children : null}
        </Content>
    );
}

export default ContentComponent;