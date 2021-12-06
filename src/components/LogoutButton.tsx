import { useAuth0 } from "@auth0/auth0-react";
import { Browser } from "@capacitor/browser";
import { isPlatform } from "@ionic/react";
import { IonButton } from "@ionic/react";
import { callbackUri } from "../auth.config";
import { useIonRouter } from "@ionic/react";

const LogoutButton: React.FC = () => {
  const { buildLogoutUrl, logout } = useAuth0();
  const router = useIonRouter();

  const doLogout = async () => {
    if (isPlatform('ios')) {
      await Browser.open({
        url: buildLogoutUrl({ returnTo: callbackUri }),
        windowName: "_self",
      });

      router.push("/tab3", "forward", "push");
      logout({ localOnly: true });
      
    }
    else {
      alert(1);
      logout({returnTo: window.location.origin});
    }
  };

  return <IonButton onClick={doLogout}>Log out</IonButton>;
};

export default LogoutButton;
