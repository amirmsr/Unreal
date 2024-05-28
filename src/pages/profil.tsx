import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonMenuButton } from '@ionic/react';
import { useAuth } from '../AuthContext';
import { logoutUser } from '../firebase-config';
import { useHistory } from 'react-router-dom';

const Profil: React.FC = () => { 
  const { user, userData: { username } } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    await logoutUser();
    history.push('/login');
  };

  const email = user?.email;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot='start'>
            <IonMenuButton />
          </IonButton>
          <IonTitle>Profil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {email && username ? (
          <div>
            <h2>Profile Information</h2>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>username:</strong> {username}</p>
            <IonButton expand="block" onClick={handleLogout}>Logout</IonButton>
          </div>
        ) : (
          <p>No user information available.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Profil;