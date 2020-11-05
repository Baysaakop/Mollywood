import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCIufFECla8zXZ1UtumpRiTdCHTu6uMis0",
    authDomain: "mollywood-69f8c.firebaseapp.com",
    databaseURL: "https://mollywood-69f8c.firebaseio.com",
    projectId: "mollywood-69f8c",
    storageBucket: "mollywood-69f8c.appspot.com",
    messagingSenderId: "1037140949967",
    appId: "1:1037140949967:web:fb64c51f737aceb793f0ba",
    measurementId: "G-4Y7LL6VWS2"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
        return;
    }
    const userRef = firetore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const { displayName, email, photoURL } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName, 
                email,
                createdAt,
                photoURL,
                ...additionalData
            });
        } catch (err) {
            console.log('error creating user', err.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firetore = firebase.firestore();

const providerGoogle = new firebase.auth.GoogleAuthProvider();
providerGoogle.setCustomParameters({ prompt: 'select_account '});
export const signInWithGoogle = () => auth.signInWithPopup(providerGoogle);

const providerFacebook = new firebase.auth.FacebookAuthProvider();
providerFacebook.setCustomParameters({ 'display': 'popup '});
export const signInWithFacebook = () => auth.signInWithPopup(providerFacebook);

export default firebase;