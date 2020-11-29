import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import styled from 'styled-components';

const Card = styled.section`
    width: 45vw;
    height: auto;
    background-color: rgb(255, 255, 255);
    border-width: 0;
    border-radius: 15px;
    box-shadow: 0px 0px 5px #eee;
`;

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
    const [HighestAge, setHighestAge] = useState([{ name: '', age: 0 }]);
    const [LowestAge, setLowestAge] = useState([{ name: '', age: 0 }]);

    useEffect(() => {
        const data = [
            { name: 'Inter Milian', age: 31.9 },
            { name: 'APOEL Nicosia', age: 31.7 },
            { name: 'AC Milian', age: 31.6 },
            { name: 'Besiktas JK', age: 31.4 },
            { name: 'Olympiacos Piraeus', age: 31.3 },
        ];
        
        const data2 = [            
            { name: 'Zalgiris Vilnius', age: 21.1 },
            { name: 'Arsenal FC', age: 21.6 },
            { name: 'Ajax Amsterdam', age: 22.0 },
            { name: 'FC Nantes', age: 22.1 },
            { name: 'CSKA Moscow', age: 22.5 },
        ];

        setHighestAge(data);
        setLowestAge(data2);
    }, []);

    return (
        <Card>
            <CardHeader>
                <Title>Top 5</Title>
                <div style={{ visibility: 'hidden' }}>Hire me Please!!</div>
            </CardHeader>
            <CardBody>
                <Container>
                    <Row>
                        <Col style={{ paddingLeft: 0, paddingRight: '0.75rem' }}>
                            <Paragraph>Highest avg age</Paragraph>
                            <TableLeft>
                                <Table responsive style={{ margin: 0 }}>
                                    <Tbody>
                                        {HighestAge.map(p => (
                                            <TableRow>
                                                <td>{p.name}</td>
                                                <th>{(p.age).toFixed(1)}</th>
                                            </TableRow>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableLeft>
                        </Col>
                        <Col style={{ paddingLeft: '0.75rem', paddingRight: 0 }}>
                            <Paragraph>Lowest avg age</Paragraph>
                            <TableRight>
                                <Table responsive style={{ margin: 0 }}>
                                    <tbody>
                                        {LowestAge.map(p => (
                                            <TableRow>
                                                <td>{p.name}</td>
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
            <div className="footer">

            </div>
        </Card>
    );
}

export default Top5;