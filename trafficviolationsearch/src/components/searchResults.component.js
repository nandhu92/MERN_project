import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import searchPage from './searchPage.component';
import ReactiveButton from 'reactive-button';

const Document = props => {
  return (
  <li>
    <a>{props.document.description}</a>
    <Link to="/" component={searchPage} data={props.document}>Click Here</Link>
  </li>
  )
}

export default class searchList extends Component {
  constructor(props) {
    super(props);

    this.onChangeList = this.onChangeList.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      description: ''
    }
    this.state = {documents: []};
  }

  onChangeList(e) {
  this.setState({
    description: e.target.value
  })
}

onSubmit(e) {
  e.preventDefault();

  const user = {
    description: this.state.description
  }

  console.log(user);

  axios.get('http://localhost:5000/functions/search/'+this.state.description)
  .then(response => {
     this.setState({
      description: response.data.description
     })
     console.log(response.data);
     this.setState({ documents: response.data });
   })
   .catch(function (error) {
     console.log(error);
   })


  this.setState({
    description: ''
  })
}

documentList() {
      return this.state.documents.map(details => {
        return <Document document={details}/>;
      })
    }

    singleDocList() {
      return this.state.documents.map(details => {
        return <Document document={details}/>;
      })
    }

  render() {
    return (
      <div>
        <nav className="navbar-logo">
                <div className="navBar-list">
                <a>
                    <Link to="/" className="navBar-brand">Traffic Violation Data</Link>
                </a>
                    <ul className="navBar-items">
                        <li className="navBar-item">
                            <a>
                                <Link to="/" className="nav-link">Home</Link>
                            </a>
                        </li>
                        <li className="navBar-item">
                            <a>
                                <Link to="/search" className="nav-link">Search by Description</Link>
                            </a>
                        </li>
                        <li className="navBar-item">
                            <a>
                                <Link to="/geoSearch" className="nav-link">Search by Geolocation</Link>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        <div>
         <h3>Violations Search by Description:</h3>
         </div>
         <form onSubmit={this.onSubmit}>
           <div className="form-group1">

             <input  type="text"
                 required
                 className="form-control"
                  value={this.state.description}
                 onChange={this.onChangeList}
                 />
           </div>
           <div className="form-group">
            <ReactiveButton rounded type="submit" idleText="Submit" value="submit" className="btn btn-primary" color="primary" width="250px" height= "60px" animation="yes">
            </ReactiveButton>  <span>  </span>
           </div>
         </form>
          <div className="list">
        <ul>
           <span>{ this.documentList()}</span>
         </ul>
         </div>
       </div>
    )
  }
}