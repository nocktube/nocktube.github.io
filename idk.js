const firebaseConfig = {
    apiKey: "AIzaSyBiyqkXU0JTxEZdmfKGrtuMTvIGvYGq7Fw",
    authDomain: "uploadimg-a8243.firebaseapp.com",
    projectId: "uploadimg-a8243",
    storageBucket: "uploadimg-a8243.appspot.com",
    messagingSenderId: "661895407436",
    appId: "1:661895407436:web:7523d8bf57c672f66ed1e9"
  };
const database = firebase.database();
const storage = firebase.storage();

function search() {
    const searchInput = document.getElementById("searchInput").value;

    // Perform a search query in your Firebase Realtime Database.
    // You can structure your database to store metadata for images and videos.

    // For example, if you have a "media" node with items having "title" and "url" fields:
    const mediaRef = database.ref("media");
    
    mediaRef.orderByChild("title").startAt(searchInput).endAt(searchInput + "\uf8ff").once("value", (snapshot) => {
        const results = snapshot.val();
        displayResults(results);
    });
}

function displayResults(results) {
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "";

    if (!results) {
        searchResults.innerHTML = "No results found.";
        return;
    }

    // Loop through the results and display them.
    for (const key in results) {
        const item = results[key];
        const mediaUrl = item.url;
        const title = item.title;

        // Depending on the media type, you can create appropriate HTML elements (e.g., <img> or <video>).
        const mediaElement = document.createElement("img");
        mediaElement.src = mediaUrl;

        const titleElement = document.createElement("p");
        titleElement.textContent = title;

        // Append media and title elements to the results container.
        searchResults.appendChild(mediaElement);
        searchResults.appendChild(titleElement);
    }
}
