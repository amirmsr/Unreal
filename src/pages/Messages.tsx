import { IonBackButton, IonButton, IonButtons, IonCard, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getAllMessagesBetweenUsers, getUserById, listenToNewMessagesBetweenUsers, sendMessage } from '../userService';
import { useAuth } from '../AuthContext';
import { storage } from '../firebase-config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


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
    const[content, setContent] = useState('')
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUserById(id);
            setUser(userData);
        };
        fetchUser();
    }, [id]);


    const fetchMessages = async () => {
      if (userExt && user) {
        try {
          // Charger tous les messages existants
          const initialMessages = await getAllMessagesBetweenUsers(user.uid, userExt.id);
          initialMessages.sort((a, b) => a.date.seconds - b.date.seconds);
          setMessages(initialMessages);
          console.log(initialMessages)
          
    
          // Écouter les nouveaux messages en temps réel
          const unsubscribe = listenToNewMessagesBetweenUsers(user.uid, userExt.id, (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          });
    
          // Nettoyer l'écouteur lorsque le composant est démonté
          return () => unsubscribe();
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };
    
    useEffect(() => {
      fetchMessages();
    }, [user, userExt]);
      


    const trySend = async (content: string, senderId: string, receiverIds: string[], imagesUrl? : string[]) => {
      try {
        await sendMessage(content, senderId, receiverIds, imagesUrl);
        console.log("Message sent successfully!");
        fetchMessages()
      } catch (error) {
        console.error("Error sending message:", error);
      }
    };

    const handleSendMessage =  async (content: string, senderId: string, receiverIds: string[])  => {
      if (file) {
        const storageRef = ref(storage, `uploads/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
              console.log('Upload is ' + progress + '% done');
            },
            (error) => {
              console.error('Upload failed', error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                trySend(content, senderId, receiverIds, [downloadURL]);
    
              });
            }
        );
      }
      else{
        trySend(content, senderId, receiverIds);
      }
    };
    const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0] || null;
      setFile(selectedFile);
      console.log(selectedFile)
    };



    return (
      <IonPage>
        <IonHeader>
            <IonToolbar color="primary">
                <IonButtons slot='start'>
                    <IonBackButton defaultHref='/userslist' />
                </IonButtons>
                <IonTitle>Message with {userExt?.username}</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        <IonLabel>
            {messages.length > 0 ? (
              <ul className="message-list" style={{ listStyleType: 'none', padding: 0 }}>
                {messages.map((message) => (
                  <li
                    key={message.id}
                    className={`message-item ${message.senderId === user?.uid ? 'sent' : 'received'}`}
                    style={{
                      marginBottom: '10px',
                      display: 'flex',
                      flexDirection: message.senderId === user?.uid ? 'row-reverse' : 'row',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      className="message-content"
                      style={{
                        maxWidth: '70%',
                        padding: '10px',
                        borderRadius: '10px',
                        backgroundColor: message.senderId === user?.uid ? '#dcf8c6' : '#fff',
                        border: message.senderId === user?.uid ? '1px solid #dcf8c6' : '1px solid #ccc',
                        color: message.senderId === user?.uid ? '#000' : '#333',
                        textAlign: message.senderId === user?.uid ? 'right' : 'left',
                      }}
                    >
                      {message.content}
                    </div>
                    {message.images && (
                      <IonImg
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: '10px',
                          marginLeft: message.senderId === user?.uid ? '10px' : '0',
                          marginRight: message.senderId === user?.uid ? '0' : '10px',
                        }}
                        src={message.images}
                      />
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No messages found.</p>
            )}
        </IonLabel>


            <IonInput placeholder='Your message'  onIonChange={(e:any)=> setContent(e.target.value)} onIonBlur={(e: any) => setContent(e.target.value)} ></IonInput>
            <IonCard>
              <IonItem>
                <input
                  type="file"
                  onChange={handleImage}
                />
                <IonInput
                  placeholder="File title"
                />
              </IonItem>
          </IonCard>
            <IonButton onClick={()=> handleSendMessage(content, user!.uid, [userExt!.id])} expand="block">
                            Send Message
            </IonButton>
        </IonContent>
      </IonPage>
    );
};


export default Messages;