import { IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getMessagesBetweenUsers, getUserById } from '../userService';
import { useAuth } from '../AuthContext';


interface User {
    id: string;
    email?: string;
    username?: string;
    age?: number;
    role?: boolean;
  }


const Messages : React.FC = () => {
    const { user } = useAuth();
    const { id } = useParams<{ id: string }>(); 
    const [messages, setMessages] = useState<any[]>([]);
    const [userExt, setUser] = useState<User | null>(null); 

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUserById(id);
            setUser(userData);
        };
        fetchUser();
    }, [id]);

    useEffect(() => {
        const fetchMessages = async () => {
          if (userExt && user) {
            try {
              console.log('hr')  
              console.log(user?.uid, userExt?.id )
              const messagesList = await getMessagesBetweenUsers(user?.uid, userExt.id);
              setMessages(messagesList);
            } catch (error) {
              console.error('Error fetching messages:', error);
            }
          }
        };
        fetchMessages();

    }, [user, userExt]);


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Message with {userExt?.username}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
            <IonLabel>
            {messages.length > 0 ? (
                <ul>
                {messages.map((message) => (
                    <li key={message.id}>{message.content}</li>
                ))}
                </ul>
            ) : (
                <p>No messages found.</p>
            )}
            </IonLabel>
        </IonContent>
        </IonPage>
    );
};

export default Messages ;