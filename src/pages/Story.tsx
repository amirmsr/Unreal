import React, {useEffect, useState} from 'react';

import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonFab,
    IonFabButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonActionSheet, IonMenuButton, IonButton,
} from '@ionic/react';
import {camera, images, square, triangle} from 'ionicons/icons';
import { useAuth } from '../AuthContext';
import { usePhotoGallery } from '../usePhoto';
import { logoutUser } from '../firebase-config';
import { useHistory } from 'react-router-dom';
import { Geolocation } from '@capacitor/geolocation';





const Story: React.FC = () => {
    const { user, userData } = useAuth();
    const history = useHistory();
    const { photos, takePhoto } = usePhotoGallery();
    const [location, setLocation] = useState<{ lat: number, lon: number } | null>(null);
    const getCurrentPosition = async () => {
        const coordinates = await Geolocation.getCurrentPosition();
        setLocation({
            lat: coordinates.coords.latitude,
            lon: coordinates.coords.longitude,
        });
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location?.lat}&lon=${location?.lon}&zoom=10&addressdetails=1`);
        const data = await response.json();
        if (data && data.address) {
            console.log("vous êtes à ", data.address.city )
            return data.address.city || data.address.town || data.address.village || null;
        } else {
            throw new Error('No results found or Geocoding API error');
        }
        console.log("aaaaaaaaaaa",response)
    };

    useEffect(() => {
        getCurrentPosition();
    }, []);


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButton slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButton>
                    <IonTitle>Story</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonFab vertical="bottom" horizontal="center" slot="fixed">
                    <IonFabButton onClick={() => takePhoto(user!.uid, userData!.username)}>
                        <IonIcon icon={camera}></IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonContent>
            <IonContent><IonButton expand="block" onClick={getCurrentPosition}>Get location</IonButton></IonContent>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        {photos.map((photo, index) => (
                            <IonCol size="6" key={photo.filepath}>
                                <IonImg src={photo.webviewPath} />
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            </IonContent>

        </IonPage>
    );
};

export default Story;
 