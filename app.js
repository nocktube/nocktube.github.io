// Initialize Firebase (Replace with your Firebase configuration)
const firebaseConfig = {
  apiKey: "AIzaSyBiyqkXU0JTxEZdmfKGrtuMTvIGvYGq7Fw",
  authDomain: "uploadimg-a8243.firebaseapp.com",
  databaseURL: "https://uploadimg-a8243-default-rtdb.firebaseio.com",
  projectId: "uploadimg-a8243",
  storageBucket: "uploadimg-a8243.appspot.com",
  messagingSenderId: "661895407436",
  appId: "1:661895407436:web:7523d8bf57c672f66ed1e9"
};


firebase.initializeApp(firebaseConfig);

// Reference to Firebase Storage
var storage = firebase.storage();

// Reference to the mediaList container
var mediaList = document.getElementById("mediaList");

// Function to retrieve and display media (images and videos)
function displayMedia() {
  var storageRef = storage.ref();

  storageRef.listAll().then(function (result) {
    mediaList.innerHTML = ""; // Clear the previous content

    result.items.forEach(function (itemRef) {
      itemRef.getDownloadURL().then(function (url) {
        var mediaName = itemRef.name;
        var mediaType = mediaName.split('.').pop().toLowerCase();

        // Create an element for the retrieved media (image or video)
        var mediaElement = document.createElement("div");
        mediaElement.classList.add("media-item");

        // Modify this part to display the media based on its type
        if (mediaType === 'mp4' || mediaType === 'webm') {
          mediaElement.innerHTML = `
            <div class="media-item">
              <video controls>
                <source src="${url}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
          `;
        } else {
          mediaElement.innerHTML = `
            <div class="media-item">
              <img src="${url}" alt="${mediaName}">
            </div>
          `;
        }

        mediaList.appendChild(mediaElement);
      }).catch(function (error) {
        console.error("Error getting download URL: " + error);
      });
    });
  }).catch(function (error) {
    console.error("Error listing items: " + error);
  });
}

// Call the function to display media when the page loads
window.addEventListener("load", function () {
  displayMedia();

  // Create an array of media objects with name and URL properties
  var mediaData = []; // Populate this array with your media data

  // Configure Fuse.js with the media data and search options
  var fuseOptions = {
    keys: ["name"], // Specify the key to search in (e.g., media file names)
    includeScore: true,
    threshold: 0.4, // Adjust the threshold to control search sensitivity
  };

  var fuse = new Fuse(mediaData, fuseOptions);

  // Reference to the search input and search button
  var searchInput = document.getElementById("searchInput");
  var searchBtn = document.getElementById("searchBtn");

  // Add an event listener for the search button
  searchBtn.addEventListener("click", function () {
    var searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm !== "") {
      // Call a function to handle the search and display results
      searchAndDisplayResults(searchTerm);
    } else {
      // If the search term is empty, display all media again
      displayMedia();
    }
  });

  // Function to search and display results based on the search term
  function searchAndDisplayResults(searchTerm) {
    // Perform the fuzzy search using Fuse.js on the mediaData
    var searchResults = fuse.search(searchTerm);

    // Clear the previous content in the mediaList
    mediaList.innerHTML = "";

    // Display the search results
    searchResults.forEach(function (result) {
      var media = result.item;
      var mediaUrl = media.url;
      var mediaName = media.name;
      var mediaType = mediaName.split('.').pop().toLowerCase();

      // Create an element for the retrieved media (image or video)
      var mediaElement = document.createElement("div");
      mediaElement.classList.add("media-item");

      // Modify this part to display the media based on its type
      if (mediaType === 'mp4' || mediaType === 'webm') {
        mediaElement.innerHTML = `
          <div class="media-item">
            <video controls>
              <source src="${mediaUrl}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        `;
      } else {
        mediaElement.innerHTML = `
          <div class="media-item">
            <img src="${mediaUrl}" alt="${mediaName}">
          </div>
        `;
      }

      mediaList.appendChild(mediaElement);
    });
  }
});
