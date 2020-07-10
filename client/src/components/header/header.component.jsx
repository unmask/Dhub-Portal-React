import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/auth/auth.actions'

// import divumlogo from '../../assets/dlogo.png';

import './header.styles.scss';

const Header = ({ auth: { isAuthenticated, loading }, logout }) => {

    const authLinks = (
        <div className='btns'>
            <Link onClick={ logout } to='/login'>
                <button type='button' className='btn btn-outline-primary btn-outbg btn-sm'>Log out</button>
            </Link>
        </div>
    );

    const authTabs = (
        <div>
        </div>
    );

    const guestTabs = (
        <div>
        </div>
    );

    const guestLinks = (
        <div className='btns'>
            <Link to='/login'>
                <button type='button' className='btn btn-outline-primary btn-outbg btn-sm'>Log in</button>
            </Link>
            <Link to='/register'>
                <button type='button' className='btn btn-primary btn-bg btn-sm'>Sign up</button>
            </Link>
        </div>

    );

    return(
        <nav className='navbar fixed-top navbar-expand-lg navbar-dark bg-dark'>
            <a className='navbar-brand' href='/'>
                <span className="header-font">DIVUM HUB</span>
            </a>
            {!loading && (
                <Fragment>{isAuthenticated ? authTabs : guestTabs}</Fragment>
            )}
            {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}

        </nav>
    )
};

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,{ logout } )(Header);