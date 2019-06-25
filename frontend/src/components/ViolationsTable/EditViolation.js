import React, { Component } from 'react';
import axios from 'axios';

export default class EditViolation extends Component {

  constructor(props) {
    super(props);

    // this.onChangeName = this.onChangeName.bind(this);
    // this.onChangeCountry = this.onChangeCountry.bind(this);
    // this.onChangeRegistrationNumber = this.onChangeRegistrationNumber.bind(this);
    // this.onChangeCategory = this.onChangeCategory.bind(this);
    // this.onChangeViolationOwner = this.onChangeViolationOwner.bind(this);
    // this.onChangeViolationNumber = this.onChangeViolationNumber.bind(this);
    // this.onChangeTypeOfDocument = this.onChangeTypeOfDocument.bind(this);
    // this.onChangeStatus = this.onChangeStatus.bind(this);
    // this.onChangeIssuedBy = this.onChangeIssuedBy.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        violation: [],
        name: "",
        country: "",
        registrationNumber: "",
        category: "",
        violationOwner: "",
        typeOfDocument: "",
        status: "",
        issuedBy: "",
    }
  }

  componentDidMount() {
    axios.get('/api/users/violation/edit/'+this.props.match.params.id)
      .then(response => {
            this.setState({ 
                name: response.data.name, 
                country: response.data.country,
                registrationNumber: response.data.registrationNumber,
                category: response.data.category,
                violationOwner: response.data.violationOwner,
                typeOfDocument: response.data.typeOfDocument,
                status: response.data.status,
                issuedBy: response.data.issuedBy,
            });
      })
      .catch(function (error) {
          console.log(error);
      })
  }

//   onChangeName(e) {
//     this.setState({
//       name: e.target.value
//     });
//   }
//   onChangeCountry(e) {
//     this.setState({
//       country: e.target.value
//     });
//   }

//   onChangeRegistrationNumber(e) {
//     this.setState({
//       registrationNumber: e.target.value
//     });
//   }

//   onChangeCategory(e){
//       this.setState({category: e.target.value})
//   }

  onChangeName = (e) => this.setState({name: e.target.value})
  onChangeCountry = (e) => this.setState({country: e.target.value})
  onChangeRegistrationNumber = (e) => this.setState({registrationNumber: e.target.value})
  onChangeCategory = (e) => this.setState({category:e.target.value})
  onChangeViolationOwner = (e) => this.setState({violationOwner: e.target.value})
  onChangeTypeOfDocument = (e) => this.setState({typeOfDocument: e.target.value})
  onChangeStatus = (e) => this.setState({status: e.target.value})
  onChangeIssuedBy = (e) => this.setState({issuedBy: e.target.value})


  onSubmit(e) {
    e.preventDefault();
    this.updateViolationAPI();
  }


  updateViolationAPI = async () => {
    // Grab all the fields and store into an object which I can pass to axios POST request
    const violationData = {
      name: this.state.name, 
      country: this.state.country,
      registrationNumber: this.state.registrationNumber,
      category: this.state.category,
      violationOwner: this.state.violationOwner,
      typeOfDocument: this.state.typeOfDocument,
      status: this.state.status,
      issuedBy: this.state.issuedBy,
    };

    let res = await axios.post('/api/users/violation/update/'+this.props.match.params.id, violationData);
    let response = await res.data;
    this.setState({ violation: response });

    // Have I updated the violation successfully?
    console.log("The corresponding violation has been updated! ==> " + response);

    // Redirect upon update..
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
                            <label>Име: </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.name}
                            onChange={this.onChangeName}
                            />
                        </div>
                        
                        
                        <div className="form-group">
                            <label>Държава: </label>
                            <input type="text" 
                            className="form-control"
                            value={this.state.country}
                            onChange={this.onChangeCountry}
                            />
                        </div>

                        <div className="form-group">
                            <label>Регистрационен номер: </label>
                            <input type="text" 
                            className="form-control"
                            value={this.state.registrationNumber}
                            onChange={this.onChangeRegistrationNumber}
                            />
                        </div>

                        <div className="form-group">
                            <label>Категория: </label>
                            <input type="text" 
                            className="form-control"
                            value={this.state.category}
                            onChange={this.onChangeCategory}
                            />
                        </div>

                        <div className="form-group">
                            <label>Собственик: </label>
                            <input type="text" 
                            className="form-control"
                            value={this.state.violationOwner}
                            onChange={this.onChangeViolationOwner}
                            />
                        </div>

                        <div className="form-group">
                            <label>ТИП ДОКУМЕНТ: </label>
                            <input type="text" 
                            className="form-control"
                            value={this.state.typeOfDocument}
                            onChange={this.onChangeTypeOfDocument}
                            />
                        </div>

                        <div className="form-group">
                            <label>СТАТУС: </label>
                            <input type="text" 
                            className="form-control"
                            value={this.state.status}
                            onChange={this.onChangeStatus}
                            />
                        </div>

                        <div className="form-group">
                            <label>СЪСТАВИТЕЛ: </label>
                            <input type="text" 
                            className="form-control"
                            value={this.state.issuedBy}
                            onChange={this.onChangeIssuedBy}
                            />
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