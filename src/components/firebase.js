import React from "react"
import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

// require("dotenv").config();
// import { firestore } from "../../../crwn-clothing/src/firebase";
// console.log(process.env)


const firebaseConfig = {
    apiKey: "AIzaSyDV8sLewAkyYX3FTwWRCmV7HctLodLFtoI",
    authDomain: "react-movie-app-d3481.firebaseapp.com",
    databaseURL: "https://react-movie-app-d3481.firebaseio.com",
    projectId: "react-movie-app-d3481",
    storageBucket: "react-movie-app-d3481.appspot.com",
    messagingSenderId: "845197325260",
    appId: "1:845197325260:web:6d40951e3cd4eaef456369"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  //SETTING UP GOOGLE SIGN IN
  
  export function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({prompt: "select_account"});
    return firebase.auth().signInWithPopup(provider)
    }



    //SETTING UP SIGN UP WITH EMAIL AND PASSWORD
    export function createUser(displayName, email, password){
        firebase.firestore().collection("users").where("email", "==", email).get().then(user => {
            if (user.docs.length > 0){
                console.log("This Email Is Already Use")
            }

            else{
                return firebase.auth().createUserWithEmailAndPassword(email, password).then(cred =>{
                    console.log(cred)
                    firebase.firestore().collection("users").doc(cred.user.uid).set({
                        displayName: displayName,
                        email: email,
                        favourites: [],
                        loginProvider: "Email&Password",
                        createdAt: new Date()
                    })
                }).then(err => console.log(err))}
            

        
        })
    
    }



    //SETTING UP SIGN IN WITH EMAIL AND PASSWORD

    export function getUser(email, password){
        return firebase.auth().signInWithEmailAndPassword(email, password).then(user =>{
           console.log("Welcome" + user)
        }).catch(err => alert("The Email or Password is Incorrect"))
    }


    //ADDING USER TO DATABASE
    export function addUserToDB(user){
        if (!user){
            return;
        }

        else{
            return firebase.firestore().collection("users").doc(user.uid).get().then(res => {
                console.log(res)

                if(!res.exists){
                    return firebase.firestore().collection("users").doc(user.uid).set({
                        displayName: user.displayName,
                        email: user.email,
                        favourites: [],
                        loginProvider: user.providerData[0].providerId,
                        createdAt: new Date()
                    })
                }

                else{
                    console.log("bruhh")
                }
            })
        }
    }
  