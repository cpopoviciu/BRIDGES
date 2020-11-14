/*        // Your web app's Firebase configuration
  			// For Firebase JS SDK v7.20.0 and later, measurementId is optional
        var firebaseConfig = {
          apiKey: "AIzaSyDgMXlmGPqvHLS55eqA17UkhWmvyZD4rW4",
         authDomain: "pi-pirates-site.firebaseapp.com",
         databaseURL: "https://pi-pirates-site.firebaseio.com",
          projectId: "pi-pirates-site",
         storageBucket: "pi-pirates-site.appspot.com",
         messagingSenderId: "432101626526",
         appId: "1:432101626526:web:558fdcd89bf6bfca30e18f",
         measurementId: "G-MGEEJ1R6TK"
       };
     // Initialize Firebase
       firebase.initializeApp(firebaseConfig);
       firebase.analytics();
       firebase.auth();
  */  
       


$("#login-button").click(function(){
  var userEmail = document.getElementById("email").value;
  var userPassword = document.getElementById("password").value;
  //var human = documet.getElementById("human").value;

  if(userEmail.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if(userPassword.length < 4) {
    alert('Please enter a password.');
    return;
  }
  /*if(!human){
    alert('Please Verify that you are not a Robot');
    return;
  }*/
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
    return firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
      // Handle Errors here.
      //window.alert(userEmail + " " + userPassword)
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  })
 
});

$("#logout-button").click(function(){
  //window.alert("Clicked");
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.href = "login.html";
  }).catch(function(error) {
    // An error happened.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
});


$("#change-password-button").click(function(){
  var auth = firebase.auth();
  var user = firebase.auth().currentUser;
  var emailAddress = "error@test.com";

  if (user != null) {
    user.providerData.forEach(function (profile) {
      emailAddress = profile.email;
      console.log("  Email: " + emailAddress);
    });
  }
  auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
    window.alert("EMAIL SENT TO RESET PASSWORD");
  }).catch(function(error) {
    // An error happened.
    var errorMessage = error.message;
    alert(errorMessage);
  });
});

$("#forgot-password-button").click(function(){
  var auth = firebase.auth();
  var emailAddress = document.getElementById("email").value;

  if (emailAddress != "") {
    auth.sendPasswordResetEmail(emailAddress).then(function() {
      // Email sent.
      window.alert("EMAIL SENT TO RESET PASSWORD");
    }).catch(function(error) {
      // An error happened.
      var errorMessage = error.message;
      alert(errorMessage);
    });

  } else{
    window.alert("Please enter an Email")
  }
  
});

//File Storage
const storage = firebase.storage();
var file;
var fileName;
var storageRef = storage.ref().child;
var userFileLabel = document.getElementById("user-file-label");

$("#file-select").change(function(e){
    //Get File after change
    file = e.target.files[0];
    fileName = file.name;
    console.log("FILE: " + fileName); 
    //Display File Name
    userFileLabel.textContent = "Selected: " + fileName;
    //Create Storage Ref
    storageRef = firebase.storage().ref('main/' + file.name);
});

$("#file-submit").click(function(e){   
    //Upload File
    var uploadTask = storageRef.put(file);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
      // Handle unsuccessful uploads
    }, function() {
      // Handle successful uploads on complete
      userFileLabel.textContent = fileName + ": upload complete";
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
      });
    });
});


//Retrieving List
// Create a reference under which you want to list
// Find all the prefixes and items.
window.onload = storageRef.listAll().then(function(res) {
  res.prefixes.forEach(function(folderRef) {
    // All the prefixes under listRef.
    console.log(folderRef.name);
    // You may call listAll() recursively on them.
  });
  res.items.forEach(function(itemRef) {
    // All the items under listRef.
  });
}).catch(function(error) {
  // Uh-oh, an error occurred!
});
