import { initializeFirebase } from "./firebaseConfig.js"
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
            }else{
                console.log("Error with login")
            }
            return false;
        }
    },
    signInFlow: 'popup',
    signInSuccessUrl: 'not-existing.html'
};

function initializeUI(container){

const ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);

    firebase.auth().onAuthStateChanged(function(user) {
        let saveBtn = document.getElementById("saveDBTable");
        let loadBtn = document.getElementById("loadDBTable");
    if (!user) {
        ui.start('#firebaseui-auth-container', uiConfig);
        loadBtn?.classList.toggle('disabled', true);
        saveBtn?.classList.toggle('disabled', true);
    }else{
        ui.reset();
        renderLogoutCard("firebaseui-auth-container");
        loadBtn?.classList.toggle('disabled', false);
        saveBtn?.classList.toggle('disabled', false);
    }
});
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
}

export { initializeUI }