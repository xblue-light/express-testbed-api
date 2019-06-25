import React, { Component } from 'react';
import axios from 'axios';

export default class EditList extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
       name: "",
       address: "",
       country: "",
       city: "",
       state: "",
       phone: "",
       description: ""
    }
  }

  componentDidMount() {
    axios.get('/api/users/list/edit/'+this.props.match.params.id)
      .then(response => {
            this.setState({ 
                name: response.data.name, 
                address: response.data.address,
                country: response.data.country,
                city: response.data.city,
                state: response.data.state,
                phone: response.data.phone,
                description: response.data.description
            });
      })
      .catch(function (error) {
          console.log(error);
      })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  onChangeCountry(e) {
    this.setState({
      country: e.target.value
    });
  }

  onChangeCity(e) {
    this.setState({
      city: e.target.value
    });
  }

  onChangeState(e) {
    this.setState({
      state: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }
  
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.updateListAPI();
  }

  updateListAPI = async () => {
    const list_data = {
      name: this.state.name,
      address: this.state.address,
      country: this.state.country,
      city: this.state.city,
      state: this.state.state,
      phone: this.state.phone,
      description: this.state.description
    };
    let res = await axios.post('/api/users/list/update/'+this.props.match.params.id, list_data);
    let response = await res.data;
    this.setState({ list: response });
    console.log(response);
    this.props.history.push('/index');
  };
 
  render() {
    return (
        <div className="container" style={{ marginTop: 10 }}>
            <div className="row">
                <div className="col-12">
                    <h3 align="center">Update Business</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Name: </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.name}
                            onChange={this.onChangeName}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address: </label>
                            <input type="text" 
                            className="form-control"
                            value={this.state.address}
                            onChange={this.onChangeAddress}
                            />
                        </div>
                        <div className="form-group">
                            <label>Country: </label>
                            <input type="text" 
                            className="form-control"
                            value={this.state.country}
                            onChange={this.onChangeCountry}
                            />
                        </div>
                        <div className="form-group">
                            <label>City: </label>
                            <input type="text" 
                            className="form-control"
                            value={this.state.city}
                            onChange={this.onChangeCity}
                            />
                        </div>
                        <div className="form-group">
                            <label>State: </label>
                            <input type="text" 
                            className="form-control"
                            value={this.state.state}
                            onChange={this.onChangeState}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone: </label>
                            <input type="text" 
                            className="form-control"
                            value={this.state.phone}
                            onChange={this.onChangePhone}
                            />
                        </div>
                        <div className="form-group">
                            <label>Notes: </label>
                            <textarea className="form-control" 
                                    value={this.state.description} 
                                    onChange={this.onChangeDescription}>
                            </textarea>
                        </div>
                        <div className="form-group">
                            <input type="submit" 
                            value="Update Contact" 
                            className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
  }
}