import React from 'react';
import MyTeams from '../components/MyTeams';
import Top5 from '../components/Top5';
import RatePicker from '../components/RatePicker';
import ContentComponent from '../components/Content';

const Teams = () => {

    return (
        <ContentComponent>
            <MyTeams />
            <div>
                <Top5 />
                <RatePicker />
            </div>
        </ContentComponent>
    );
}

export default Teams;