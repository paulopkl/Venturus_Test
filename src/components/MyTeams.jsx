import React, { useEffect, useState } from 'react';

import { AiOutlinePlus } from 'react-icons/ai';
import { FaTrash, FaPen } from 'react-icons/fa';
import { IoMdShare } from 'react-icons/io';

import { Table, Tooltip, OverlayTrigger, FormControl } from 'react-bootstrap';

import styled from 'styled-components';
import CardComponent from './Card';

import { Link } from 'react-router-dom';

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

const AddButton = styled(Link)`
    height: 5.5vh;
    border: none;
    background: linear-gradient(to bottom, rgb(170,57,122), rgb(128,51,130));
    border-radius: 12px;
    box-shadow: 0px 5px 10px rgb(170,57,122);
    padding: 5px 9px;
    cursor: pointer;

    display: flex;
    align-items: center;
`;

const CardBody = styled.div`
    border-top: 1px solid #eee;
    padding: 20px;

    display: flex;
    justify-content: space-between;
`;

const TableRB = styled(Table)`
    font-weight: 400;
`;

const TableRow = styled.tr`
    margin-top: auto;
    margin-bottom: auto;

    &:hover {
        background-color: rgb(247,238,247);
        color: rgb(177,61,124);
    }
`;

const TableData = styled.td`
    min-height: 49px;
    padding-bottom: 0;

    display: ${props => props.icons ? 'flex' : ''};
    justify-content: ${props => props.icons ? 'space-evenly' : '' };
    align-items: ${props => props.icons ? 'center' : '' };
`;

const MyTeams = () => {

    const [data, setData] = useState([{ name: '', description: '' }]);
    const [fieldOne, setFieldOne] = useState('');
    const [fieldTwo, setFieldTwo] = useState('');
    
    useEffect(() => {
        const teams = [
            { name: 'Barcelona', description: 'Barcelona Squad' },
            { name: 'Real Madrid', description: 'Real Madrid' },
            { name: 'Milian', description: 'Milian Squad' },
            { name: 'Liverpool', description: 'Liverpool Squad' },
            { name: 'Bayen Munich', description: 'Bayen Munich Squad' },
            { name: 'Lazio', description: 'Lazio Squad' },
        ];

        setData(teams);
    }, []);

    const renderTooltip = (props, edit) => (
        <Tooltip id="button-tooltip" {...props}>
          {edit ? edit : 'Simple tooltip'}
        </Tooltip>
    );

    const removeTeam = id => {
        let team = [...data];
        team.splice(id, 1);

        setData(team);
    }

    const handleSelect = (e, targetState) => {
        if (targetState === 'Two') {
            setFieldTwo(e.target.value);
        } else {
            setFieldOne(e.target.value);
        }
    }

    return (
        <CardComponent styles={{ width: '45vw', minHeight: '90vh' }}>
            <CardHeader>
                <Title>My teams</Title>
                <AddButton to="/createteam">
                    <AiOutlinePlus color="white" size={26} />
                </AddButton>
            </CardHeader>
            <CardBody>
                <TableRB>
                    <thead>
                        <tr>
                            <th>
                                <FormControl as="select" className="my-1 mr-sm-2" style={{ border: 'none', 
                                    borderRight: '1px solid #DDD', padding: 0 }} custom 
                                        onChange={handleSelect}>
                                            <option value="Name">Name</option>
                                            <option value="Description">Description</option>
                                </FormControl>
                            </th>
                            <th colSpan={2}>
                                <FormControl as="select" className="my-1 mr-sm-2" style={{ border: 'none',
                                    padding: 0 }} custom onChange={e => handleSelect(e, 'Two')}>
                                        <option value="Description">Description</option>
                                        <option value="Name">Name</option>
                                </FormControl>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((team, id) => (
                            <TableRow>
                                <TableData>{fieldOne === 'Name' ? team.name : team.description}</TableData>
                                <TableData>{fieldTwo === 'Name' ? team.name : team.description}</TableData>
                                <TableData icons>
                                    <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }}
                                        overlay={props => renderTooltip(props, "Remove")}>
                                                <FaTrash size={11} style={{ cursor: "pointer" }}
                                                    onClick={() => removeTeam(id)} />
                                        </OverlayTrigger>
                                    <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }}
                                        overlay={props => renderTooltip(props, "Share")}>
                                            <IoMdShare size={12} style={{ cursor: "pointer" }} />
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }}
                                        overlay={props => renderTooltip(props, "Edit")}>
                                            <FaPen size={12} style={{ cursor: "pointer" }} />
                                    </OverlayTrigger>
                                </TableData>
                            </TableRow>
                        ))}
                    </tbody>
                </TableRB>
            </CardBody>
        </CardComponent>
    );
}

export default MyTeams;