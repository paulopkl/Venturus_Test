import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import styled from 'styled-components';
import CardComponent from './Card';

const CardHeader = styled.div`
    height: 11vh;
    padding: 20px 30px 20px 30px;

    display: flex;
    justify-content: space-between;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    color: rgb(85,44,138);
    margin: 0;

    display: flex;
    align-items: center;
`;

const CardBody = styled.div`
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    padding: 30px 20px;
`;

const TableLeft = styled.div`
    background-color: rgb(232,226,231);
    border-radius: 12.5px;
    padding: 5px;
`;

const TableRight = styled.div`
    background-color: rgb(232,226,231);
    border-radius: 12.5px;
    padding: 5px;
`;

const TableRow = styled.tr`
    background-color: rgb(232,226,231);
    border-radius: 8px;
    border: 1px solid rgb(232,226,231);
    display: flex;

    td {
        background-color: white;
        border-radius: 8px 0 0 8px;
        width: 75%;
    }
    
    th {
        background-color: white;
        border-radius: 0 8px 8px 0;
        padding-left: 20px;
        width: 25%;
    }
    
    &:hover {
        border: 1px solid rgb(215,93,132);
    }
`;

const Tbody = styled.tbody`
    margin: 5px !important;
    padding: 5px;
`;

const Paragraph = styled.p`
    font-weight: 500;
`;

const Top5 = () => {
    const [HighestAge, setHighestAge] = useState([{ player_name: '', nationality: '', age: 0 }]);
    const [LowestAge, setLowestAge] = useState([{ player_name: '', nationality: '', age: 0 }]);


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

            setHighestAge(playersTeam.slice(5, 10).reverse()); // 6, 7, 8, 9, 10
            setLowestAge(playersTeam.slice(0, 5)); // 0, 1, 2, 4, 5
        }
    }, []);

    return (
        <CardComponent styles={{ width: '45vw', height: 'auto' }}>
            <CardHeader>
                <Title>Top 5</Title>
                <div style={{ visibility: 'hidden' }}>Hire me Please!!</div>
            </CardHeader>
            <CardBody>
                <Container>
                    <Row style={{ display: 'flex' }}>
                        <Col md={6} sm={12} className="pl-0 pr-1">
                            <Paragraph>Highest avg age</Paragraph>
                            <TableLeft>
                                <Table className="m-0" responsive>
                                    <Tbody>
                                        {HighestAge.map((p, i) => (
                                            <TableRow key={i}>
                                                <td>{p.player_name}</td>
                                                <th>{(p.age).toFixed(1)}</th>
                                            </TableRow>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableLeft>
                        </Col>
                        <Col md={6} sm={12} className="pl-0 pr-0 mt-3 mt-md-0 pl-md-1">
                            <Paragraph>Lowest avg age</Paragraph>
                            <TableRight>
                                <Table className="m-0" responsive>
                                    <tbody>
                                        {LowestAge.map((p, i) => (
                                            <TableRow key={i}>
                                                <td>{p.player_name}</td>
                                                <th>{(p.age).toFixed(1)}</th>
                                            </TableRow>
                                        ))}
                                    </tbody>
                                </Table>
                            </TableRight>
                        </Col>
                    </Row>
                </Container>
            </CardBody>
        </CardComponent>
    );
}

export default Top5;