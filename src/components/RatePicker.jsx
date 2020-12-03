import React, { useEffect, useState} from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import Divider from '../assets/divider.png';
import FacePlayer from '../assets/facePlayer.png';

import styled from 'styled-components';
import CardComponent from './Card';

const ContainerWithImage = styled(Container)`
    width: 100%;
    height: 100%;
    background-image: url(${Divider});
    background-position: center; 
    background-repeat: no-repeat;
    background-size: 25% 100%;
    padding: 2.5rem;
`;

const ColWithFlex = styled(Col)`
    padding: 0 2rem 0 3rem;
    
    display: flex;
    justify-content: center;
    flex-direction: column;
    
    @media(max-width: 1000px) {
        padding: 0 15vw;
        
        @media(max-width: 410px) {
            padding: 0;
            display: block;
        }
    }
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
    const [ratePicked, setRatePicked] = useState({ mostPicked: '75%', lessPicked: '25%' });

    useEffect(() => {
        let storageTeams = localStorage.getItem('teams');
        
        if (storageTeams) {
            
            storageTeams = JSON.parse(storageTeams);

            let playersTeam = storageTeams[storageTeams.length - 1].playersTeam;

            playersTeam.sort((a, b) => {
                if (a.age > b.age) return 1;
                if (a.age < b.age) return -1;

                return 0;
            });

            let rateList = countItems(playersTeam);

            let arrayRate = Object.values(rateList).sort()

            let oneRate = 100 / playersTeam.length;


            let mostPicked = arrayRate[arrayRate.length - 1];
            mostPicked = (mostPicked * oneRate).toFixed(0);
            mostPicked = `${mostPicked}%`
            
            let lessPicked = arrayRate[0];
            lessPicked = (lessPicked * oneRate).toFixed(0);
            lessPicked = `${lessPicked}%`

            setRatePicked({ mostPicked, lessPicked });
        }
    }, []);

    const countItems = arr => {
        const countMap = Object.create(null);
    
        for (const element of arr) {
            if (!countMap[element.player_name]) {
                // Se ainda não existir elemento, definimos como um, já que
                // estamos na primeira ocorrência.
                countMap[element.player_name] = 1;
            } else {
                // Caso contrário, incrementamos um no número atual.
                countMap[element.player_name] += 1;
            }
        }
        return countMap;
    }

    return (
        <CardComponent styles={{ width: '45vw', minHeight: '38vh', marginTop: '1.5rem', marginBottom: '1.5rem',
            background: 'linear-gradient(to top, rgb(101,47,135), rgb(187,62,124))',
            display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <ContainerWithImage>
                    <Row className="flex-md-row d-md-flex d-sm-block">
                        <ColWithFlex>
                            <Paragraph>Most picked player</Paragraph>
                            <PlayerInfo>
                                <ImgHighestRate src={FacePlayer} alt="Face Player" />
                                <Rate>{ ratePicked.mostPicked }&nbsp;&nbsp;&nbsp;</Rate>
                            </PlayerInfo>
                        </ColWithFlex>
                        <ColWithFlex>
                            <Paragraph>Less picked player</Paragraph>
                            <PlayerInfo>
                                <ImgLowestRate src={FacePlayer} alt="Face Player" />
                                <Rate>{ ratePicked.lessPicked }&nbsp;&nbsp;&nbsp;</Rate>
                            </PlayerInfo>
                        </ColWithFlex>
                    </Row>
                </ContainerWithImage>
        </CardComponent>
    );
}

export default RatePicker;