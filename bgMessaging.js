import firebase from '@react-native-firebase/messaging';
export default async message => {
  // handle your message
  const notificationid = message._from;
  const title = message.data.title;
  const body = message.data.body;
  const story_id = message.data.story_id;
  const icon = message.data.icon;
  const notification = new firebase.notifications.Notification()
    .setNotificationId(story_id) // Any random ID
    .setTitle(title) // Title of the notification
    .setBody(body) // body of notification
    .android.setPriority(firebase.notifications.Android.Priority.High) // set priority in Android
    .android.setChannelId('all') // should be the same when creating channel for Android
    .android.setLargeIcon(icon)
    .android.setBigPicture(icon)
    .android.setAutoCancel(true); // To remove notification when tapped on it
  firebase.notifications().displayNotification(notification);
  return Promise.resolve();
};
