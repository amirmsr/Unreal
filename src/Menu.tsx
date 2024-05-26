import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonPage, IonButtons, IonMenuButton, IonSplitPane, IonRouterOutlet, IonMenuToggle } from '@ionic/react';
import { home, person, mail, homeOutline } from 'ionicons/icons'; // Importez les icônes pour les éléments de menu
import { Redirect, Route } from 'react-router';
import UsersList from './pages/UsersList';
import Profile from './pages/profil';
import Profil from './pages/profil';

const Menu: React.FC = () => {
    
    const path =[
        {name:'usersList', url:'/usersList', icon:homeOutline},
        {name:'login', url:'/login', icon:homeOutline}
    ]


    return (
        <IonPage>
            <IonSplitPane contentId='main'>
                <IonMenu contentId='main'><IonHeader>
                    <IonToolbar>
                        <IonTitle>Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {path.map((item,index)=>(
                        <IonMenuToggle key={index}>
                            <IonItem routerLink={item.url} routerDirection='forward'>
                                {item.name}
                            </IonItem>
                        </IonMenuToggle>
                    ))}
                </IonContent>
                </IonMenu>
                <IonRouterOutlet id='main'>
                    <Route exact path="app/usersList" component={UsersList}></Route>
                    <Route exact path="app/profil" component={Profil}></Route>
                    <Route exact path="/app">
                        <Redirect to="/app/profil"></Redirect>
                    </Route>
                </IonRouterOutlet>
            </IonSplitPane>
        </IonPage>
        
    );
};

export default Menu;
