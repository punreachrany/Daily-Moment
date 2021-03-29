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
import {Redirect} from 'react-router';
import {useAuth} from '../auth';

interface Props {

  onLogin: () => void;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const {loggedIn} = useAuth();
  if(loggedIn) {
    return <Redirect to="/my/home" />
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Login Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={onLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
