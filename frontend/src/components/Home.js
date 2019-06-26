import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import axios from 'axios';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            users: {}
        };
    }

    // getUserObjectAPI = async () => {
    //     let res = await axios.get('/api/users/me');
    //     let response = await res.data;
    //     this.setState({ users: response });
    //     console.log(response);
    // };

    // componentDidMount(){
    //     this.getUserObjectAPI();
    // }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const userIsAuthenticated = (
            <div className="col-12 offset-md-4 col-md-4">
                <br/>
                <br/>
                <br/>
                <div className="card">
                    <img src={user.avatar} alt={user.name} title={user.name} />
                    <div className="card-body">
                        <h5 className="card-title">Welcome, <b>{user.name}</b></h5>
                        <p className="card-text">ID: {user.id}</p>
                        <a href="/index" className="btn btn-primary btn-md">Contacts</a>
                        <a href="/create" className="btn btn-secondary btn-md">Add Contact</a>
                    </div>
                </div>
            </div>
        )
        const userIsNotAuthenticated = (
            <div>
                <br/>
                <br/>
                <br/>
                <div className="alert alert-warning">
                    <b>Greetings, guest! You are not logged in! To continue <a href="/login">login</a> here</b>
                </div>
            </div>
        )
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                        { isAuthenticated ? userIsAuthenticated : userIsNotAuthenticated }
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user
})

export default connect(mapStateToProps)(withRouter(Home));