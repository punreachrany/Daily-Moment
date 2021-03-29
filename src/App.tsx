import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/react';
import React, { useState } from 'react';
import {Route, Redirect, useParams, Switch} from 'react-router-dom';

import {AuthContext} from './auth';

import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

import {IonReactRouter} from '@ionic/react-router';

import AppTabs from './AppTabs';

const App: React.FC = () => {

  const [loggedIn, setLoggedIn] =  useState(false);
  console.log(`rendering App wth loggedIn=${loggedIn}`)
  
  return (
    <IonApp>
      <AuthContext.Provider value={{loggedIn}}>
          <IonReactRouter>
          
          <Switch>
            <Route exact path="/login">
              <LoginPage onLogin={()=>setLoggedIn(true)}/>
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
