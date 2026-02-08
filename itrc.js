// Splash Screen
window.onload = function(){
  setTimeout(() => {
    document.getElementById("splash").style.opacity = 0;
    setTimeout(()=>{
      document.getElementById("splash").style.display = "none";
      document.getElementById("app").style.display = "flex";
    },500);
  },2000);
}

// Show login/signup
function showLogin(){ document.getElementById("login-form").style.display="block"; document.getElementById("signup-form").style.display="none"; }
function showSignup(){ document.getElementById("signup-form").style.display="block"; document.getElementById("login-form").style.display="none"; }

// Firebase Auth
function signup(){
  let name = document.getElementById("signup-name").value;
  let email = document.getElementById("signup-email").value;
  let pass = document.getElementById("signup-password").value;

  auth.createUserWithEmailAndPassword(email, pass)
  .then((userCredential)=>{
    let user = userCredential.user;
    db.ref("users/"+user.uid).set({name:name, online:true});
    alert("Signup successful");
  })
  .catch(err=>alert(err.message));
}

function login(){
  let email = document.getElementById("login-email").value;
  let pass = document.getElementById("login-password").value;

  auth.signInWithEmailAndPassword(email, pass)
  .then((userCredential)=>{
    let user = userCredential.user;
    db.ref("users/"+user.uid).update({online:true});
    window.location.href="chat.html";
  })
  .catch(err=>alert(err.message));
}

function logout(){
  let user = auth.currentUser;
  if(user) db.ref("users/"+user.uid).update({online:false});
  auth.signOut().then(()=>window.location.href="index.html");
}

function resetPassword(){
  let email = prompt("Enter your email for password reset:");
  auth.sendPasswordResetEmail(email)
  .then(()=>alert("Password reset email sent"))
  .catch(err=>alert(err.message));
}

// Simulate chat
function send(){
  let input = document.getElementById("text");
  let msg = input.value.trim();
  if(msg==="") return;
  let div = document.createElement("div");
  div.className="message right"; div.innerText=msg;
  document.getElementById("chat").appendChild(div);
  input.value="";
  document.getElementById("chat").scrollTop=document.getElementById("chat").scrollHeight;
}

// Simulate online/offline for demo
let statusEl = document.getElementById("status");
setInterval(()=>{
  let isOnline = Math.random()>0.3;
  if(statusEl){
    statusEl.innerText = isOnline?"Online":"Offline";
    statusEl.style.color=isOnline?"#00FF00":"#b0f2b6";
  }
},5000);
function signup(){
  let name = document.getElementById("signup-name").value;
  let email = document.getElementById("signup-email").value;
  let pass = document.getElementById("signup-password").value;

  if(name=="" || email=="" || pass==""){
    showMsg("❌ Please fill all fields");
    return;
  }

  auth.createUserWithEmailAndPassword(email, pass)
  .then((userCredential)=>{
    let user = userCredential.user;

    // Save attributes in database
    db.ref("users/" + user.uid).set({
      name: name,
      email: email,
      uid: user.uid,
      online: true,
      createdAt: new Date().toISOString()
    });

    showMsg("✅ Signup successful! Welcome to ITRCS");
    setTimeout(()=> window.location.href="chat.html",1500);
  })
  .catch((error)=>{
    showMsg("❌ " + error.message);
  });
}
function logout(){
  let user = auth.currentUser;

  if(user){
    db.ref("users/" + user.uid).update({
      online: false,
      lastLogout: new Date().toISOString()
    });
  }

  auth.signOut().then(()=>{
    showMsg("👋 Logged out successfully");
    setTimeout(()=> window.location.href="index.html",1000);
  });
}
function showMsg(text){
  let box = document.getElementById("msgBox");
  box.innerText = text;
  box.style.display = "block";

  setTimeout(()=>{
    box.style.display = "none";
  },3000);
}