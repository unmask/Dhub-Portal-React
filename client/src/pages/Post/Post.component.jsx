import React, {useEffect, Fragment,useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getPost, deletePost } from '../../redux/posts/posts.actions';
import { getAnswers, deleteAnswer, addAnswer } from '../../redux/answers/answers.actions';
import { getComments, deleteComment, addComment } from '../../redux/comments/comments.actions';
import timeAgo from '../../services/timeAgo.service';

import { ReactComponent as UpVote } from '../../assets/sort-up-solid.svg';
import { ReactComponent as DownVote } from '../../assets/sort-down-solid.svg';
import userLogo from '../../assets/user.png';

import SideBar from '../../components/SideBar/SideBar.component';
import RightSideBar from '../../components/right-sideBar/right-sideBar.component';

import './Post.styles.scss'

const Post = ({ deletePost, deleteAnswer, addAnswer, deleteComment, addComment, getAnswers, getComments, auth, getPost, answer: { answers }, comment: { comments }, post: { post, loading }, match }) => {

    useEffect(() => {
        getPost(match.params.id);
        getAnswers(match.params.id);
        getComments(match.params.id);
        // eslint-disable-next-line
    }, [ getPost, getAnswers, getComments ]);

    const [ formData, setFormData ] = useState({
        body: ''
    });

    const { body } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        addComment(match.params.id, {body});
        setFormData({
            body: ''
        });
    };

    const [ formDataAnswer, setFormDataAnswer ] = useState({
        text: ''
    });

    const { text } = formDataAnswer;

    const onChangeAnswer = e => setFormDataAnswer({ ...formData, [e.target.name]: e.target.value });

    const onSubmitAnswer = async e => {
        e.preventDefault();
        addAnswer(match.params.id,{text});
        setFormDataAnswer({
            text: ''
        });
    };

    return loading || post === null ? <Fragment>Loading...</Fragment> : <Fragment>
        <div className='page'>
            <SideBar/>
            <div className='post'>
                <div className='main-entity'>
                    <div className='inner-content'>
                        <div className='question-header'>
                            <h1>{post.title}</h1>
                            <div>
                                <Link className='ask-button  btn-bg' to='/add/question'>
                                    Ask Question
                                </Link>
                            </div>
                        </div>
                        <div className='question-date'>
                            <div className='grid-cell'>
                                <span>
                                    Asked
                                </span>
                                <time dateTime={post.created_at}>
                                    {timeAgo(post.created_at)}
                                </time>
                            </div>
                        </div>
                        <div className='question-main'>
                            <div className='question'>
                                <div className='post-layout'>
                                    <div className='vote-cell'>
                                        <div className='stats'>
                                            <div className='vote'>
                                                <span className='vote-count'>{post.answer_count}</span>
                                                <div className='count-text'>answers</div>
                                            </div>
                                            <div className='vote'>
                                                <span className='vote-count'>{post.comment_count}</span>
                                                <div className='count-text'>comments</div>
                                            </div>
                                            {/* <div className='vote'>
                                                <span className='vote-count'>1</span>
                                                <div className='count-text'>tags</div>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className='post-cell'>
                                        <div className='post-text'>
                                            {post.post_body}
                                        </div>
                                        <div className='post-tags'>
                                            <div className='tag-cell'>
                                                <Link to={`/tags/${post.tagname}`}>{post.tagname}</Link>
                                            </div>
                                        </div>
                                        <div className='post-actions'>
                                            <div className='post-actions-extended'>
                                                <div className='post-btns'>
                                                    <div className='post-menu'>
                                                        {!auth.loading && auth.isAuthenticated && parseInt(post.user_id) === auth.user.id && (
                                                            <Link
                                                                className='post-links'
                                                                title='Delete the post'
                                                                onClick={e => deletePost(post.id)}
                                                                to='/questions'
                                                            >
                                                                delete
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='post-owner'>
                                                    <div className='user-block'>
                                                        <div className='action-time'>asked {timeAgo(post.created_at)}</div>
                                                        <div className='user-logo'>
                                                            <Link className='user-link' to={`/users/${post.user_id}`}>
                                                                <div className='logo-wrapper'>
                                                                    <img alt='user_logo' src={userLogo}/>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        <div className='user-profile'>
                                                            <Link className='user-profile-link' to={`/users/${post.user_id}`}>{post.username}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='comments-cell'>
                                        <div className='comments'>
                                            <ul className='comments-list'>
                                                {comments.map(comment => (
                                                    <li className='comments-item' key={comment.id} >
                                                        <div className='comment-text'>
                                                            <div className='comment-body'>
                                                                <span className='body'>
                                                                    {comment.body}
                                                                </span>
                                                                &nbsp;&ndash;&nbsp;
                                                                <Link className='user' to={`/users/${comment.user_id}`}>
                                                                    {comment.username}
                                                                </Link>
                                                                <span title={comment.created_at}
                                                                      className='date'>{timeAgo(comment.created_at)}
                                                                </span>
                                                            </div>
                                                            {!auth.loading && auth.isAuthenticated && parseInt(comment.user_id) === auth.user.id && (
                                                                <Link
                                                                    className='comment-links'
                                                                    title='Delete the comment'
                                                                    onClick={e => deleteComment(comment.id)}
                                                                    to={`/questions/${post.id}`}
                                                                >
                                                                    delete
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className='add-comment'>
                                            <form className='comment-form' onSubmit={e => onSubmit(e)}>
                                                <div>
                                                    <input
                                                        className='title-input s-input'
                                                        type='text'
                                                        name='body'
                                                        value={body}
                                                        onChange={e => onChange(e)}
                                                        id='title'
                                                        placeholder='add comment'
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='answer'>
                                <div className='answer-header'>
                                    <div className='answer-sub-header'>
                                        <div className='answer-headline'>
                                            <h2>Answers</h2>
                                        </div>
                                        {/* <div className='answer-tabs'>
                                            <div className='tabs'>
                                                <Link to='/' className='answer-tab-links active' style={{borderBottomLeftRadius: '3px',borderTopLeftRadius: '3px'}}>
                                                    Active
                                                </Link>
                                                <Link to='/' className='answer-tab-links'>
                                                    Oldest
                                                </Link>
                                                <Link to='/' className='answer-tab-links' style={{borderBottomRightRadius: '3px',borderTopRightRadius: '3px'}}>
                                                    Votes
                                                </Link>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                {answers.map(answer => (
                                    <div key={answer.id} className='answers'>
                                        <div className='answer-layout'>
                                            <div className='vote-cell'>
                                                <div className='vote-container'>
                                                    <button
                                                        className='vote-up'
                                                        title='This answer is useful (click again to undo)'
                                                    >
                                                        <UpVote className='icon'/>
                                                    </button>
                                                    <div className='vote-count'>0</div>
                                                    <button
                                                        className='vote-down'
                                                        title='This answer is not useful (click again to undo)'
                                                    >
                                                        <DownVote className='icon'/>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='answer-item'>
                                                <div className='answer-content'>
                                                    <p>
                                                        {answer.text}
                                                    </p>
                                                </div>
                                                <div className='answer-actions'>
                                                    <div className='action-btns'>
                                                        <div className='answer-menu'>
                                                            {!auth.loading && auth.isAuthenticated && parseInt(answer.user_id) === auth.user.id && (
                                                                <Link
                                                                    className='answer-links'
                                                                    title='Delete the answer'
                                                                    onClick={e => deleteAnswer(answer.id)}
                                                                    to={`/questions/${post.id}`}
                                                                >
                                                                    delete
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className='answer-owner'>
                                                        <div className='answer-user'>
                                                            <div className='answer-user-time'>
                                                                answered&nbsp;
                                                                <span>{timeAgo(answer.created_at)}</span>
                                                            </div>
                                                            <div className='answer-logo'>
                                                                <Link className='answer-user-link' to={`/users/${answer.user_id}`}>
                                                                    <div className='answer-logo-wrapper'>
                                                                        <img alt='user_logo' src={userLogo} />
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                            <div className='answer-details'>
                                                                <Link className='answer-user-profile-link' to={`/users/${answer.user_id}`}>{answer.username}</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className='add-answer'>
                                    <form
                                        className='answer-form'
                                        onSubmit={e => onSubmitAnswer(e)}
                                    >
                                        <div className='answer-grid'>
                                            <label>Your Answer</label>
                                            <textarea
                                                className='text-input'
                                                name='text'
                                                cols='30'
                                                rows='12'
                                                value={text}
                                                onChange={e => onChangeAnswer(e)}
                                                placeholder='Enter body with minimum 30 characters'
                                                id='text'
                                            >
                                            </textarea>
                                            <button className='btn btn-primary btn-bg'>Post your answer</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RightSideBar/>
        </div>
    </Fragment>
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addAnswer: PropTypes.func.isRequired,
    deleteAnswer: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    getAnswers: PropTypes.func.isRequired,
    answer: PropTypes.object.isRequired,
    getComments: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth,
    answer: state.answer,
    comment: state.comment
});

export default connect(mapStateToProps, { getPost, deletePost, deleteAnswer, deleteComment, getAnswers,addAnswer, getComments, addComment })(Post);