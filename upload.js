// Initialize Firebase (Replace with your Firebase configuration)
const firebaseConfig = {
    apiKey: "AIzaSyBiyqkXU0JTxEZdmfKGrtuMTvIGvYGq7Fw",
    authDomain: "uploadimg-a8243.firebaseapp.com",
    projectId: "uploadimg-a8243",
    storageBucket: "uploadimg-a8243.appspot.com",
    messagingSenderId: "661895407436",
    appId: "1:661895407436:web:7523d8bf57c672f66ed1e9"
  };
firebase.initializeApp(firebaseConfig);

// Get references to HTML elements
const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");
const uploadProgress = document.getElementById("uploadProgress");
const message = document.getElementById("message");

// Add an event listener for the upload button
uploadButton.addEventListener("click", function () {
    const file = fileInput.files[0];
    if (!file) {
        return;
    }

    // Create a storage reference
    const storageRef = firebase.storage().ref();

    // Create a reference to the selected file
    const fileRef = storageRef.child(file.name);

    // Upload file to Firebase Storage
    const uploadTask = fileRef.put(file);

    // Update progress bar during the upload
    uploadTask.on(
        "state_changed",
        function (snapshot) {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploadProgress.value = progress;
        },
        function (error) {
            console.error(error);
        },
        function () {
            // Upload completed successfully
            message.textContent = "Upload completed! You will be redirected to home!";
            
            // Redirect to index.html after 5 seconds
            setTimeout(function () {
                window.location.href = "index.html";
            }, 5000); // 5000 milliseconds = 5 seconds
        }
    );
});
