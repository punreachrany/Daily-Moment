import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRouterLink,
  IonButtons,
  IonBackButton,
  IonList,
  IonLabel,
  IonInput,
  IonButton,
  IonItem,
  IonDatetime
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../auth';
import {firestore} from '../firebase';


const AddEntryPage: React.FC = () => {
  const {userId} = useAuth();
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('')

  const handleSave = async () => {
    const entriesRef = firestore.collection('users').doc(userId).collection('entries');
    const entryData = {date, title, description}
    const entryRef =  await entriesRef.add(entryData)
    console.log('saved: ', entryRef.id)
    history.goBack();
  }
  
  console.log('[AddEntryPage] rendered')
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>

          <IonItem>
            <IonLabel position="stacked">Date</IonLabel>
            <IonDatetime value={date} onIonChange={(event) => setDate(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput value={title} onIonChange={(event) => setTitle(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonInput value={description} onIonChange={(event) => setDescription(event.detail.value)}
            />
          </IonItem>
          
            <IonButton expand="block" onClick={handleSave}>Save</IonButton>


        </IonList>
        
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
