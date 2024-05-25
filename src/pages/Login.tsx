import { IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { loginUser } from '../firebase-config';
import ToastComponent from '../toast';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
    const[mail, setMail] = useState('')
    const[password, setPassword] = useState('')
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [busy, setBusy] = useState<Boolean>(false)
    const history = useHistory();

    async function login() {
        setBusy(true)
        const res = await loginUser(mail, password);
        if (res !== false) {
          setToastMessage('Login successful');
          history.push('/profil');
        } else {
          setToastMessage('Login failed');
        }
        setShowToast(true);
        setBusy(false);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            {busy && <IonLoading message='please wait' duration={0} isOpen={true}/>}
            <IonContent className="ion-padding" >
                <IonInput placeholder='Mail' onIonChange={(e:any)=> setMail(e.target.value)} onIonBlur={(e: any) => setMail(e.target.value)}></IonInput>
                <IonInput placeholder='Password' type='password' onIonChange={(e:any)=> setPassword(e.target.value)} onIonBlur={(e: any) => setPassword(e.target.value)} ></IonInput>
                <IonButton onClick={login}>Login</IonButton>
                <ToastComponent
                    isOpen={showToast}
                    message={toastMessage}
                    onClose={() => setShowToast(false)}
                />
            </IonContent>
        </IonPage>
    );
};

export default Login;