import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Document = props => (
  <tr>
    <td>{props.document.subAgency}</td>
    <td>{props.document.description}</td>
    <td>{props.document.location}</td>
    <td>{props.document.latitude}</td>
    <td>{props.document.longitude}</td>
    <td>{props.document.accident}</td>
    <td>{props.document.belts}</td>
    <td>{props.document.fatal}</td>
    <td>{props.document.alcohol}</td>
    <td>{props.document.state}</td>
    <td>{props.document.vehicleType}</td>
    <td>{props.document.make}</td>
    <td>{props.document.charge}</td>
  </tr>
)



export default class ExercisesList extends Component {
  constructor(props) {
  super(props);
//  debugger;
this.onChangeList = this.onChangeList.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
//
  this.state = {
    username: '',
    documents: [],
    comments: []
  };
}
componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ documents: response.data })
      //  debugger;
       console.log(response.data);
       //return(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }
  documentList() {
   return this.state.documents.map(details => {
     return <Document document={details}  key={details._id}/>;
   })
 }

 // onChangeUsername(e) {
 //   this.setState({
 //     username: e.target.value
 //   })
 // }

 onChangeList(e) {
 this.setState({
   username: e.target.value
 })
}


 onSubmit(e) {
   e.preventDefault();

   const user = {
     username: this.state.username
   }

  // console.log(user);


    axios.post('http://localhost:5000/users/addComments/'+this.props.match.params.id, user)
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.commets),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })


   axios.post('http://localhost:5000/users/addComments', user)
   .then(response => {
      this.setState({
        description: response.data.description

      })
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })


   this.setState({
     username: ''
   })
 }



  render() {
    return (
      <div>
      <h3>Traffic Violation Search</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>SubAgency</th>
              <th>Description</th>
              <th>Location</th>
              <th>latitude</th>
              <th>longitude</th>
              <th>Accident</th>
              <th>Belts</th>
              <th>Fatal</th>
              <th>Alcohol</th>
              <th>State</th>
              <th>VehicleType</th>
              <th>Make</th>
              <th>Charge</th>

            </tr>
          </thead>
          <tbody>
            { this.documentList()}
          </tbody>
        </table>
// add comment
        <h3> Add comments:</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">

            <input  type="text"
                required
                className="form-control"
                 value={this.state.username}
                onChange={this.onChangeList}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="submit" className="btn btn-primary" />
          </div>
        </form>

//add comment

      </div>
    )
  }
}


