import firebaseMessagingInit from "./firebase_messaging_init";

export const requestNotificationPermission = async () => {
    if (Notification.permission === 'denied') {
        return;
    }
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
        firebaseMessagingInit();
    } else if (permission === 'denied') {
        alert("Notification permission have been denies please enable to receive notifications");
    }
}