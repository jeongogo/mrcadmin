import { auth } from "../firebase-config";

export function signIn({email, password}) {
    return auth().signInWithEmailAndPassword(email, password);
}

export function signUp({email, password}) {
    return auth().createUserWithEmailAndPassword(email, password);
}

export function subscribeAuth(callback) {
    return auth().onAuthStateChanged(callback);
}

export function signOut() {
    return auth().signOut();
}