import { IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { registerUser } from '../firebase-config';

const Register: React.FC = () => {
    const [mail, setUserMail] = useState('')
    const[password, setPassword] = useState('')
    const[username, setUserName] = useState('')
    const[age, setUserAge] = useState(0)
    const [busy, setBusy] = useState<Boolean>(false)
    
    async function register(){
        setBusy(true)
        const res = await registerUser( mail, password, username, age)
        console.log(res)
        setBusy(false);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            {busy && <IonLoading message='please wait' duration={0} isOpen={true}/>}
            <IonContent className="ion-padding" >
                <IonInput placeholder='Mail' onIonChange={(e:any)=> setUserMail(e.target.value)} onIonBlur={(e: any) => setUserMail(e.target.value)} ></IonInput>
                <IonInput placeholder='Username' onIonChange={(e:any)=> setUserName(e.target.value)} onIonBlur={(e: any) => setUserName(e.target.value)} ></IonInput>
                <IonInput placeholder='Age' onIonChange={(e:any)=> setUserAge(e.target.value)} onIonBlur={(e: any) => setUserAge(e.target.value)} ></IonInput>
                <IonInput placeholder='Password' type='password' onIonChange={(e:any)=> setPassword(e.target.value)} onIonBlur={(e: any) => setPassword(e.target.value)}></IonInput>
                <IonButton onClick={register}>Register</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Register;