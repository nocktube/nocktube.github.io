  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import {
    getAuth,
    createUserWithEmailAndPassword,
  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBiyqkXU0JTxEZdmfKGrtuMTvIGvYGq7Fw",
    authDomain: "uploadimg-a8243.firebaseapp.com",
    databaseURL: "https://uploadimg-a8243-default-rtdb.firebaseio.com",
    projectId: "uploadimg-a8243",
    storageBucket: "uploadimg-a8243.appspot.com",
    messagingSenderId: "661895407436",
    appId: "1:661895407436:web:7523d8bf57c672f66ed1e9"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);

function uploadImage() {
   const ref = firebase.storage().ref();
   const file = document.querySelector("#photo").files[0];
   const name = +new Date() + "-" + file.name;
   const metadata = {
      contentType: file.type
   };
   const task = ref.child(name).put(file, metadata);

   task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
         console.log(url);
         alert('Image uploaded successfully');
         document.querySelector("#image").src = url;
         document.querySelector("#errorMsg").textContent = ""; // Clear any previous error message
      })
      .catch(error => {
         console.error(error);
         document.querySelector("#errorMsg").textContent = "Error uploading image.";
      });
}
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth()


var fullName = document.getElementById("fullname");
var contact = document.getElementById("contact");
var email = document.getElementById("email");
var password = document.getElementById("password");
var copassword = document.getElementById("copassword")
window.signup = function (e) {
if(password)

    if(fullName.value == "" || contact.value=="" || email.value =="" || password.value ==""){
        alert("All Field Are Required")
    }
    if(password.value == copassword.value){
     
    }
    else{
        alert("Password Confirmation is Wrong")
        return false
    }

    e.preventDefault();
    var obj = {
      firstName: fullName.value,
      contact: contact.value,
      email: email.value,
      password: password.value,
    };
  
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function(success){
        window.location.replace('login.html')
      // console.log(success.user.uid)
      alert("signup successfully")
    })
    .catch(function(err){
      alert("Error in " + err)
    });
   console.log()
    console.log(obj);
  };