const express = require("express");
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const statusMonitor = require('express-status-monitor');
const firebase = require('firebase-admin');
const { initializeApp, applicationDefault } = require('firebase-admin/app');

app.use(cookieParser());
app.use(express.json());

const admin = require("firebase-admin");
const serviceAccount = require("./firebaseSDK.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://plan2travel4u-default-rtdb.europe-west1.firebasedatabase.app"
});

app.use('/status', (req, res, next) =>
{
    const idToken = req.cookies.idToken;
    if (!idToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    firebase.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            //TODO: write Database Firebase admins...
            if (decodedToken.uid === "GipbEobKxKc5zj7dS3WqlMIW1Cg2"){
                req.user = decodedToken;
                next();
            }else{
                return res.status(401).json({ error: 'Unauthorized' });
            }
        })
        .catch(error => {
            console.error('Error verifying Firebase ID token:', error);
            return res.status(401).json({ error: 'Unauthorized' });
        });
}
);

app.use(statusMonitor({
    title: 'Healthcheck for Plan2travel4u',
    healthChecks: [{
        protocol: 'http',
        host: 'localhost',
        path: '/src/html/index.html',
        port: '3000'
    }, {
        protocol: 'http',
        host: 'localhost',
        path: '/src/html/destination.html',
        port: '3000'
    },
        {
            protocol: 'http',
            host: 'localhost',
            path: '/src/html/suitecasepacking.html',
            port: '3000'
        }]
}));
app.use(express.static(path.join(__dirname, '..')));

app.listen(PORT, () => console.log(`The server is running at ${PORT}`));