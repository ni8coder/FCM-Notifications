const admin = require("firebase-admin");
const express = require("express");

const app = express();

const serviceAccount = require("../config/foodDeliveryServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get("/", (req, res) => {
  const token = req.query.token;

  const message = {
    data: {
      score: "850",
      time: "2:45",
    },
    notification: {
      title: "Success",
    },
    android: {
      ttl: 0,
      priority: "high",
    },
    token,
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

app.listen(3000);
