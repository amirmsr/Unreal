import { firestore } from './firebase-config';
import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';

export async function getUsers() {
    const usersCollection = collection(firestore, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return usersList;
}

export async function getUserById(userId: string) {
    try {
        const userDocRef = doc(firestore, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            return { id: userDoc.id, ...userDoc.data() };
        } else {
            throw new Error('No such user!');
        }
    } catch (error) {
        console.error('Error getting user by ID:', error);
        throw error;
    }
}

export async function deleteUser(userId: string) {
    try {
        const userDoc = doc(firestore, 'users', userId);
        await deleteDoc(userDoc);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}


export async function sendMessage(content: string, senderId: string, receiverIds: string[], imagesUrl?: string[]) {
    const messagesCollection = collection(firestore, 'messages');

    try {
        if(imagesUrl){
            await addDoc(messagesCollection, {
                content: content,
                senderId: senderId,
                receiverIds: receiverIds,
                images : imagesUrl,
                date: Timestamp.now(),
            });
        }
        else {
            await addDoc(messagesCollection, {
                content: content,
                senderId: senderId,
                receiverIds: receiverIds,
                date: Timestamp.now(),
            });

        }
        console.log("Message sent successfully!");
    } catch (error) {
        console.error("Error sending message:", error);
    }
}




interface Message {
<<<<<<< HEAD
  id: string;
  content: string;
  date: Timestamp;
  senderId: string;
  receiverIds: string[];
}

export async function getAllMessagesBetweenUsers(userId1: string, userId2: string): Promise<Message[]>  {
  const messagesCollection = collection(firestore, 'messages');
  
  const messagesQuery = query(
    messagesCollection,
    where('senderId', '==', userId1),
    where('receiverIds', 'array-contains', userId2),
    
  );
  
  const messagesSnapshot = await getDocs(messagesQuery);
  const messagesList = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
  console.log(messagesList)
  return messagesList;
=======
    id: string;
    content: string;
    date: Timestamp;
    senderId: string;
    receiverIds: string[];
}

export async function getAllMessagesBetweenUsers(userId1: string, userId2: string): Promise<Message[]>  {
    const messagesCollection = collection(firestore, 'messages');

    const messagesQuery = query(
        messagesCollection,
        where('senderId', '==', userId1),
        where('receiverIds', 'array-contains', userId2),

    );

    const messagesSnapshot = await getDocs(messagesQuery);
    const messagesList = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
    console.log(messagesList)
    return messagesList;
>>>>>>> 7b80fe719775c96508aaaa8391d907cef6e6874b
}

// Fonction pour écouter les nouveaux messages entre deux utilisateurs
export function listenToNewMessagesBetweenUsers(userId1: string, userId2: string, callback: (message: Message) => void) {
<<<<<<< HEAD
  const messagesCollection = collection(firestore, 'messages');
  
  const messagesQuery = query(
    messagesCollection,
    where('senderId', '==', userId2),
    where('receiverIds', 'array-contains', userId1)

  );
  
  return onSnapshot(messagesQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const newMessage = { id: change.doc.id, ...change.doc.data() } as Message;
        callback(newMessage);
      }
=======
    const messagesCollection = collection(firestore, 'messages');

    const messagesQuery = query(
        messagesCollection,
        where('senderId', '==', userId2),
        where('receiverIds', 'array-contains', userId1)

    );

    return onSnapshot(messagesQuery, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
                const newMessage = { id: change.doc.id, ...change.doc.data() } as Message;
                callback(newMessage);
            }
        });
>>>>>>> 7b80fe719775c96508aaaa8391d907cef6e6874b
    });
}


