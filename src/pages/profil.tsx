import React from 'react';

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import { useAuth } from '../AuthContext';
import { logoutUser } from '../firebase-config';
import { useHistory } from 'react-router-dom';


const Profile: React.FC = () => {
  const { user, userData } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    await logoutUser();
    history.push('/login');
  };
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {user && userData ? (
          <div>
            <h2>Profile Information</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>username:</strong> {userData?.username}</p>
            <IonButton expand="block" onClick={handleLogout}>Logout</IonButton>
          </div>
        ) : (
          <p>No user information available.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Profile;
