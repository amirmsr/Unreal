import { IonButtons, IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { getStories, getUserById } from '../userService';
import { heartOutline, refreshOutline } from 'ionicons/icons';

interface Story {
    id: string;
    date: string;
    image: string;
    owner: string;
    ownerUsername:string

}


const StoryDiscovery: React.FC = () => {
    const [stories, setStories] = useState<Story[]>([])
    useEffect(() => {
        const fetchStories = async () => {
          const storiesList = await getStories();
          setStories(storiesList);
        };
    
        fetchStories();
      }, []);
      const refresherRef = useRef<HTMLIonRefresherElement>(null);
      const doRefresh = async (event: CustomEvent) => {
       
        console.log('Refresh clicked');
        setTimeout(() => {
         
          event.detail.complete();
        }, 2000);
      };

    return (
        <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
        <IonButtons slot='start'>
          <IonMenuButton></IonMenuButton>
        </IonButtons>
          <IonTitle>All Stories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" ref={refresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent
            pullingIcon={refreshOutline} 
            refreshingSpinner="circles">
          </IonRefresherContent>
        </IonRefresher>
        <IonList>
          {stories.map(story => (
            <IonCard key={story.id}>
              <IonCardHeader>
                <IonCardTitle>Posted by {story.ownerUsername}</IonCardTitle>
              </IonCardHeader>
              <IonImg src={story.image} />
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
    );
};




export default StoryDiscovery;