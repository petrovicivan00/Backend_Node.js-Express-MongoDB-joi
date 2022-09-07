var button = document.getElementById("login");

button.onclick = function () {
  const parameters = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  if (parameters.email === "") {
    alert("Email must be filled out");
    return false;
  } else if (parameters.email.length < 3 | !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(parameters.email))) {
    alert("Email is not valid");
    return false;
        }
  if (parameters.password === "") {
      alert("Password must be filled out");
      return false;
  } else if (parameters.password.length < 3 | parameters.password.length > 16 ) {
      alert("Password is not valid!");
      return false;
  }
  
  fetch("http://localhost:2000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parameters),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("token",JSON.stringify(data))
      if (!(typeof data === "string")){
          alert(JSON.stringify(data.message));
          return;
      }
      window.location.href = "index.html";
      console.log(localStorage.getItem("token"))
    });
};
