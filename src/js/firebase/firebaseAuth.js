import {initializeFirebase} from "./firebaseConfig.js"
import {renderLogoutCard} from "../component/logoutCard.js";

initializeFirebase();

const uiConfig = {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            if (authResult.user) {
            } else {
                console.log("Error with login")
            }
            return false;
        }
    },
    signInFlow: 'popup',
    signInSuccessUrl: 'not-existing.html'
};

function initializeUI(container) {

    const ui = new firebaseui.auth.AuthUI(firebase.auth());

    if (firebase.auth().currentUser) {
        ui.start('#firebaseui-auth-container', uiConfig)
    }



    firebase.auth().onAuthStateChanged(function (user) {

        let saveBtn = document.getElementById("saveDBTable");
        let loadBtn = document.getElementById("loadDBTable");
        if (!user) {
            ui.start('#firebaseui-auth-container', uiConfig);
            loadBtn?.classList.toggle('disabled', true);
            saveBtn?.classList.toggle('disabled', true);
            document.cookie = 'idToken' + "=" + '' + ";path=/";

            document.getElementById('UserAuthBtn').classList.toggle('d-none')
            document.getElementById('UserAuthLogOutBtn').classList.add('d-none')

        } else {
            ui.reset();
            //renderLogoutCard("firebaseui-auth-container");

            document.getElementById('UserAuthBtn').classList.add('d-none')
            document.getElementById('UserAuthLogOutBtn').classList.toggle('d-none')

            let UserAuthLogOutBtn = document.getElementById('UserAuthLogOutBtn');
            UserAuthLogOutBtn.addEventListener("click", function () {
                firebase.auth().signOut();
            })

            loadBtn?.classList.toggle('disabled', false);
            saveBtn?.classList.toggle('disabled', false);

            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
                .then(function (idToken) {
                    document.cookie = 'idToken' + "=" + idToken + ";path=/";
                })
                .catch(function (error) {
                    console.error('Error getting ID token:', error);
                });

        }
    });
}

export {initializeUI}