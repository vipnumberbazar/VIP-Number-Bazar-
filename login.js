const USERNAME = "maldev";
const PASSWORD = "6354312829";

document.getElementById("loginBtn").onclick = function () {

  const username =
    document.getElementById("username").value.trim();

  const password =
    document.getElementById("password").value.trim();

  if (username === USERNAME && password === PASSWORD) {

    sessionStorage.setItem("adminLogin", "true");

    window.location.href = "admin.html";

  } else {

    document.getElementById("msg").innerHTML =
      "❌ Username અથવા Password ખોટો છે";

  }

};
