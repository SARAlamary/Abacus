// Import Firebase and necessary functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCoo1UZt6daTqU1BRmTJoxJN601KNhvf4c",
    authDomain: "abacus-1cd92.firebaseapp.com",
    projectId: "abacus-1cd92",
    storageBucket: "abacus-1cd92.appspot.com",
    messagingSenderId: "52069573106",
    appId: "1:52069573106:web:224d42e32e098446a34b6b",
    measurementId: "G-NCZPLYG1NR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, get their email
        const email = user.email;
        const userName = email.substring(0, email.indexOf('@'));
        localStorage.setItem('userName', userName);
        // Update the greeting element
        document.getElementById('greeting').textContent = `Welcome, ${userName}!`;
        // Show the logout button
        document.getElementById('logout-button').style.display = 'block';
    } else {
        // User is signed out
        document.getElementById('greeting').textContent = 'Welcome!';
        // Hide the logout button
        document.getElementById('logout-button').style.display = 'none';
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const userName = localStorage.getItem('userName');
    if (userName) {
        const db = firebase.firestore();
        db.collection('quizScores')
          .where('name', '==', userName)
          .orderBy('timestamp', 'desc')
          .limit(1)
          .get()
          .then(querySnapshot => {
              if (!querySnapshot.empty) {
                  const scoreData = querySnapshot.docs[0].data();
                  document.getElementById('user-score').innerText = `Your latest score is: ${scoreData.score}`;
              } else {
                  document.getElementById('user-score').innerText = 'No scores available';
              }
          }).catch(error => {
              console.error('Error fetching score: ', error);
          });
    } else {
        document.getElementById('user-score').innerText = 'No user name found';
    }
});
    

   


// Logout function
const logout = () => {
    signOut(auth).then(() => {
        console.log('User signed out.');
        // Redirect to login.html
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error('Sign out error', error);
    });
};

// Add event listener to the logout button
document.getElementById('logout-button').addEventListener('click', logout);
