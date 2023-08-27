// Initialize Firebase with your config
const firebaseConfig = {
    apiKey: "AIzaSyBiyqkXU0JTxEZdmfKGrtuMTvIGvYGq7Fw",
    authDomain: "uploadimg-a8243.firebaseapp.com",
    projectId: "uploadimg-a8243",
    storageBucket: "uploadimg-a8243.appspot.com",
    messagingSenderId: "661895407436",
    appId: "1:661895407436:web:7523d8bf57c672f66ed1e9"
  };
  firebase.initializeApp(firebaseConfig);
  
  // Reference to the Firebase Storage
  const storage = firebase.storage();
  
  // Function to display all images from Firebase Storage
  function displayImages() {
    const imageContainer = document.getElementById('image-container');
  
    storage.ref().listAll()
      .then(result => {
        result.items.forEach(item => {
          if (item.name.match(/\.(jpeg|jpg|png|gif)$/)) {
            item.getDownloadURL()
              .then(url => {
                const image = document.createElement('img');
                image.src = url;
                imageContainer.appendChild(image);
              })
              .catch(error => {
                console.error('Error displaying image:', error);
              });
          }
        });
      })
      .catch(error => {
        console.error('Error listing files:', error);
      });
  }
  
  // Call the function to display all images
  displayImages();
  