import React, { Component } from 'react';
//import axios from 'axios';

export default class Index extends Component {

  constructor(props) {
        super(props);
        this.state = { 
          emptyList: [] 
        };
    }

    // componentDidMount() {
    //   this.getListFromAPI();
      
    // }

    // getListFromAPI = async () => {
    //   let res = await axios.get('/api/users/list');
    //   let response = await res.data;
    //   this.setState({ list: response });
    //   console.log(this.state)
    // };

    render() {
      return (
        <div>
          <h3>Hello welcome user (index page)</h3>
        </div>
      );
    }
  }