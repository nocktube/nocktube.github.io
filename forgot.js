// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBiyqkXU0JTxEZdmfKGrtuMTvIGvYGq7Fw",
    authDomain: "uploadimg-a8243.firebaseapp.com",
    projectId: "uploadimg-a8243",
    storageBucket: "uploadimg-a8243.appspot.com",
    messagingSenderId: "661895407436",
    appId: "1:661895407436:web:7523d8bf57c672f66ed1e9"
  };

firebase.initializeApp(firebaseConfig);
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const emailInput = document.getElementById('email');
const messageDiv = document.getElementById('message');

forgotPasswordForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = emailInput.value;

    firebase.auth().sendPasswordResetEmail(email)
        .then(function () {
            // Password reset email sent successfully
            messageDiv.innerHTML = 'Password reset email sent. Check your inbox.';
            messageDiv.style.color = 'green';
        })
        .catch(function (error) {
            // Handle errors
            messageDiv.innerHTML = error.message;
            messageDiv.style.color = 'red';
        });
});
