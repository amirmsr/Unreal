import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonCheckbox, IonInput, IonText, IonCard, IonMenuButton, IonButtons } from '@ionic/react';
import { deleteUser, getAllMessagesBetweenUsers, getUsers, sendMessage } from '../userService';
import { useAuth } from '../AuthContext';
import { chatbubbles, mailOutline, notifications, trash } from 'ionicons/icons';
import { useHistory } from 'react-router';

interface User {
  id: string;
  email?: string;
  username?: string;
  age?: number;
  role?: boolean;
}

const UsersList: React.FC = () => {
  const { userData } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const[content, setContent] = useState('')
  const [receiverIds, setReceiverIds] = useState<string[]>([]);
  const history = useHistory();
  const [messageNotif, setMessageNotif] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = await getUsers();
      setUsers(usersList);
      setLoading(false);
    };

    fetchUsers();
  }, []);



  
  const handleDelete = async (userId: string) => {
    if (userData?.role) { 
      try {
        await deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    } else {
      console.error("User does not have permission to delete users.");
    }
  };

  const handleSendMessage = async (content: string, senderId: string, receiverIds: string[]) => {
    try {
      await sendMessage(content, senderId, receiverIds);
      alert('message sended')
    } catch (error) {
      alert('Error')
      console.error("Error sending message:", error);
    }
  };



  const handleCheckboxChange = (userId: string, checked: boolean) => {
    setReceiverIds(prevReceiverIds => {
      const updatedReceiverIds = checked
        ? [...prevReceiverIds, userId]
        : prevReceiverIds.filter(id => id !== userId);
      console.log(updatedReceiverIds); 
      return updatedReceiverIds;
    });
  };

  const handleUserMessage = (userId: string) => {
    history.push(`/messages/${userId}`);
  };


  
  



  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot='start'>
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle>Users</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonList>
        {users.map(user => (
          <IonItem key={user.id} lines="full">
            <IonLabel onClick={() => handleUserMessage(user.id)} className="user-info">
              <h2>{user.username}</h2>
              <p>Email: {user.email}</p>
              {user.age && <p>Age: {user.age}</p>}
              <p>Role: {user.role ? 'Admin' : 'User'}</p>
            </IonLabel>
            <IonIcon
              slot="end"
              icon={chatbubbles} 
              onClick={() => handleUserMessage(user.id)}
              className="icon-button"
            />
            <IonCheckbox
              slot="end"
              onIonChange={(e) => handleCheckboxChange(user.id, e.detail.checked)}
              className="checkbox"
            />
            {userData?.role && (
              <IonButton slot="end" color="danger" onClick={() => handleDelete(user.id)} className="delete-button">
                <IonIcon icon={trash} />
              </IonButton>
            )}
          </IonItem>
        ))}
      </IonList>
      {receiverIds.length > 0 && (
        <IonLabel className="message-input">
          <IonInput placeholder='Your message' onIonChange={(e: any) => setContent(e.target.value)} onIonBlur={(e: any) => setContent(e.target.value)}></IonInput>
          <IonButton onClick={() => handleSendMessage(content, userData.uid, receiverIds)} expand="block">
            Send Message
          </IonButton>
        </IonLabel>
      )}
    </IonContent>
  </IonPage>
  
  
  );
};

export default UsersList;
