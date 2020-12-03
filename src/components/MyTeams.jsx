import React, { useEffect, useState } from 'react';

import { AiOutlinePlus } from 'react-icons/ai';
import { FaTrash, FaPen } from 'react-icons/fa';
import { IoMdShare } from 'react-icons/io';

import { Table, Tooltip, OverlayTrigger, FormControl } from 'react-bootstrap';

import styled from 'styled-components';
import CardComponent from './Card';

import { Link, useHistory } from 'react-router-dom';

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
    const history = useHistory();

    const [data, setData] = useState([
        { teamName: '', description: '', url: '', teamType: '', tags: '', formation: '' }
    ]);
    const [fieldOne, setFieldOne] = useState('Name');
    const [fieldTwo, setFieldTwo] = useState('Description');
    
    useEffect(() => {

        let storageTeams = localStorage.getItem('teams');

        if (JSON.parse(storageTeams) === 'null') {
            localStorage.removeItem('teams') 
        } else {
            setData(JSON.parse(storageTeams));
        }
    }, []);

    const renderTooltip = (props, edit) => (
        <Tooltip id="button-tooltip" {...props}>
          {edit ? edit : 'Simple tooltip'}
        </Tooltip>
    );

    const removeTeam = id => {
        let team = [...data];
        team.splice(id, 1);

        if(team.length === 0) {
            localStorage.removeItem('teams');
        } else {
            localStorage.setItem('teams', JSON.stringify(team));
        }

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
                <AddButton to="/create/team">
                    <AiOutlinePlus color="white" size={26} />
                </AddButton>
            </CardHeader>
            <CardBody>
                <TableRB>
                    <thead>
                        <tr>
                            <th>
                                <FormControl as="select" className="my-1 mr-sm-2 p-0" style={{ border: 'none', 
                                    borderRight: '1px solid #DDD' }} custom onChange={handleSelect}>
                                        <option value="Name">Name</option>
                                        <option value="Description">Description</option>
                                        <option value="Url">Url</option>
                                        <option value="TeamType">TeamType</option>
                                        <option value="Tags">Tags</option>
                                        <option value="Formation">Formation</option>
                                </FormControl>
                            </th>
                            <th colSpan={2}>
                                <FormControl as="select" className="my-1 mr-sm-2 p-0" style={{ border: 'none' }}
                                    custom onChange={e => handleSelect(e, 'Two')}>
                                        <option value="Description">Description</option>
                                        <option value="Name">Name</option>
                                        <option value="Url">Url</option>
                                        <option value="TeamType">TeamType</option>
                                        <option value="Tags">Tags</option>
                                        <option value="Formation">Formation</option>
                                </FormControl>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((team, i) => (
                            <TableRow key={i}>
                                <TableData>
                                    {
                                        fieldOne === 'Name' ? team.teamName 
                                            : fieldOne === 'Description' ? team.description
                                            : fieldOne === 'Url' ? team.url
                                            : fieldOne === 'TeamType' ? team.teamType
                                            : fieldOne === 'Tags' ? team.tags
                                            : team.formation
                                    }
                                </TableData>
                                <TableData>
                                    {
                                        fieldTwo === 'Name' ? team.teamName 
                                            : fieldTwo === 'Description' ? team.description
                                            : fieldTwo === 'Url' ? team.url
                                            : fieldTwo === 'TeamType' ? team.teamType
                                            : fieldTwo === 'Tags' ? team.tags
                                            : team.formation
                                    }
                                </TableData>
                                <TableData icons>
                                    <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }}
                                        overlay={props => renderTooltip(props, "Remove")}>
                                                <FaTrash size={11} style={{ cursor: "pointer" }}
                                                    onClick={() => removeTeam(i)} />
                                        </OverlayTrigger>
                                    <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }}
                                        overlay={props => renderTooltip(props, "Share")}>
                                            <IoMdShare size={12} style={{ cursor: "pointer" }} />
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }}
                                        overlay={props => renderTooltip(props, "Edit")}>
                                            <FaPen size={12} style={{ cursor: "pointer" }} 
                                                onClick={() => history.push(`/edit/team/${team.id}`)} />
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