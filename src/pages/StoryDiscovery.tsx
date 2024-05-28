import { IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getStories, getUserById } from '../userService';

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

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>All Stories</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    {stories.map(story => (
                        <IonLabel key={story.id}>
                            <IonList>
                                <IonTitle>Posted by {story.ownerUsername}</IonTitle>
                                <IonImg src={story.image}></IonImg>
                            </IonList>
                        </IonLabel>
                    ))}
                </IonList>
               
            </IonContent>
        </IonPage>
    );
};




export default StoryDiscovery;