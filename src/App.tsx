import { IonApp, IonLoading, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, RouteProps } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import { AuthProvider, useAuth } from './AuthContext';
import Menu from './Menu';
import Login from './pages/Login';
import Messages from './pages/Messages';
import Register from './pages/Register';
import Story from "./pages/Story";
import StoryDiscovery from './pages/StoryDiscovery';
import UsersList from './pages/UsersList';
import Profil from './pages/profil';
import './theme/variables.css';





interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { user, loading } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        loading ? (
          <IonLoading isOpen={loading} message={"Loading..."} />
        ) : user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};




setupIonicReact();

const App: React.FC = () => (
  <IonApp>
  <AuthProvider>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/usersList" component={UsersList}></Route>
          <Route exact path="/Story" component={Story}></Route>
          <Route exact path="/storydiscovery" component={StoryDiscovery}></Route>
          <Route exact path="/messages/:id" component={Messages}></Route>
          <PrivateRoute exact path="/profil" component={Profil}></PrivateRoute>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </AuthProvider>
</IonApp>
);

export default App;