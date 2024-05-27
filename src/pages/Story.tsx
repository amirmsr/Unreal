import React from 'react';

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





const Story: React.FC = () => {
    const { user, userData } = useAuth();
    const history = useHistory();
    const { photos, takePhoto } = usePhotoGallery();

    const handleLogout = async () => {
        await logoutUser();
        history.push('/login');
    };



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
                    <IonFabButton onClick={() => takePhoto(user!.uid)}>
                        <IonIcon icon={camera}></IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonContent>
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
