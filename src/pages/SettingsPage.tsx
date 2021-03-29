import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRouterLink
} from '@ionic/react';
import React from 'react';
import { Link } from 'react-router-dom';

const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My SettingPage</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      This is the settings page
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
