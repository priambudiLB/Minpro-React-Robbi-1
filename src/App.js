//------------------------------------------------------------------------------------------------------

import React, { Component } from 'react'

//------------------------------------------------------------------------------------------------------

import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

//------------------------------------------------------------------------------------------------------

import { NavbarComponent } from './components';

//------------------------------------------------------------------------------------------------------

import { Home, Sukses, Login, Akun } from './pages';

//------------------------------------------------------------------------------------------------------

export default class App extends Component {
  render() {
    
    return (

      <BrowserRouter>

        <NavbarComponent />

        <main className="App">

          <Switch>

            <Route path="/" component={ Home } exact/>
            <Route path="/sukses" component={ Sukses } />
            <Route path="/login" component={ Login } />
            <Route path="/akun" component={ Akun } />

          </Switch>

        </main>

      </BrowserRouter>
    )
  }
}
