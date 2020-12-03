import React, { useState, useEffect } from 'react';
import { Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, Row, Toast } from 'react-bootstrap';
import styled from 'styled-components';
import CardComponent from '../components/Card';
import ContentComponent from '../components/Content';

import { IoClose } from 'react-icons/io5';

import './Team.css';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

import { AiOutlinePlus } from 'react-icons/ai';

import './Team.css';

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

const Label = styled(FormLabel)` font-weight: 700; `;

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

const Flex = styled.div` display: flex; flex-wrap: wrap; `;

const Card = styled.div`
    width: 100%;
    margin-bottom: 2vh;
    padding: 3% 4%;
    background: linear-gradient(to bottom, rgb(253,253,253), rgb(229,229,229));
    border: 2px dashed rgb(224,224,224);
`;

const Paragraph = styled.p` margin-bottom: 0.5vh; `;

const Span = styled.span`
    font-weight: ${props => props.bold ? 'bold' : '500'};
    color: ${props => props.lilas ? 'rgb(208,58,106)' : ''};
`;

const SoccerField = styled.div`
    height: 88vh;
    width: 100%;
    padding: 7%;
    border-radius: 5px;
    background: linear-gradient(to bottom, rgb(153,52,125), rgb(120,44,127));
    overflow: scroll;

    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 50px;
    grid-column-gap: 80px;
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

const ToastCard = styled.div`
    position: fixed;
    width: 33vw;
    top: 2vh;
    left: 2vw;
    z-index: 9999999;
`;

const CreateTeam = props => {
    const history = useHistory();

    const [validated, setValidated] = useState(false);

    const [show, setShow] = useState(false);

    const [userData, setUserData] = useState({ 
        id: props.match.params.id,
        teamName: '', 
        url: '', 
        description: '', 
        teamType: 'Fantasy', // Real || Fantasy
        tags: 'BR,PTW,Attack',
        formation: '' 
    });
    const [nameSearch, setNameSearch] = useState('Neymar');
    const [players, setPlayers] = useState([{ player_name: '', nationality: '', age: 0 }]);
    const [playersTeam, setPlayersTeam] = useState([]);

    useEffect(() => {
        getPlayers();

        let storageTeams = localStorage.getItem('teams');
        storageTeams = JSON.parse(storageTeams);

        let team = storageTeams[props.match.params.id - 1];

        setUserData({ 
            ...userData, 
            teamName: team.teamName,
            url: team.url, 
            description: team.description, 
            teamType: team.teamType,
            tags: team.tags,
            formation: team.formation 
        });

        setPlayersTeam(team.playersTeam);
    }, []);

    const getPlayers = playerName => {
        const options = {
            method: 'GET',
            url: `https://api-football-v1.p.rapidapi.com/v2/players/search/${playerName ? playerName : 'Neymar'}`,
            headers: {
                'x-rapidapi-key': 'a3540c8e73msh126c82d4d79a6b5p1659d6jsne18406bf2d62',
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
            }
        };

        axios.request(options).then(resp => {
            console.log(resp.data.api.players);
            setPlayers(resp.data.api.players);
        }).catch(err => {
            console.error(err);
        });
    }

    const changeTags = e => {
        let clone = userData.tags.trim();
        clone = clone.split(',');

        // Evitar que seja apertado enter varias vezes
        if (clone[clone.length - 2] === '' && clone[clone.length - 1] === '') {
            clone.pop();
            clone = clone.join();
            setUserData({ ...userData, tags: clone });
        } else {
            setUserData({ ...userData, tags: e.target.value });
        }
    }
    
    const onEnter = event => {
        if (event.which === 13 || event.keyCode === 13) {
            event.preventDefault();
            let clone = userData.tags.trim().split(',');

            // Evitar que seja apertado enter varias vezes
            if (clone[clone.length - 1] !== '') { 
                clone.push('');
            }
            
            clone = clone.join();
            setUserData({ ...userData, tags: clone });
        }
    }
    
    const removeItem = indice => {
        let clone = userData.tags.trim().split(',');
        clone.splice(indice, 1);
        clone = clone.join();
        setUserData({ ...userData, tags: clone });
    }

    const validateUrl = () => {
        let validation = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        let regex = new RegExp(validation);

        if(userData.url.match(regex) === null) {
            setUserData({ ...userData, url: '' });
        }

        return userData.url.match(regex) === null;
    }

    const searchPlayer = () => { 
        if(nameSearch.length < 4) {
            setShow(true);
        } else {
            getPlayers(nameSearch);
        }
    }

    const handleSubmit = event => {
        const form = event.currentTarget;

        event.preventDefault();

        if (form.checkValidity() === false || validateUrl()) {
          event.stopPropagation();
          setValidated(true);
        } else {
            let storageTeams = localStorage.getItem('teams');
            storageTeams = JSON.parse(storageTeams);

            if(storageTeams || storageTeams !== null) {
                storageTeams[userData.id - 1] = { ...userData, playersTeam };
                let newTeam = JSON.stringify(storageTeams);
                
                localStorage.setItem('teams', newTeam);
                history.push('/team');
            } else {
                let newTeam = []
                newTeam[userData.id - 1] = { ...userData, playersTeam };
                newTeam = JSON.stringify(newTeam); 

                localStorage.setItem('teams', newTeam);
                history.push('/team');
            }
        }
    };

    const dragstart = event => {
        const dropzones = document.querySelectorAll('.dropzone');
        dropzones.forEach(dropzone => dropzone.classList.add('highlight'));

        event.target.classList.add('isDragging');
    }
    
    const dragend = event => {
        const dropzones = document.querySelectorAll('.dropzone');
        dropzones.forEach(dropzone => dropzone.classList.remove('highlight'));

        event.target.classList.remove('isDragging');
    }

    const overCard = event => {
        event.preventDefault();

        event.target.classList.add('over');

        let containsElement = event.target.firstChild
            && event.target.firstChild.firstChild 
            && event.target.firstChild.firstChild;

        if(containsElement && containsElement !== null) {
            event.target.removeChild(event.target.firstChild);
        }
    }
    
    const dropCard = (event, position) => {
        event.preventDefault();
        
        let cardBeingDragged = document.querySelector('.isDragging');

        let player_name = cardBeingDragged.firstChild.firstChild.firstChild.lastChild.textContent;
        let nationality = cardBeingDragged.firstChild.firstChild.lastChild.lastChild.textContent;
        let age = cardBeingDragged.firstChild.lastChild.children[0].lastChild.textContent;

        cardBeingDragged = cardBeingDragged.firstChild.firstChild.firstChild.lastChild;

        let clone = cardBeingDragged.cloneNode(true);
        clone.classList.add('selected');

        if (event.target.firstChild) {
            event.target.removeChild(event.target.firstChild);
        }

        event.target.appendChild(clone);

        let arrayTeam = [ ...playersTeam ];
        arrayTeam[position] = { player_name: String(player_name), nationality, age: Number(age) };
        setPlayersTeam(arrayTeam);

        event.target.classList.remove('over');
    }

    return (
        <ContentComponent>
            <CardComponent styles={{ width: '100%', minHeight: '90vh' }}>
                <CardHeader>
                    <Title>Create Your Team</Title>
                </CardHeader>
                <CardBody>
                    <TitleBody>TEAM INFORMATION</TitleBody>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Container style={{ margin: '8vh auto' }}>
                            <Row>
                                <Col md={6} className="pl-3 pr-5">
                                    <FormGroup style={{ marginBottom: '5vh' }}>
                                        <Label>Team Name</Label>
                                        <FormControl 
                                            required
                                            type="text" 
                                            placeholder="Insert team name" 
                                            value={userData.teamName} 
                                            onChange={e => setUserData({ ...userData, teamName: e.target.value })} 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid team name.
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Description</Label>
                                        <FormControl 
                                            as="textarea" 
                                            rows={9} 
                                            className="textArea" 
                                            value={userData.description} 
                                            onChange={e => setUserData({ ...userData, description: e.target.value })} 
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6} className="pl-5 pr-3">
                                    <FormGroup style={{ marginBottom: '5vh' }}>
                                        <Label>Team Website</Label>
                                        <FormControl 
                                            type="text" 
                                            placeholder="http://myteam.com" 
                                            required
                                            onChange={e => setUserData({ ...userData, url: e.target.value })} 
                                            value={userData.url} 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid URL.
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Team type</Label>
                                        <br/>
                                        <Check 
                                            inline 
                                            custom 
                                            label="Real" 
                                            type="radio" 
                                            name="teamType" 
                                            value="Real" 
                                            onChange={e => setUserData({ ...userData, teamType: e.target.value })} 
                                            checked={userData.teamType === 'Real'}
                                            id="teamType1"
                                        />
                                        <Check 
                                            inline 
                                            custom 
                                            label="Fantasy" 
                                            type="radio" 
                                            name="teamType" 
                                            value="Fantasy"
                                            onChange={e => setUserData({ ...userData, teamType: e.target.value })} 
                                            checked={userData.teamType === 'Fantasy'} 
                                            id="teamType2"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Tags</Label>
                                        <FormControl as="textarea" className="textArea" onKeyPress={onEnter} 
                                            value={userData.tags} onChange={changeTags} spellCheck={false} /> 
                                    </FormGroup>
                                    <Flex>
                                        {userData.tags.length > 1 && userData.tags.split(',').map((t, i) => (
                                            <Tags key={i}>
                                                {t} <IoClose color="white" onClick={() => removeItem(i)} />
                                            </Tags>
                                        ))}
                                    </Flex>
                                </Col>
                            </Row>
                        </Container>
                        <TitleBody>CONFIGURE SQUAD</TitleBody>
                        <Container style={{ margin: '8vh auto' }}>
                            <Row>
                                <Col md={6} className="pl-4 pr-5 mt-3">
                                    <Flex style={{ marginBottom: '5vh', alignItems: 'center' }}>
                                        <Label style={{ margin: 0 }}>Formation</Label>
                                        <FormControl 
                                            custom
                                            style={{ maxWidth: '30%', margin: '0 10%' }} 
                                            as="select" 
                                            value={userData.formation}
                                            onChange={e => setUserData({ ...userData, formation: e.target.value })}>
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
                                    <SoccerField>
                                        {playersTeam.map((p, i) => (
                                            <div key={p} className="position dropzone" 
                                                onDrop={e => dropCard(e, i)} onDragOver={overCard}>
                                                    <div className="selected">
                                                        <Span lilas>{p.player_name}</Span>
                                                    </div>
                                            </div>
                                        ))}
                                    </SoccerField>
                                    <Button type="submit">Save</Button>
                                </Col>
                                <Col md={6} className="pl-5 pr-4">
                                    <FormGroup className="mb-4">
                                        <Label>Search Players</Label>
                                        <FormControl type="text" onChange={e => setNameSearch(e.target.value)} 
                                            placeholder="Neymar" minLength={3} />
                                        <Button type="button" onClick={searchPlayer}>Pesquisar</Button>
                                    </FormGroup>
                                    {players.map((p, i) => (
                                        <Card key={i} draggable={true} onDragStart={dragstart}
                                            className="Card" onDragEnd={dragend}>
                                                <Flex>
                                                    <Col md={10} className="p-0 w-100">
                                                        <Paragraph>
                                                            <Span bold>Name: </Span>
                                                            <Span lilas>{p.player_name}</Span>
                                                        </Paragraph>
                                                        <Paragraph>
                                                            <Span bold>Nationality: </Span>
                                                            <Span lilas>{p.nationality || '[Not Defined]'}</Span>
                                                        </Paragraph>
                                                    </Col>
                                                    <Col className="p-0">
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
                    </Form>
                </CardBody>
            </CardComponent>
            <ToastCard>
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto text-danger">Warnign</strong>
                    </Toast.Header>
                    <Toast.Body className="text-danger">
                        Oops, you must type 3 characters in minimal to search!
                    </Toast.Body>
                </Toast>
            </ToastCard>
        </ContentComponent>
    );
}

export default CreateTeam;