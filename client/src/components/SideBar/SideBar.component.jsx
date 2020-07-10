import React from 'react';
import { NavLink } from 'react-router-dom';

// import { ReactComponent as GlobalIcon} from '../../assets/globe-americas-solid.svg'
import './SideBar.styles.scss';

const SideBar = () => (
    <div className='side-bar-container'>
        <div className='side-bar-tabs'>

            <NavLink exact activeClassName='active' className='home-link nav_link' to='/' >
                <p className="sidebar-border"><span className="fa fa-home icon-padding" />Home</p>
            </NavLink>
            <NavLink activeClassName='active' className='home-link nav_link' to='/tags' >
                <p className="sidebar-border"><span className="fa fa-tag icon-padding" />Tags</p>
            </NavLink>
            <NavLink activeClassName='active' className='home-link nav_link' to='/users' >
                <p className="sidebar-border"><span className="fa fa-user icon-padding" />Users</p>
            </NavLink>
            <NavLink activeClassName='active' className='home-link nav_link' to='/leaderboard' >
                <p className="sidebar-border"><span className="fa fa-superpowers icon-padding" />Leader Board</p>
            </NavLink>
        </div>
    </div>

);

export default SideBar;