const onNotification = (title?: string, body?: string, name?: string) => {
    // TODO what to do on notification;
    // alert("onscreen " + title);
    if (title == null) return;
    console.log("geting nofi");
    
    const notification = new Notification(title, { body });

}

export default onNotification;