const admin = require("firebase-admin");
const express = require("express");

const app = express();

const serviceAccount = require("../config/foodDeliveryServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let version = 1;

app.get("/", (req, res) => {
  const token = req.query.token;

  const message = {
    data: {
      score: "851",
      time: "2:45",
      // version: version++,
    },
    notification: {
      title: "Success",
      body: "This is notification body",
    },
    android: {
      ttl: 0,
      priority: "high", //"normal",
    },
    apns: {
      payload: {
        aps: {
          // "mutable-content": 1,
        },
      },
      fcm_options: {
        // image: 'https://foo.bar.pizza-monster.png'
      },
    },
    token: token,
  };

  //send message to the device corresponding to the provided registration token
  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Notification sent", response);
      res.send("Notification sent");
    })
    .catch((error) => {
      console.log("Error sending notification", error);
      res.send("Error sending notification");
    });
});

app.listen(3001);
