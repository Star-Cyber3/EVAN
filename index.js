function submitInfo() {
  let username = stringToHash(document.querySelector("#user").value);
  let password = stringToHash(document.querySelector("#pass").value);
  alert("password hashed is: " + password);
  alert("username hashed is: " + username);
  if ((username == "username") & (password == "password")) {
    alert("ok")
  } else if ((username == "") || (password == "")) {
    alert("Error: Please fill in all fields")
  } else {
    alert("Error: Username or Password is invalid")
    document.querySelector("#pass").value = "";
  }
}

// Convert to 32bit integer
function stringToHash(string) {

  let hash = 0;

  if (string.length == 0) {return hash;}

  for (let i = 0; i < string.length; i++) {
    let char = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return hash;
}
