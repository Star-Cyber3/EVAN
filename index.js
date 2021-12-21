let failedAttempts = 0

function init() {
  document.querySelector("#user").addEventListener('keydown', enter);
  document.querySelector("#pass").addEventListener('keydown', enter);
}

function enter(evt) {
  if(evt.keyCode === 13) {
    submitInfo();
  }
}

function submitInfo() {
  let signIn = getCookie("signIn");
  // alert(signIn);
if ((failedAttempts <= 2) || (signIn !== "failed")) {
    let username = stringToHash(document.querySelector("#user").value);
    let password = stringToHash(document.querySelector("#pass").value);
    // alert("password hashed is: " + password);
    // alert("username hashed is: " + username);
    if ((username == "284393587") & (password == "-1141017834")) {
      setCookie("signIn", "correct", 1);
      location.assign("actualPage");
    } else if ((username == "0") || (password == "0")) {
      alert("Error: Please fill in all fields");
      document.querySelector("#pass").value = "";
    } else {
      alert("Error: Username or Password is invalid")
      document.querySelector("#pass").value = "";
      failedAttempts++
    }
  } else {
    setCookie("signIn", "failed", 0.04166666666666666666666666666667);
    alert("You have failed 3 times to log in. Please wait 1 hour to try again. ");
  }
}

// Convert to 32bit integer
function stringToHash(string) {

  let hash = 0;

  if (string.length == 0) {
    return hash;
  }

  for (let i = 0; i < string.length; i++) {
    let char = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return hash;
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
