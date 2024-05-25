import { firestore } from './firebase-config';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

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

export async function getMessagesBetweenUsers(senderId: string, receiverId: string) {
  try {
    const messagesCollection = collection(firestore, 'messages');
    
    // Query to get messages where the senderId matches and receiverIds contains the receiverId
    const messagesQuery = query(
      messagesCollection,
      where('senderId', '==', senderId),
      where('receiverIds', 'array-contains', receiverId)
    );
    
    const messagesSnapshot = await getDocs(messagesQuery);
    const messagesList = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(messagesSnapshot)
    console.log(messagesList)
    console.log(senderId,receiverId)

    
    return messagesList;
  } catch (error) {
    console.error('Error getting messages between users:', error);
    throw error;
  }
}


