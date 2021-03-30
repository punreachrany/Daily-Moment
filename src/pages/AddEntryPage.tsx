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
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../auth';
import {firestore, storage} from '../firebase';


async function savePicture(blobUrl, userId) {
  const pictureRef = storage.ref(`/users/${userId}/pictures/${Date.now()}`);
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const snapshot = await pictureRef.put(blob)
  const url = snapshot.ref.getDownloadURL();
  return url;
}

const AddEntryPage: React.FC = () => {
  const {userId} = useAuth();
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('')
  const [pictureUrl, setPictureUrl] = useState("/assets/placeholder.png")
  const fileInputRef = useRef<HTMLInputElement>();

  useEffect(()=> () => {
    if(pictureUrl.startsWith('blob:')){
      URL.revokeObjectURL(pictureUrl);
    }

  }, [pictureUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const pictureUrl = URL.createObjectURL(file);
      setPictureUrl(pictureUrl);
    }
  }

  const handleSave = async () => {
    const entriesRef = firestore.collection('users').doc(userId).collection('entries');
    const entryData = {date, title, pictureUrl, description}
    if(pictureUrl.startsWith('blob:')){
      entryData.pictureUrl = await savePicture(pictureUrl, userId);
    }
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
          <br />
          <IonItem>
            <IonLabel position="stacked">Label</IonLabel>
            <br />
            <input type='file' accept="image/*" ref={fileInputRef} onChange={handleFileChange} hidden/>
            <img src = {pictureUrl} alt="" onClick={()=>fileInputRef.current.click()} style={{cursor: 'pointer'}}/>
            
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
