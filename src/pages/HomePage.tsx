import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRouterLink,
  IonList,
  IonItem
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import {firestore} from "../firebase";

const HomePage: React.FC = () => {

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const entriesRef = firestore.collection('entries');
    entriesRef.get().then((snapshot) => 
      {
        const entries = snapshot.docs.map((doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          })
        );
        setEntries(entries);
      }
    );
    
  })
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My HomePage</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {entries.map((entry) => 
            <IonItem button key={entry.id} routerLink={`/my/home/${entry.id}`}>
              {entry.title}
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
