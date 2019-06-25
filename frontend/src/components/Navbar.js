import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/"><i className="fa fa-home"></i></Link>
                </li>
                {/* <li className="nav-item">
                    <Link className="nav-link" to="/index">Contacts</Link>
                </li> */}
                <li className="nav-item">
                    <Link className="nav-link" to="/violations">Нарушения</Link>
                </li>
                <button className="nav-link logout-btn" onClick={this.onLogout.bind(this)}>
                    <img src={user.avatar} alt={user.name} title={user.name}
                         className="rounded-circle"
                         style={{ width: '25px', marginRight: '5px'}} />
                         Админ
                </button>
            </ul>
        )


        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Нова Регистрация</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Вход</Link>
                </li>
            </ul>
        )


        return (
            <nav className="navbar navbar-expand-lg">
                <Link className="navbar-brand" to="/">Redux Node Auth</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));