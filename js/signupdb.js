


firebase.auth().onAuthStateChanged(function (user) {
    console.log(user);
    if(!user){
        location.replace('about.html')
    }else{
        // location.replace('about.html')
    }
});


document.getElementById('btnSignUp').onclick = () => {
    
    var name = document.getElementById('name');
    var email = document.getElementById('signupemail').value;
    var password = document.getElementById('password').value;
      firebase.auth().createUserWithEmailAndPassword(
          email,
          password
        )
        .then((Credientail))
       
        var auth = firebase.auth();
        var currentUser = auth.currentUser;
        //console.log(credential);
        alert("Account Created success!! Login To your account")
  }

 