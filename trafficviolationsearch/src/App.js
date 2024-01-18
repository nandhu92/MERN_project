import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

import searchResults from "./components/searchResults.component";
import addComment from "./components/add-comment.component";
import navBar from "./components/navBar.component";
import geoSearch from "./components/search-component2";
import searchPage from "./components/searchPage.component";

function App() {
  return (
    <Router>
      <Route path="/" exact component={navBar}></Route>
      <Route path="/search" component={searchResults}></Route>
      <Route path="/add" component={addComment}></Route>
      <Route path="/geoSearch" component={geoSearch}></Route>
      <Route path="/searchPage" component={searchPage}></Route>
    </Router>
  );
}

export default App;
