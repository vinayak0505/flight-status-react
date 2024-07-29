import { getToken, onMessage } from "firebase/messaging";
import { firebaseMessaging } from "./firebase";
import onNotification from "./on_notification";
import { AppDispatch } from "../redux/store";
import { updateFlightStatus } from "../redux/reducer/flight.reducer";

var firebaseToken:string;
const firebaseMessagingInit = async (dispatch: AppDispatch) => {
    const messaging = await firebaseMessaging();
    // there are browsers that does not support firebase messageing
    if(messaging === false) return;
    firebaseToken = await getToken(messaging, {
        vapidKey:
            "BGn7hL6A9GNrpQsGANGy28UCJ0vlZogLytvTENLlwxBKGe1_R6kUa6fZZCtGJtFd8a8GpMZOGV1bvOvZcTxuMFM"
    });
    
    onMessage(messaging, (payload) => {
        console.log("Foreground Message received. ", payload);
        
        if(payload?.data?.type === "SFLIGHT" || payload?.data?.type === "SGATE") {
            onNotification(payload?.notification?.title, payload?.notification?.body, payload?.data?.['google.c.a.c_l'])
            return;
        }
        if(payload?.data?.flightId != null && payload?.data?.flightStatus != null) {
            dispatch(updateFlightStatus({flightId : payload?.data?.flightId, flightStatus : payload?.data?.flightStatus}));
        }
    });
}

export const getFirebaseToken = () => {
    return firebaseToken;
}

export default firebaseMessagingInit;