import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { NotFound } from './pages/NotFound';
import Home from './pages/Home';
import Orders from './pages/Orders/Order';
import User  from './pages/Users/user';
import { Header } from './components/header/header';
import { Layout } from './components/layout/layout';
import User from './pages/Users/user'


class App extends Component {

  render(){
    return (
      <React.Fragment>
          <Header />
          <Layout>
            <Switch>
              <Route exact path="/" component={ Home } />
              <Route exact path="/orders" component={ Orders } />
              <Route exact path="/user" component={ User } />
              <Route component={ NotFound } />
            </Switch>
          </Layout>
        </React.Fragment>
    );
  }
}

export default App;
