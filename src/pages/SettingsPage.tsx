import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRouterLink,
  IonButton
} from '@ionic/react';
import React from 'react';
import { Link } from 'react-router-dom';
import {auth} from '../firebase'

const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My SettingPage</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" color="medium" onClick={()=>auth.signOut()}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
