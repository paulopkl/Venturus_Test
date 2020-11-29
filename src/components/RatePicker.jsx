import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import Divider from '../assets/divider.png';
import FacePlayer from '../assets/facePlayer.png';

import styled from 'styled-components';
import CardComponent from './Card';

const Card = styled.div`
    width: 45vw;
    min-height: 38vh;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(to top, rgb(101,47,135), rgb(187,62,124));
    border-width: 0;
    border-radius: 15px;
    box-shadow: 0px 0px 5px #eee;
`;

const ContainerWithImage = styled(Container)`
    width: 100%;
    height: 100%;
    background-image: url(${Divider});
    background-position: center; 
    background-repeat: no-repeat;
    padding: 2.5rem;
`;

const ColWithFlex = styled(Col)`
    padding: 0 2rem 0 3.5rem;

    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const Paragraph = styled.p`
    color: white;
    font-size: 1.33rem;
    font-weight: bold;
`;

const ImgHighestRate = styled.img`
    border-radius: 50%;
    border: 2px dashed #eee;
    padding: 5px;
    background-color: rgb(143,8,117);
    box-shadow: 0px 1px 20px #542472;
`;

const ImgLowestRate = styled.img`
    border-radius: 50%;
    border: 1px solid rgb(163,6,98);
    padding: 3px;
    background-color: rgb(163,6,98);
    box-shadow: 0px 1px 20px #542472;
`;

const PlayerInfo = styled.div`
    width: 12.5vw;
    height: 20vh;
    padding: 0.5rem;

    display: flex;
`;

const Rate = styled.p`
    color: white;
    font-size: 1.25rem;
    font-weight: bold;
    text-decoration: underline;
    line-height: 3px;
`;

const RatePicker = () => {
    return (
        <CardComponent styles={{ width: '45vw', minHeight: '38vh', marginTop: '1.5rem', marginBottom: '1.5rem',
        background: 'linear-gradient(to top, rgb(101,47,135), rgb(187,62,124))' }}>
        {/* <Card> */}
            <ContainerWithImage>
                <Row>
                    <ColWithFlex>
                        <Paragraph>
                            Most picked player
                        </Paragraph>
                        <PlayerInfo>
                            <ImgHighestRate src={FacePlayer} alt="Face Player" />
                            <Rate>75%&nbsp;&nbsp;&nbsp;</Rate>
                        </PlayerInfo>
                    </ColWithFlex>
                    <ColWithFlex>
                        <Paragraph>
                            Less picked player
                        </Paragraph>
                        <PlayerInfo>
                            <ImgLowestRate src={FacePlayer} alt="Face Player" />
                            <Rate>25%&nbsp;&nbsp;&nbsp;</Rate>
                        </PlayerInfo>
                    </ColWithFlex>
                </Row>
            </ContainerWithImage>
        {/* </Card> */}
        </CardComponent>
    );
}

export default RatePicker;