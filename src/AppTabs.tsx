import {
  IonApp,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon
} from '@ionic/react';
import React from 'react';
import { Route, Redirect, useParams} from 'react-router-dom';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';

import EntryPage from './pages/EntryPage';

import {home as homeIcon, settings as settingsIcon} from 'ionicons/icons'

import {useAuth} from './auth'

const AppTabs: React.FC = () => {
  const {loggedIn} = useAuth()
  if(!loggedIn){
    return <Redirect to="/login" />
  }
  
  return (

  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/my/home">
        <HomePage/>
      </Route>
      <Route exact path="/my/home/:id">
        <EntryPage/>
      </Route>
      <Route exact path="/my/settings">
        <SettingsPage/>
      </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/my/home">
          <IonIcon icon={homeIcon}/>
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/my/settings">
        <IonIcon icon={settingsIcon}/>
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
        
      </IonTabBar>
    </IonTabs>
    
);
};

export default AppTabs;
