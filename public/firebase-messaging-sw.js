/* Firebase Cloud Messaging service worker: shows notifications when the site is closed. */
importScripts("https://www.gstatic.com/firebasejs/11.0.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging-compat.js");

const p = new URL(self.location).searchParams;

firebase.initializeApp({
  apiKey: p.get("apiKey"),
  projectId: p.get("projectId"),
  messagingSenderId: p.get("messagingSenderId"),
  appId: p.get("appId"),
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const n = payload.notification || {};
  self.registration.showNotification(n.title || "SSB Made Simple", {
    body: n.body || "",
    icon: "/brand/logo.webp",
    data: { link: (payload.fcmOptions && payload.fcmOptions.link) || (payload.data && payload.data.link) || "/notifications" },
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const link = (event.notification.data && event.notification.data.link) || "/notifications";
  event.waitUntil(clients.openWindow(link));
});
