const onNotification = (title?: string, body?: string, name?: string) => {
    if (title == null) return;    
    new Notification(title, { body });

}

export default onNotification;