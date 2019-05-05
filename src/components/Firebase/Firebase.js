import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC7XUezyepCvMd3Wt4vIxYTH_JQz1iZDt8",
    authDomain: "heretoclean-876f4.firebaseapp.com",
    databaseURL: "https://heretoclean-876f4.firebaseio.com",
    projectId: "heretoclean-876f4",
    storageBucket: "heretoclean-876f4.appspot.com",
    messagingSenderId: "625739782287",
    appId: "1:625739782287:web:ff91319830ec75bc"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);
}

export default Firebase;