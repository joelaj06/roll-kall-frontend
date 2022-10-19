import rollkallicon from '../assets/images/rollkallicon.ico'
class PushNotification {
  pushToNotification = async (body) => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const notification = new Notification("Sign in successful", {
        body: body,
        icon: rollkallicon,
        //tag : overrides current notification
      });
      notification.addEventListener("error", (e) => {
        console.log(e);
        alert("You need to enable push notification");
      });
    }
  };
}

export default PushNotification;
