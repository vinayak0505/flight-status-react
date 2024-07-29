import { getToken, onMessage } from "firebase/messaging";
import { firebaseMessaging } from "./firebase";
import onNotification from "./on_notification";

const firebaseMessagingInit = async () => {
    const token = await getToken(firebaseMessaging, {
        vapidKey:
            "BGn7hL6A9GNrpQsGANGy28UCJ0vlZogLytvTENLlwxBKGe1_R6kUa6fZZCtGJtFd8a8GpMZOGV1bvOvZcTxuMFM"
    });

    console.log(token);

    onMessage(firebaseMessaging, (payload) => {
        onNotification(payload?.notification?.title, payload?.notification?.body, payload?.data?.['google.c.a.c_l'])
    });

}

export default firebaseMessagingInit;