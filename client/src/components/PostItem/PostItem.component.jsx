import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import timeAgo from '../../services/timeAgo.service';
import userIcon from '../../assets/user.png';

import './PostItem.styles.scss';

const PostItem = ({ post: { id, title, body, tagname, username, user_id, answer_count, comment_count, created_at } }) => {
    return (
        <div className='posts'>
            <div className='stats-container'>
                <div className='stats'>
                    <div className='vote'>
                        <span className='vote-count'>{answer_count}</span>
                        <div className='count-text'>answers</div>
                    </div>
                    <div className='vote'>
                        <span className='vote-count'>{comment_count}</span>
                        <div className='count-text'>comments</div>
                    </div>
                </div>
            </div>
            <div className='summary'>
                <h3><a href={`/questions/${id}`}>
                    {title}
                </a></h3>
                <div className='brief'>
                    {body.substring(0, 200)}...
                </div>
                <div className='question-tags'>
                    <Link to={`/tags/${tagname}`}>
                        {tagname}
                    </Link>
                </div>
                <div className='question-user'>
                    <div className='user-info'>
                        <div className='user-action-time'>asked {timeAgo(created_at)}</div>
                        <div className='user-gravatar'>
                            <Link to={`/users/${user_id}`}>
                                <div className='logo-wrapper'>
                                    <img alt='userlogo'
                                         src={userIcon}/>
                                </div>
                            </Link>
                        </div>
                        <div className='user-details'>
                            <Link to={`/users/${user_id}`}>
                                {username}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired
};


export default connect(null)(PostItem);