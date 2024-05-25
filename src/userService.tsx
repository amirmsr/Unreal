import { firestore } from './firebase-config';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';

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



export async function sendMessage(content: string, senderId: string, receiverIds: string[]) {
    const messagesCollection = collection(firestore, 'messages');

    try {
        await addDoc(messagesCollection, {
        content: content,
        senderId: senderId,
        receiverIds: receiverIds 
        });
        console.log("Message sent successfully!");
    } catch (error) {
        console.error("Error sending message:", error);
    }
}


export async function getAllMessagesBetweenUsers(userId1: string, userId2: string) {
  const messagesCollection = collection(firestore, 'messages');
  
  const messagesQuery = query(
    messagesCollection,
    where('senderId', '==', userId1),
    where('receiverIds', 'array-contains', userId2)


  );
  
  const messagesSnapshot = await getDocs(messagesQuery);
  const messagesList = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log(messagesList)
  return messagesList;
}

// Fonction pour écouter les nouveaux messages entre deux utilisateurs
export function listenToNewMessagesBetweenUsers(userId1: string, userId2: string, callback: (message: any) => void) {
  const messagesCollection = collection(firestore, 'messages');
  
  const messagesQuery = query(
    messagesCollection,
    where('senderId', '==', userId2),
    where('receiverIds', 'array-contains', userId1)

  );
  
  return onSnapshot(messagesQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const newMessage = { id: change.doc.id, ...change.doc.data() };
        callback(newMessage);
      }
    });
  });
}


