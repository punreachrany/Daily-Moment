import {
  IonApp,
  IonLoading,
  IonRouterOutlet,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';

import {AuthContext, useAuthInit} from './auth';

import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

import {IonReactRouter} from '@ionic/react-router';


import AppTabs from './AppTabs';
import RegisterPage from './pages/RegisterPage';


const App: React.FC = () => {

  const {loading, auth} =  useAuthInit();

  

  if(loading){
    return <IonLoading isOpen />
  }
  console.log(`rendering App wth authState=${auth}`)
  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
          <IonReactRouter>
          
          <Switch>
            <Route exact path="/login">
              <LoginPage/>
            </Route>
            <Route exact path="/register">
              <RegisterPage/>
            </Route>

            <Route path="/my">
              <AppTabs/>
            </Route>
            
            <Redirect exact path="/" to="/my/home" />
            <Route>
              <NotFoundPage />
            </Route>
            </Switch>       
        </IonReactRouter>   
      </AuthContext.Provider>
      
    </IonApp>
  );
};

export default App;
