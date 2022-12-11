const singUpButton = document.getElementById("signUp");
const singInButton = document.getElementById("signIn");
const container = document.getElementById("container");

singUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

singInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQDlbpgOz5USQcUAjVaEfiDrTYezY9ReA",
  authDomain: "school-finder-2085a.firebaseapp.com",
  databaseURL: "https://school-finder-2085a-default-rtdb.firebaseio.com",
  projectId: "school-finder-2085a",
  storageBucket: "school-finder-2085a.appspot.com",
  messagingSenderId: "765928501031",
  appId: "1:765928501031:web:b9fbc13ba22ec10cdc8302",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Check If User is Login or not
onAuthStateChanged(auth, (user) => {
  // Check for user status
  console.log(user);
});

async function writeUserData(userId, name, role) {
  const db = getDatabase();
  await set(ref(db, "roles/" + `${name}-${userId}`), role).then(() => {
    console.log("Role Activated.");
  });
}

//  Code for Sign Up the User
document.getElementById("btnSignUp").onclick = async () => {
  var name = document.getElementById("name").value;
  var email = document.getElementById("signupemail").value;
  var password = document.getElementById("password").value;
  var role_ = document.getElementById("role_").value;
  await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("Register Succeed.");

      updateProfile(auth.currentUser, {
        displayName: name,
      })
        .then(() => {
          console.log("Profile Updated");
        })
        .catch((error) => {
          // An error occurred
          console.log("Error while Update Profile");
        });
    })
    .then(() => {
      writeUserData(auth.currentUser.uid, name, role_);
    })
    .catch((error) => {
      console.log("You need to login.");
    });
};

//  Code for Login the User
document.getElementById("btnLogIn").onclick = async () => {
  var email = document.getElementById("email").value;
  var password = document.getElementById("pass").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log("User LoggedIN");
      console.log(user);
      const dbRef = ref(database);
      get(
        child(
          dbRef,
          "roles/" + `${auth.currentUser.displayName}-${auth.currentUser.uid}`
        )
      )
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log("Authorized Value is = " + snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.log("Error Occure for authorization");
        });
    })
    .catch((error) => {
      console.log("Error Occure while Login");
    });
};

// Btn Click for Sign Out
// signoutbtn
document.getElementById("signoutbtn").onclick = async () => {
  signOut(auth)
    .then(() => {
      console.log("User Sign Out");
    })
    .catch((error) => {
      console.log("Error While User Sign Out.");
    });
};
