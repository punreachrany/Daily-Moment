import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRouterLink,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import React from 'react';
import { Link } from 'react-router-dom';
import {useParams} from 'react-router';
import {entries} from '../data'

const EntryPage: React.FC = () => {
  const { id } : any= useParams();
  const entry = entries.find((entry)=> entry.id === id)
  if(!entry){
    throw new Error(`No such entry: ${id}`)
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{entry.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      {entry.description}
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
