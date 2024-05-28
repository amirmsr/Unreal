import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonPage, IonButtons, IonMenuButton, IonSplitPane, IonRouterOutlet, IonMenuToggle } from '@ionic/react';
import { home, person, mail, personOutline, cameraOutline, camera, earth } from 'ionicons/icons'; // Importez les icônes pour les éléments de menu
import { Redirect, Route } from 'react-router';
import UsersList from './pages/UsersList';
import Profile from './pages/profil';
import Profil from './pages/profil';

const Menu: React.FC = () => {
    const path = [
        { name: 'My profil', url: '/profil',  icon: home },
        { name: 'Discover stories', url: '/storydiscovery',  icon: earth },
        { name: 'Users', url: '/usersList', icon: person },
        { name: 'Add story', url: '/story', icon: camera }
    ];

    return (
        <IonMenu contentId="main">
            <IonHeader>
                <IonToolbar>
                <IonTitle>Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {path.map((item, index) => (
                <IonMenuToggle key={index}>
                    <IonItem routerLink={item.url} routerDirection="none">
                        <IonIcon slot="start" icon={item.icon} /> 
                        {item.name}
                    </IonItem>
                </IonMenuToggle>
                ))}
            </IonContent>
        </IonMenu>
    );
};

export default Menu;