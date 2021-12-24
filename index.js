let failedAttempts = 0

function init() {
  document.querySelector("#remove").addEventListener('click', removeErrorMessage);
  document.querySelector("#user").addEventListener('keydown', enter);
  document.querySelector("#pass").addEventListener('keydown', enter);
}

function removeErrorMessage() {
  let errorPopup = document.querySelector("#error");
  errorPopup.style.display = "none";
  errorPopup.innerHTML = "";
  let newDelete = document.createElement('SPAN');
  newDelete.setAttribute("id", "remove");
  newDelete.innerHTML = "&times;";
  newDelete.addEventListener('click', removeErrorMessage);
  errorPopup.appendChild(newDelete);
}

function enter(evt) {
  if (evt.keyCode === 13) {
    submitInfo();
  }
}

function submitInfo() {
  let signIn = getCookie("signIn");
  // alert(signIn);
  if ((failedAttempts <= 2) || (signIn !== "failed")) {
    let errorPopup = document.querySelector("#error");
    errorPopup.innerHTML = "";
    let newDelete = document.createElement('SPAN');
    newDelete.addEventListener('click', removeErrorMessage);
    newDelete.setAttribute("id", "remove");
    newDelete.innerHTML = "&times;";
    errorPopup.appendChild(newDelete);
    let username = stringToHash(document.querySelector("#user").value.toLowerCase());
    let password = stringToHash(document.querySelector("#pass").value);
    // alert("password hashed is: " + password);
    // alert("username hashed is: " + username);
    if ((username == "-1380259693") & (password == "-1141017834")) {
      setCookie("signIn", "correct", 1);
      location.assign("actualPage");
    } else if ((username == "0") || (password == "0")) {
      let errorPopup = document.querySelector("#error");
      let newError = document.createElement("P");
      errorPopup.style.display = "block";
      newError.innerHTML = "Error: Please fill in all fields";
      errorPopup.appendChild(newError);
      document.querySelector("#pass").value = "";
    } else {
      let errorPopup = document.querySelector("#error");
      let newError = document.createElement("P");
      errorPopup.style.display = "block";
      newError.innerHTML = "Error: Username or Password is invalid";
      errorPopup.appendChild(newError);
      document.querySelector("#pass").value = "";
      failedAttempts++
    }
  } else {
    setCookie("signIn", "failed", 0.0417);
    alert("You have failed 3 times to log in. Please wait about 1 hour to try again. ");
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
  for (let i = 0; i < ca.length; i++) {
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
