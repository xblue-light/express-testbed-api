import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {

  constructor(props) {
      super(props);
      this.deleteListRow = this.deleteListRow.bind(this);
  }

  deleteListRow() {
    axios.delete('/api/users/list/delete/'+this.props.obj._id)
         .then(response => console.log(response))
         .catch(err => console.log(err))
         window.location.reload();
  }

  render() {
    return (
        <tr>
            <td> 
                {this.props.obj.name}
            </td>
            <td> 
                {this.props.obj.address}
            </td>
            <td> 
                {this.props.obj.country}
            </td>
            <td> 
                {this.props.obj.city}
            </td>
            <td> 
                {this.props.obj.state}
            </td>
            <td> 
                {this.props.obj.phone}
            </td>
            <td> 
                {this.props.obj.description}
            </td>
            <td>
                <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
            </td>
            <td>
                <button onClick={this.deleteListRow} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    );
  }
}

export default TableRow;