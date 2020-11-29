import React, { useState, useEffect } from 'react';
import { Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';

import styled from 'styled-components';
import CardComponent from '../components/Card';
import ContentComponent from '../components/Content';

import { IoClose } from 'react-icons/io5';

import FormationImage from '../assets/formation_3_4_3.png';

import './CreateTeam.css';
import { useHistory } from 'react-router-dom';

const CardHeader = styled.div`
    height: 11vh;
    padding: 20px 30px 20px 30px;

    display: flex;
    justify-content: space-between;
`;

const CardBody = styled.div`
    border-top: 1px solid #eee;
    padding: 20px;

    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    color: rgb(85,44,138);
    margin: 0;

    display: flex;
    align-items: center;
`;

const TitleBody = styled.h1`
    font-size: 1.33rem;
    font-weight: bold;
    color: #999;
    margin: 0;

    text-align: center;
`;

const Label = styled(FormLabel)`
    font-weight: 700;
`;

const Tags = styled.span`
    z-index: 9999999;
    margin: 0.1rem 1%;
    font-weight: 300;
    padding: 5px 10px;
    border-radius: 25px;
    background-color: rgb(197,3,65);
    color: white;
`;

const Check = styled(FormCheck)`
    color: #999;
    
    &:checked {
        background-color: pink !important;
    }
`;

const Flex = styled.div`
    display: flex; 
    flex-wrap: wrap;
`;

const Card = styled.div`
    width: 100%;
    margin-bottom: 2vh;
    padding: 3% 4%;
    background: linear-gradient(to bottom, rgb(253,253,253), rgb(229,229,229));
    border: 2px dashed rgb(224,224,224);
`;

const Paragraph = styled.p`
    margin-bottom: 0.5vh;
`;

const Span = styled.span`
    font-weight: ${props => props.bold ? 'bold' : '500'};
    color: ${props => props.lilas ? 'rgb(208,58,106)' : ''};
`;

const Img = styled.img`
    height: 88vh;
    width: 100%;
    border-radius: 5px;
`;

const Button = styled.button`
    transition: 1s;

    color: rgb(255,255,255);
    background: linear-gradient(to bottom, rgb(153,52,125), rgb(120,44,127));
    box-shadow: 1px 10px 10px rgb(241,229,238);
    font-size: 1.5rem;
    border: 1px solid rgb(197,3,65);
    width: 100%;
    border-radius: 5px;
    margin-top: 2vh;
    padding: 1vh 0;

    
    display: flex;
    justify-content: center;
    align-items: center;
    
    &:hover {
        transition: 1s;
        background: linear-gradient(to bottom, rgb(116, 26, 124), rgb(182, 57, 147));
    }
`;

const CreateTeam = () => {
    const history = useHistory();

    const [tags, setTags] = useState('BR,PTW,Attack');
    const [players, setPlayers] = useState([{ name: '', nacionality: '', age: 0 }]);

    useEffect(() => {
        const data = [
            { name: 'Cristiano Ronaldo', nacionality: 'Portugal', age: 32 },
            { name: 'Ronaldo Luiz de Alves', nacionality: 'Brasil', age: 28 },
            { name: 'Ronaldo da Silva de Souza', nacionality: 'Brasil', age: 18 },
        ]

        setPlayers(data);
    }, []);

    const changeTags = e => {
        let clone = tags.trim();
        clone = clone.split(',');

        // Evitar que seja apertado enter varias vezes
        if (clone[clone.length - 2] === '' && clone[clone.length - 1] === '') {
            clone.pop();
            clone = clone.join();
            setTags(clone);
        } else {
            setTags(e.target.value);
        }
    }
    
    const onEnter = event => {
        if (event.which === 13 || event.keyCode === 13) {
            event.preventDefault();
            let clone = tags.trim().split(',');

            // Evitar que seja apertado enter varias vezes
            if (clone[clone.length - 1] !== '') { 
                clone.push('');
            }
            
            clone = clone.join();
            setTags(clone);
        }
    }
    
    const removeItem = indice => {
        let clone = tags.trim().split(',');
        clone.splice(indice, 1);
        clone = clone.join();
        setTags(clone);
    }

    const onSave = () => {
        alert('Aqui será implementada uma função para salvar os dados no banco de dados!');

        history.push('/team');
    }

    return (
        <ContentComponent>
            <CardComponent styles={{ width: '100%', minHeight: '90vh' }}>
                <CardHeader>
                    <Title>Create Your Team</Title>
                </CardHeader>
                <CardBody>
                    <TitleBody>TEAM INFORMATION</TitleBody>
                    <Container style={{ margin: '8vh auto' }}>
                        <Row>
                            <Col md={6} style={{ paddingLeft: '2vw', paddingRight: '4vw' }}>
                                <FormGroup style={{ marginBottom: '5vh' }}>
                                    <Label>Team Name</Label>
                                    <FormControl type="text" placeholder="Insert team name" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Description</Label>
                                    <FormControl as="textarea" style={{ resize: 'none' }} rows={9} />
                                </FormGroup>
                            </Col>
                            <Col md={6} style={{ paddingLeft: '4vw', paddingRight: '2vw' }}>
                                <FormGroup style={{ marginBottom: '5vh' }}>
                                    <Label>Team Website</Label>
                                    <FormControl type="text" placeholder="http://myteam.com" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Team type</Label>
                                    <br/>
                                    <Check inline label="Real" type="radio" name="teamType" id="custom-radio"
                                        custom />
                                    <Check inline label="Fantasy" type="radio" checked name="teamType" 
                                        id="custom-radio2" custom />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Tags</Label>
                                    <FormControl as="textarea" className="textArea" onKeyPress={onEnter} 
                                        onChange={changeTags} value={tags} spellCheck={false} /> 
                                </FormGroup>
                                <Flex>
                                    {tags.length > 1 && tags.split(',').map((t, i) => (
                                        <Tags>{t} <IoClose color="white" onClick={() => removeItem(i)} /></Tags>
                                    ))}
                                </Flex>
                            </Col>
                        </Row>
                    </Container>
                    <TitleBody>CONFIGURE SQUAD</TitleBody>
                    <Container style={{ margin: '8vh auto' }}>
                        <Row>
                            <Col md={6} style={{ paddingLeft: '2vw', paddingRight: '4vw', marginTop: '2vh' }}>
                                <Flex style={{ marginBottom: '5vh', alignItems: 'center' }}>
                                    <Label style={{ margin: 0 }}>Formation</Label>
                                    <FormControl as="select" style={{ maxWidth: '30%', margin: '0 10%' }} custom>
                                        <option value="3-2-2-3">3 - 2 - 2 - 3</option>
                                        <option value="3-2-3-1">3 - 2 - 3 - 1</option>
                                        <option value="3-4-3">3 - 4 - 3</option>
                                        <option value="3-5-2">3 - 5 - 2</option>
                                        <option value="4-2-3-1">4 - 2 - 3 - 1</option>
                                        <option value="4-3-1-1">4 - 3 - 1 - 1</option>
                                        <option value="4-3-2">4 - 3 - 2</option>
                                        <option value="4-4-2">4 - 4 - 2</option>
                                        <option value="4-5-1">4 - 5 - 1</option>
                                        <option value="5-4-1">5 - 4 - 1</option>
                                    </FormControl>
                                </Flex>
                                <Img src={FormationImage} alt="formation" />
                                <Button onClick={onSave}>Save</Button>
                            </Col>
                            <Col md={6} style={{ paddingLeft: '4vw', paddingRight: '2vw' }}>
                                <FormGroup style={{ marginBottom: '5vh' }}>
                                    <Label>Search Players</Label>
                                    <FormControl type="text" placeholder="Ronal" />
                                </FormGroup>
                                {players.map(p => (
                                    <Card>
                                        <Flex>
                                            <Col md={10} style={{ padding: 0 }}>
                                                <Paragraph>
                                                    <Span bold>Name: </Span>
                                                    <Span lilas>{p.name}</Span>
                                                </Paragraph>
                                                <Paragraph>
                                                    <Span bold>Nacionality: </Span>
                                                    <Span lilas>{p.nacionality}</Span>
                                                </Paragraph>
                                            </Col>
                                            <Col style={{ padding: 0 }}>
                                                <Paragraph>
                                                    <Span bold>Age: </Span>
                                                    <Span lilas>{p.age}</Span>
                                                </Paragraph>
                                            </Col>
                                        </Flex>
                                    </Card>
                                ))}
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
            </CardComponent>
        </ContentComponent>
    );
}

export default CreateTeam;