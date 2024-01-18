import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactiveButton from 'reactive-button';
import searchResults from './searchResults.component';


const Document = props => (
  <tr>
    <td>{props.document.subAgency}</td>
    <td>{props.document.description}</td>
    <td>{props.document.location}</td>
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

 export default class searchList extends Component {

  constructor(props) {
    super(props);

    this.onChangeList = this.onChangeList.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleAddSecondInput = this.handleAddSecondInput.bind(this);
    this.handleSecondClick = this.handleSecondClick.bind(this);
    this.state = {
      description: '',
      document:'',
      clickInput: false,
      commentText:'',
      comments: []
    }
    this.state = {documents: []};

  }

  onChangeList(e) {
    //console.log(this.state.commentText)
    //console.log(this.state.comments)
    this.setState({
      commentText: e.target.value
    })
   }

handleAddSecondInput () {
    this.setState({
        clickInput:true
    })
}

handleSecondClick () {
  this.setState({
    clickInput:false
  })
}

onSubmit(e) {
  e.preventDefault();

  const commentData = {
    commentText: this.state.commentText,
  }

   axios.put('http://localhost:5000/functions/addComments/' +this.props.data.id+"/"+ this.state.commentText)
   .then(response => {
     console.log(this.state.comments)
    console.log(response.data)
  })
  .catch((error) => {
    console.log(error);
  })


    //  axios.post('http://localhost:5000/users/addComments', user)
    //  .then(response => {
    //     this.setState({
    //       description: response.data.description
    //     })
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })


  this.setState({
    username: ''
  })
}

documentList() {
        return <Document document={this.props.data}/>;
    }

  render() {
    return (
      <div>
          {
              this.state.clickInput?
              <div>
                <h3>Violation Details:</h3>
                <div className="details-lists">
                  <h3>Description</h3>
                  <a>{this.props.data.description}</a>
                  <ul>
                    <li>
                      <a>date of stop: {this.props.data.dateOfStop}</a>
                    </li>
                    <li>
                      <a>accident: {this.props.data.accident}</a>
                    </li>
                    <li>
                      <a>fatal: {this.props.data.fatal}</a>
                    </li>
                    <li>
                      <a>belts: {this.props.data.belts}</a>
                    </li>
                    <li>
                      <a>alcohol: {this.props.data.alcohol}</a>
                    </li>
                  </ul>
                  <h3>Incident Details</h3>
                  <ul>
                    <li>
                      <a>Location: {this.props.data.location}</a>
                    </li>
                    <li>
                      <a>Violation Type: {this.props.data.violationType}</a>
                    </li>
                    <li>
                      <a>Charge: {this.props.data.charge}</a>
                    </li>
                    <li>
                      <a>Arrest Type: {this.props.data.arrestType}</a>
                    </li>
                  </ul>
                </div>
                <h3> Add comments:</h3>
                <form onSubmit={this.onSubmit}>
                  <div>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeList}
                        />
                        <ReactiveButton rounded value="submit" className="btn btn-primary" idleText="Add" color="primary" width="30px" height= "5px" animation="yes"
                        >
                        </ReactiveButton>
                  </div>
                </form>
                <ReactiveButton rounded value="submit" className="btn btn-primary" idleText="Close" color="primary" width="30px" height= "20px" animation="yes"
              type="button"
              className="make-button-link"
              onClick={this.handleSecondClick}
                >
                </ReactiveButton>
            </div>
              :
              <div>
                        <ReactiveButton rounded value="submit" className="btn btn-primary" idleText="View" color="primary" width="30px" height= "30px" animation="yes"
              type="button"
              className="make-button-link"
              onClick={this.handleAddSecondInput}
              >
              </ReactiveButton>
              </div>
            }

        
       </div>
    )
  }
 }