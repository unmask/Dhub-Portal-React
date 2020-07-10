import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/auth/auth.actions';
import PropTypes from 'prop-types';

import divumlogo from '../../assets/dlogo.png';


const Login = ({ login, isAuthenticated }) => {
    const [ formData, setFormData ] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login({ username, password });
    };

    if (isAuthenticated) {
        return <Redirect to='/' />;
    }

    return(
        <div className='page'>
            <div className='register-content'>
                <div className='register-grid'>
                    <div>
                        <div className='form-container'>
                            <div className='icon-holder'>
                                <img className='icon' src={divumlogo} alt=''/>
                            </div>
                            <form className='login-form' onSubmit={e => onSubmit(e)}>
                                <div className='grid'>
                                    <label className='form-label s-label'>Username</label>
                                    <input
                                        className='form-input s-input'
                                        type='text'
                                        name='username'
                                        value={username}
                                        onChange={e => onChange(e)}
                                        id='username'

                                    />
                                </div>
                                <div className='grid '>
                                    <label className='form-label s-label'>Password</label>
                                    <input
                                        className='form-input s-input'
                                        type='password'
                                        name='password'
                                        value={password}
                                        onChange={e => onChange(e)}
                                        id='password'

                                    />
                                </div>
                                <div className='grid gs4 gsy fd-column js-auth-item '>
                                    <button className='btn btn-primary btn-bg' id='submit-button' name='submit-button'>Log in</button>
                                </div>
                            </form>
                        </div>
                        <div className='redirects'>
                            Don't have an account? <Link to='/register' name='login' style={{color: '#ee770e'}}>Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);