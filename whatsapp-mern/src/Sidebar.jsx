import React from 'react';
import './Sidebar.css';
import Groups from './Groups';
import { Avatar } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeSharpIcon from '@material-ui/icons/DonutLargeSharp';
import MoreVertSharpIcon from '@material-ui/icons/MoreVertSharp';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';


function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src="https://pbs.twimg.com/profile_images/1378313855009349632/tZHjQIEx_400x400.jpg" />
                <div className="sidebar_headerright">
                    <IconButton><ChatIcon /></IconButton>
                    <IconButton><DonutLargeSharpIcon /></IconButton>
                    <IconButton><MoreVertSharpIcon /></IconButton>
                </div>
            </div>

            <div className="sidebar_search">
                <SearchIcon />
                <input type="text" placeholder="Search" />
            </div>
            <div className="sidebar_groups">
                <Groups />
            </div>
        </div>
    );
}

export default Sidebar;