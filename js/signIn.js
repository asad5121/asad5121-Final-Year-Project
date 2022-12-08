

firebase.auth().onAuthStateChanged(function (user) {
    console.log(user);
    if(!user){
        location.replace('about.html')
    }else{
        // location.replace('about.html')
    }
});





  document.getElementById('btnLoginIn').onclick = () => {
    
    var name = document.getElementById('name');
    var email = document.getElementById('signupemail').value;
    var password = document.getElementById('password').value;
      firebase.auth().signInWithEmailAndPassword(
          email,
          password
        );
        var auth = firebase.auth();
        var currentUser = auth.currentUser;
        console.log(credential);
  }