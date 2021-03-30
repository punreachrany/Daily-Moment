import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRouterLink,
  IonList,
  IonItem,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';
import {firestore} from "../firebase";
import {Entry, toEntry} from '../models';
import {add as addIcon} from 'ionicons/icons';
import {formatDate} from '../date';

// function formatDate(isoString) {
//   return new Date(isoString).toLocaleDateString('en-KR',{
//     day:'numeric', month:'short', year:'numeric'
//   })
// }

const HomePage: React.FC = () => {

  const {userId} = useAuth();

  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const entriesRef = firestore.collection('users').doc(userId).collection("entries");
    return entriesRef.orderBy('date').limit(10).onSnapshot((snapshot)=>setEntries(snapshot.docs.map(toEntry)));
    
  },[userId]);

  console.log('[Homepage] render entries:', entries)
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
            <IonItem button key={entry.id} routerLink={`/my/home/view/${entry.id}`}>
              <IonLabel>
                <h2>{formatDate(entry.date)}</h2>
                <h3>{entry.title}</h3>
              </IonLabel>

            </IonItem>
          )}
        </IonList>
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/my/home/add">
            <IonIcon icon={addIcon} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
