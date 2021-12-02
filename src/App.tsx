import { Redirect, Route } from "react-router-dom";
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs,} from '@ionic/react';
import { searchOutline, personOutline} from 'ionicons/icons';
import { IonReactRouter } from "@ionic/react-router";
import { App as CapApp } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import { useAuth0 } from "@auth0/auth0-react";
import { callbackUri } from "./auth.config";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import PrivateRoute from './components/PrivateRoute.js';
import FoodList from './components/food-list.component.js';
import CreateFood from './components/create-food.component.js';
import LoginPage from './components/loginPage.component.js';
import CreateUser from './components/createUser.component.js';
import EditFood from './components/edit-food.component.js';

import Tab3 from './pages/Tab3.js';
import Cat from './pages/Cat.js';
import Profile from './pages/Profile.js';
import Review from './pages/ReviewPage.js';
import { EditProfilePage } from './pages/EditProfile.js';

/* Theme variables */
import "./theme/variables.css";
import { useEffect } from "react";
import './App.css';


const App: React.FC = () => {
  const { handleRedirectCallback } = useAuth0();

  useEffect(() => {
    CapApp.addListener("appUrlOpen", async ({ url }) => {
      if (url.startsWith(callbackUri)) {
        if (
          url.includes("state") &&
          (url.includes("code") || url.includes("error"))
        ) {
          await handleRedirectCallback(url);
        }

        await Browser.close();
      }
    });
  }, [handleRedirectCallback]);

  return (
    <IonApp>
      <IonReactRouter>
          <IonTabs>

            <IonRouterOutlet>
              <Route exact path="/tab3">
                <Tab3 />
              </Route>

              <Route exact path="/home">
                <Home />
              </Route>

              <Route exact path="/cat">
                <Cat />
              </Route>


              <Route exact path="/foodList">
                <FoodList/>
              </Route>

              <Route exact path="/create">
                <CreateFood/>
              </Route>

              <Route exact path="/newUser">
                <CreateUser/>
              </Route>

              <PrivateRoute exact path="/review" component = {Review}/>

              <Route exact path="/login">
                <LoginPage/>
              </Route>

              <Route path ="/edit/:id">
                <EditFood/>
              </Route>

              <PrivateRoute path ="/editProfile" component = { EditProfilePage }/>

              <PrivateRoute exact path = "/profile" component = { Profile } />

              <Route exact path="/">
                <Redirect to="/tab3" />
              </Route>
              
              

            </IonRouterOutlet>


            <IonTabBar slot="bottom">
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon icon={searchOutline} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>

              <IonTabButton tab="profile" href="/profile">
                <IonIcon icon={personOutline} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>

              {/* <IonTabButton tab="profile" href="/profile">
                <IonIcon icon={createOutline} />
                <IonLabel>Create</IonLabel>
              </IonTabButton> */}

            </IonTabBar>

          </IonTabs>
        </IonReactRouter>
    </IonApp>
  );
};

export default App;
