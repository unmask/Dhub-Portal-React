import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import timeAgo from "../../services/timeAgo.service";

import userLogo from '../../assets/user.png';

import './UserPanel.styles.scss';

const UserPanel = ({ user: { id, username, created_at, posts_count, tags_count } }) => {
    return (
        <div className='user-panel-info'>
            <div className='user-gravatar'>
                <a href={`/users/${id}`}>
                    <div className='logo-wrapper'>
                        <img alt='user-logo'
                             src={userLogo}/>
                    </div>
                </a>
            </div>
            <div className='user-details'>
                <a href={`/users/${id}`} style={{color: '#ee770e'}}>{username}</a>
                <span className='post-count'>questions - {posts_count}</span>
                <span className='tag-count'>tags - {tags_count}</span>
                <span style={{fontSize:'11px', float:'right'}}>{timeAgo(created_at)}</span>
            </div>
        </div>
    )
};

UserPanel.propTypes = {
    user: PropTypes.object.isRequired
};

export default connect(null)(UserPanel);