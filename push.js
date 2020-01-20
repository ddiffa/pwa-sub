
var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BP52sNUV-cbypENR_fNphX7INY6VAmvdLspMLDnP5hfWL2FKXaEfJAz-eF6UsYoj4peL4LkCLZ_jklvAywjnQHU",
    "privateKey": "jpFagyCw1pgGs7bgNPtju92r2DQxom9Z_STFlRDQE28"
};
 
 
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/e3vZHtjIDdY:APA91bGHSWSOvYCsQWzfcT_46B2zfJTSV0vgaWr_Fbcm5d8Mn3rdIhVG0565CwR19ZDjjM5jypcI8g-JsnuLetyTxiAQwNWcZe277HEwVTyiFZCQNpbYnxmSL7-_oMXLE63j_sN032n7",
    "keys": {
        "p256dh": "BFiMEKUuJ6sKHk+TaohEJd2Z4BFGickpoq9sT/spDT4s4haL+ei/MAz/NBQ9p/wk/yDix2RvFPjBrhQAcTJ9ndg=",
        "auth": "LJxzDvwHLX/+5v6CVLoJqA=="
    }
};
var payload = 'Notification Success';
var options = {
    gcmAPIKey: 'AIzaSyCdlCZkVaV3Zw9ifkHGEQzmOorkJ0RsfqQ',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);