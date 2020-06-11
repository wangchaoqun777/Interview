import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Index from "../view/index/index";
import About from "../view/about/index";
import Book from "../view/book/index";
import Details from "../view/details/index";
import User from "../view/user/index";
import Dater from "../view/dater/index";
export default class RouterIndex extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/index/all" />} />
        <Route path="/index/:id" exact component={Index} />
        <Route path="/about" exact component={About} />
        <Route path="/book" component={Book} />
        <Route path="/details" component={Details} />
        <Route path="/user" component={User} />
        <Route path="/date" component={Dater} />
      </Switch>
    );
  }
}
