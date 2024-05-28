import { IonContent, IonHeader, IonIcon, IonItem, IonMenu, IonMenuToggle, IonTitle, IonToolbar } from '@ionic/react';
import { camera, home, person, earth } from 'ionicons/icons';

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