const onNotification = (title?: string, body?: string, name?: string) => {
    // TODO what to do on notification;
    // alert("onscreen " + title);
    if (title == null) return;    
    new Notification(title, { body });

}

export default onNotification;