function submitInfo() {
  const username = document.querySelector("#user").value;
  const password = document.querySelector("#pass").value;
  alert(password)
  if ((username == "username") & (password == "password")) {
    alert("ok")
  } else if ((username == "") || (password == "")) {
    alert("Error: Please fill in all fields")
  } else {
    alert("Error: Username or Password is invalid")
    document.querySelector("#pass").value = "";
  }
}
