import React, { useState } from "react";
import {
  BrowserRouter as Router, Route
} from "react-router-dom";
// import homepage from './Home/Index';
import { AzureAD, LoginType, AuthenticationState } from 'react-aad-msal';
import { basicReduxStore } from './reduxStore';
import { removeUserSession } from './sessionStorage/userStore';
import { authProvider } from './authProvider';
import Login from './Login/Index';
import NofaCreation from './Nofa/nofa-creation';
import View from './Nofa/nofa';
import Sales from './Nofa/sales-repo';
import Home from './Nofa/home';



class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountInfo: null,
      sampleType: null,
      logInAuth: null,
      loader: false

    };
    // Change the login type to execute in a Popup
    const options = authProvider.getProviderOptions();
    options.loginType = LoginType.Popup;
    authProvider.setProviderOptions(options);
  }
  render() {
    return (
      <Router basename="/admin">
        <div className="navcss">
          <div className="container-fluid">
            <div className="App1">
              <AzureAD provider={authProvider} reduxStore={basicReduxStore}>
                {({ accountInfo, login, logout, authenticationState }) => {
                  const isInProgress = authenticationState === AuthenticationState.InProgress;
                  const isAuthenticated = authenticationState === AuthenticationState.Authenticated;
                  const isUnauthenticated = authenticationState === AuthenticationState.Unauthenticated;
                  {/* <Route path="/" exact component={homepage} /> */ }
                  if (isAuthenticated) {
                    return (
                      <div>
                       
                        <Route path="/view/:id" exact component={View} />
                        <Route path="/region" exact component={NofaCreation} />
                        <Route path="/admin" exact component={Home} />
                        <Route path="/" exact component={Home} />
                        <Route path="/sales" exact component={Sales} />
                       
                        

                      </div>
                    )
                  } else if (isUnauthenticated || isInProgress) {
                    removeUserSession();
                    return (
                    <>
                      <Route path="/admin/" exact component={Login} />
                      <Route path="/" exact component={Login} />
                    </>
                    )
                  }  else {
                    removeUserSession();
                    return (
                    <>
                      <Route path="/admin/" exact component={Login} />
                      <Route path="/" exact component={Login} />
                    </>
                    )
                  }

                }}
              </AzureAD>
            </div>
          </div>
        </div>
      </Router>

    );
  }
}



export default Navigation;