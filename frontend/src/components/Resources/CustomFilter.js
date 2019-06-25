import React, { Component } from 'react'

class Poets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      violationFilter: ""
    }
  }
  
  handleChange = (e) => {
    this.setState({
      violationFilter: e.target.value
    })
    this.props.onChange(e.target.value)
    console.log("Custom filter handler triggered....");
  }
  
  render() {
    return (
      <div>
        <label htmlFor="filter">Filter by Poet: </label>
        <br/>
        <input type="text" id="filter" 
          value={this.state.violationFilter} 
          onChange={this.handleChange}/>
      </div>
      )
  }
}

export default Poets