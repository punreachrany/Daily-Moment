import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRouterLink,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useHistory, useParams} from 'react-router';
import {firestore} from '../firebase';
import {Entry, toEntry} from '../models';
import { useAuth } from '../auth';
import {trash as trashIcon} from 'ionicons/icons'
import {formatDate} from '../date';

const EntryPage: React.FC = () => {
  const {userId} = useAuth();
  const { id } : any= useParams();
  const [entry, setEntry] = useState<Entry>();
  const history = useHistory();

  useEffect(()=>{
    const entryRef = firestore.collection('users').doc(userId).collection("entries").doc(id);
    entryRef.get().then((doc)=>{
      setEntry(toEntry(doc));
    })
  }, [userId, id]);

  console.log('[EntryPage] rendered')


  const handleDelete = async () => {
    const entryRef = firestore.collection('users').doc(userId).collection("entries").doc(id);
    await entryRef.delete();
    history.goBack();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{formatDate(entry?.date)}</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={handleDelete}>
              <IonIcon icon={trashIcon} slot="icon-only"/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <h2>{entry?.title}</h2>
      <p>{entry?.description}</p>
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
