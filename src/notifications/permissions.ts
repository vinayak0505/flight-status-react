import { AppDispatch } from "../redux/store";
import firebaseMessagingInit from "./firebase_messaging_init";

// for getting permission for notification
export const requestNotificationPermission = async (dispatch: AppDispatch) => {
    if (Notification.permission === 'denied') {
        return;
    }
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
        firebaseMessagingInit(dispatch);
    } else if (permission === 'denied') {
        alert("Notification permission have been denies please enable to receive notifications");
    }
}