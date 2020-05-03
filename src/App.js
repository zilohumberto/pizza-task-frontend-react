import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { NotFound } from './pages/NotFound';
import Home from './pages/Home';
import Orders from './pages/Orders/Order';
import Header from './components/header/header';
import { Layout } from './components/layout/layout';
import { setToken, deleteToken, validateToke, getToken } from './helper/auth-helper'

class App extends Component {

  constructor() {
    super();

    this.state = { user: null }
  }

  componentDidMount() {
    const cookies = getToken();
    if(cookies != null) {
      this.CheckLogin(cookies.token);
    }
  }  

  CheckLogin = (token) => {
    validateToke(token)
        .then(user => {
          this.setState({ user });
          setToken(token, user);
        })
        .catch(err => console.log('There was an error:' + err))    
  }

  logout = () => {
    this.setState({ user:null });
    deleteToken();
  }

  render(){
    const { user } = this.state ;

    return (
      <React.Fragment>
        <Header user={user} log_in={this.CheckLogin} log_out={this.logout} />
        <Layout>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/orders" component={ Orders } />
            <Route component={ NotFound } />
          </Switch>
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
