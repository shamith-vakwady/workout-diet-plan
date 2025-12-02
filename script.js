function checkLogin() {
  const id = document.getElementById("userId").value;
  const pass = document.getElementById("password").value;

  // You can set your own credentials here
  const validId = "admin";
  const validPass = "2004";

  if (id === validId && pass === validPass) {
    window.location.href = "info.html"; // Redirect to info page
  } else {
    document.getElementById("message").innerText = "❌ Invalid ID or Password";
  }
}
