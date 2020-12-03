import React, { useEffect, useState } from 'react';

import Logo from '../assets/logo.jpg';
import UserImage from '../assets/userImage.png';

import styled from 'styled-components';

const Menu = styled.nav`
    height: 7.5vh;
    background: linear-gradient(to right, rgb(190,14,79), rgb(165,23,94),rgb(138,32,111));
    padding-left: 3vw;
    padding-right: 3vw;
`;

const Img = styled.img`
    height: inherit;
    margin-right: ${props => props.marginRight ? props.marginRight : '1.5vw'};
    margin-left: ${props => props.marginLeft ? props.marginLeft : 0};
    border-radius: 50%;
`;

const Paragraph = styled.p`
    color: #FFF;
    margin: 0;
    font-size: ${props => props.fontSize ? props.fontSize : '1.3rem' };
    font-weight: 500;
`;

const Flex = styled.div`
    height: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const FlexLeft = styled.div`
    height: 95%;

    display: flex;
    align-items: center;
`;

const FlexRight = styled.div`
    height: 85%;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Header = () => {

    const [user, setUser] = useState({ name: '', imageUrl: '' });

    useEffect(() => {
        const api = { name: 'John Doe', imageUrl: '' } // Quando for pegar dados da API

        setUser({ ...api });
    }, []);

    return (
        <Menu>
            <Flex>
                <FlexLeft>
                    <Img src={Logo} alt="logo" />
                    <Paragraph>
                        Squad Management Tool
                    </Paragraph>
                </FlexLeft>
                <FlexRight>
                    <Paragraph fontSize="1rem">{user.name}</Paragraph>
                        <Img src={user.imageUrl.length > 1 ? user.imageUrl : UserImage} alt="user" marginRight="0"
                            marginLeft="0.33rem" />
                </FlexRight>
            </Flex>
        </Menu>
    );
}

export default Header;