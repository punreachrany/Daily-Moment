import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonLoading
} from '@ionic/react';
import React, { useState } from 'react';
import {Redirect} from 'react-router';
import {useAuth} from '../auth';
import { auth } from '../firebase';

interface Props {

  onLogin: () => void;
}

const RegisterPage: React.FC = () => {
  const {loggedIn} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({loading: false, error: false});


  const handleSignUp = async () => {
    // const credential = await auth.signInWithEmailAndPassword('test1@example.org', '123456');
    // console.log('credential', credential);

    try {
      
      console.log('should SignUp with ', {email, password});
      const credential = await auth.createUserWithEmailAndPassword(email, password);
      console.log('credential', credential);
      
      
    } catch (error) {
      setStatus({loading:false, error:true})
      console.log(error)
    }
    
  }

  if(loggedIn) {
    return <Redirect to="/my/home" />
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Register Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput type="email" value={email} 
              onIonChange={(event)=>setEmail(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput type="password" 
               onIonChange={(event)=>setPassword(event.detail.value)}
            />
          </IonItem>
        </IonList>
        {status.error && <IonText color="danger">Invalid Registration</IonText>}
        <IonButton expand="block" onClick={handleSignUp}>Create Account</IonButton>
        <IonButton expand="block" fill="clear" routerLink="/login">Already have an account</IonButton>
        <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
