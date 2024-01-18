import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ReactiveButton from 'reactive-button';

import geoSearchPage from './geoSearchPage.component'

const Document = props => {
  return (
  <li>
    <a>{props.document.description}</a>
    <Link to="/" component={geoSearchPage} data={props.document}>Click Here</Link>
  </li>
  )
}

export default class searchList extends Component {
  constructor(props) {
    super(props);

    this.onChangeList = this.onChangeList.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      documents: [],
      geoCoordinates: []
    }
  }

onChangeList(e) {
  if(e.target.value == 'florida'){
    this.setState({
      geoCoordinates: [-77.0633916666667, 39.15305]
    })
  }
  else if(e.target.value == 'westvirginia'){
    this.setState({
      geoCoordinates: [-76.9841983333333, 39.0293466666667]
    })
  }
  else if(e.target.value == 'virginia'){
    this.setState({
      geoCoordinates: [-77.14941, 39.067535]
    })
  }
  else if(e.target.value == 'maryland'){
    this.setState({
      geoCoordinates: [-77.09310515, 38.9835782]
    })
  }
}

onSubmit(e) {
  e.preventDefault();

  const user = {
    geoCoordinates: this.state.geoCoordinates
  }

  console.log(user);

  axios.get('http://localhost:5000/functions/geoSearch/' + this.state.geoCoordinates[0] + '/'+this.state.geoCoordinates[1])
  .then(response => {
     this.setState({
      geoCoordinates: response.data.geoCoordinates
     })
     console.log(response.data);
     this.setState({ documents: response.data });
   })
   .catch(function (error) {
     console.log(error);
   })


  this.setState({
    geoCoordinates:[]
  })
}

documentList() {
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
                                <Link to="/search" className="nav-link">Search by word</Link>
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
                <h3>Violations Search by Geolocation:</h3>
                </div>
         <form onSubmit={this.onSubmit} className="form-group">
           <h3>Select State</h3>
            <div className="choice" onChange={this.onChangeList}>
             <input type="radio" value="florida" name="city"/>Florida
             <input type="radio" value="westvirginia" name="city"/>West Virginia
             <input type="radio" value="virginia" name="city"/>Virginia
             <input type="radio" value="maryland" name="city"/>Maryland
           </div>
           <div className="form-group">
             <ReactiveButton rounded type="submit" idleText="Submit" value="submit" className="btn btn-primary" color="primary" width="250px" height= "60px" animation="yes">
              View More
        </ReactiveButton>
           </div>
         </form>
         <ul>
            { this.documentList()}
         </ul>
       </div>
    )
  }
}