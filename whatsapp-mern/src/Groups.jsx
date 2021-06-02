import React from 'react';
import { Avatar } from '@material-ui/core';
import './Groups.css';

function Groups() {
    return (
        <div className="groups">
            
            <div className="groupname">
                <Avatar />
                <div className="details">
                    <h2>Goutham</h2>
                    <p>this is the last message</p>
                </div>
            </div>
            <div className="groupname">
                <Avatar />
                <div className="details">
                    <h2>Revan</h2>
                    <p>this is the last message</p>
                </div>
            </div>
            <div className="groupname">
                <Avatar />
                <div className="details">
                    <h2>Anirudh</h2>
                    <p>this is the last message</p>
                </div>
            </div>
        </div>
    );
}

export default Groups;