import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

  constructor(props) {
        super(props);
        this.state = { 
          list: [] 
        };
    }

    componentDidMount() {
      this.getListFromAPI();
      
    }

    getListFromAPI = async () => {
      let res = await axios.get('/api/users/list');
      let response = await res.data;
      this.setState({ list: response });
      console.log(this.state)
    };

    render() {
      return (
        <div>
          <table className="table table-striped table-dark" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Country</th>
                <th>City</th>
                <th>State</th>
                <th>Phone</th>
                <th>Description</th>
                <th colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
              { 
                this.state.list.length === 0 ? ( <tr><td colSpan="8">Loading...</td></tr> ) : 
                ( this.state.list.map((object, i) => { 
                    return <TableRow obj={object} key={i} /> 
                  }))
              }
            </tbody>
          </table>
        </div>
      );
    }
  }