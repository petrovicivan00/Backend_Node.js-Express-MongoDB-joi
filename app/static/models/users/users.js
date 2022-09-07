const addEntry = () => {

  const username = document.getElementById("username1").value;
  const email = document.getElementById("email1").value;
  const password = document.getElementById("password1");
  const isAdmin = document.getElementById("isAdmin1");
  const isModerator = document.getElementById("isModerator1");

  if (email == "" | username == "" | password == "") {
    alert("Please fill every element!");
    return false;
  }

  const requestData = {
      username: username,
      email: email,
      password : password.value,
      isAdmin: Boolean(isAdmin.isChecked),
      isModerator: Boolean(isModerator.isChecked),
  };

  if (requestData.email.length < 3 | !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(requestData.email))) {
    alert("Email is not valid");
    return false;
        }
  if (requestData.password == "") {
      alert("Password must be filled out");
      return false;
  } else if (requestData.password.length < 3 | requestData.password.length > 16 ) {
      alert("Password is not valid!");
      return false;
  }

  const token = JSON.parse(localStorage.getItem("token"));
  fetch("http://localhost:2000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: `${token}`,
    },
    body: JSON.stringify(requestData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        if (jwtExpired(data.message)) return;
        alert(JSON.stringify(data.message));
        return;
      }
    });
};

const editEntry = () => {

  const userId = document.getElementById("id2").value;
  const username = document.getElementById("username2").value;
  const email = document.getElementById("email2").value;
  const password = document.getElementById("password2");
  const isAdmin = document.getElementById("isAdmin2").isChecked;
  const isModerator = document.getElementById("isModerator2").isChecked;

  if (userId =="" | email == "" | username == "" | password == "") {
    alert("Please fill every element!");
    return false;
  }
  const requestData = {
    username: username,
    email: email,
    password : password.value,
    isAdmin: Boolean(isAdmin),
    isModerator: Boolean(isModerator)
  };

  if (requestData.email == "" | requestData.username == "" | requestData.password == "") {
    alert("Credentials must be filled out");
    return false;
  } else if (requestData.email.length < 3 | !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(requestData.email))) {
    alert("Email is not valid");
    return false;
        }
  if (requestData.password === "") {
      alert("Password must be filled out");
      return false;
  } else if (requestData.password.length < 3 | requestData.password.length > 16 ) {
      alert("Password is not valid!");
      return false;
  }

  const token = JSON.parse(localStorage.getItem("token"));
  fetch("http://localhost:3000/api/users/" + userId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: `${token}`,
    },
    body: JSON.stringify(requestData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        if (jwtExpired(data.message)) return;
        alert(JSON.stringify(data.message));
        return;
      }
    });
};
  
  const deleteUser = () => {
    
    const userId = document.getElementById("id3").value;

    const requestData = {
      userId: userId,
    };
  
    const token = JSON.parse(localStorage.getItem("token"));
    fetch("http://localhost:3000/api/users/" + userId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          if (jwtExpired(data.message)) return;
          alert(JSON.stringify(data.message));
          fetchUsers();
          return;
        }
      });
  };

  const jwtExpired = (message) => {
    if (message == "jwt expired") {
      alert("Token expired!");
      window.location.href = "/../../login.html";
      localStorage.clear();
      return true;
    }
    return false;
  };

  const showUsers = () =>  {

    const token = JSON.parse(localStorage.getItem("token"));
    fetch('http://localhost:3000/api/users', {
      method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        }
    })
        .then( res => res.json() )
        .then( data => {
            const allUsers = document.getElementById('getUsers');

            data.forEach( el => {
                allUsers.innerHTML += `<li>userId: ${el._id}, username: ${el.username}, 
                    password: ${el.password}, email: ${el.email}, isAdmin: ${el.isAdmin},
                     isModerator: ${el.isModerator}</li>`;
            });
        });
      }