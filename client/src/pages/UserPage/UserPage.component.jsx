import React, {useEffect,Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../../redux/users/users.actions';
import { getTopPosts } from '../../redux/posts/posts.actions';
import { Link } from 'react-router-dom';
import timeAgo from '../../services/timeAgo.service';

import userLogo from '../../assets/user.png';

import SideBar from '../../components/SideBar/SideBar.component';
import PostItem from '../../components/PostItem/PostItem.component';
import RightSideBar from '../../components/right-sideBar/right-sideBar.component';

import './UserPage.styles.scss'


const UserPage = ({ getUser, user: { user, loading }, match, getTopPosts, post: { posts, isloading }  }) => {
    useEffect(() => {
        getUser(match.params.id);
        // eslint-disable-next-line
    }, [getUser]);

    useEffect(() => {
        getTopPosts();
    }, [ getTopPosts ]);

    return loading || user === null ? <Fragment>Loading...</Fragment> : <Fragment>
        <div className='page'>
            <SideBar/>
            <div className='user-page'>
                <div className='user-main-bar'>
                    <div className='user-card'>
                        <div className='grid'>
                            <div className='img-card'>
                                <div className='avatar-card'>
                                    <div className='avatar'>
                                        <Link className='avatar-link' to={`/users/${user.id}`}>
                                            <div className='logo-wrapper'>
                                                <img src={userLogo} alt='user-logo'/>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className='title'>
                                        <div className='grid'>
                                            {(user.answer_count * 10) + (user.post_count * 5)}
                                            &nbsp;
                                            <span>
                                                POINTS
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='content-card'>
                                <div className='content-grid'>
                                    <div className='info-cell'>
                                        <div className='info'>
                                            <div className='details'>
                                                <h2>{user.username}</h2>
                                            </div>
                                            <div className='date'>
                                                <p>
                                                    user created on&nbsp;-&nbsp;{timeAgo(user.created_at)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='stats-cell'>
                                        <div className='count-sec'>
                                            <div className='counts'>
                                                <div className='cells'>
                                                    <div className='column-grid'>
                                                        <div className='head'>
                                                            {user.answer_count}
                                                        </div>
                                                        <div className='foot'>
                                                            answers
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='cells'>
                                                    <div className='column-grid'>
                                                        <div className='head'>
                                                            {user.post_count}
                                                        </div>
                                                        <div className='foot'>
                                                            questions
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='cells'>
                                                    <div className='column-grid'>
                                                        <div className='head'>
                                                            {user.comment_count}
                                                        </div>
                                                        <div className='foot'>
                                                            comments
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='cells'>
                                                    <div className='column-grid'>
                                                        <div className='head'>
                                                            {user.tag_count}
                                                        </div>
                                                        <div className='foot'>
                                                            tags
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3>Questions asked by {user.username}</h3>
                    <div className='questions'>
                        {posts.length === 0 ? ( <h4 style={{margin: '30px 30px'}}>There are no questions asked by {user.username}</h4> ) :
                            posts.map(post => (
                                user.username === post.username &&
                                <PostItem key={post.id} post={post} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <RightSideBar/>
        </div>
    </Fragment>


};

UserPage.propTypes = {
    getUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    getTopPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user,
    post: state.post
});

export default connect(mapStateToProps, { getUser, getTopPosts })(UserPage);