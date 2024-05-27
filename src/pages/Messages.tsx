import { IonBackButton, IonButton, IonButtons, IonCard, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getAllMessagesBetweenUsers, getUserById, getUserByMessage, listenToNewMessagesBetweenUsers, sendMessage } from '../userService';
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
          setMessages(initialMessages);
    
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
      

 /*    const handleSendMessage = async (content: string, senderId: string, receiverIds: string[]) => {
      try {
          await sendMessage(content, senderId, receiverIds);
          alert('Message sent');
          // Mettre à jour les messages après l'envoi du message
          fetchMessages()
      } catch (error) {
          alert('Error sending message');
          console.error("Error sending message:", error);
      }
    };
     */


    //send image

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
                    <ul className="message-list">
                        {messages.map((message) => (
                            <li key={message.id} >
                                {message.content} {message.senderId === user?.uid && 'by you'}
                                <IonImg style={{width: 100}} src={message.images}> </IonImg>
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