window.onload = function () {
    var loginBtn = document.getElementById("login");
    var logout = document.getElementById("logout");
    var usersBtn = document.getElementById("users");
    var moviesBtn = document.getElementById("movies");
    var showsBtn = document.getElementById("shows");
    var standupsBtn = document.getElementById("standups");
    var animesBtn = document.getElementById("animes");
    
  
    logout.onclick = function () {
      if (!localStorage.getItem("token")) {
        alert("Niste ulogovani");
        return;
      }
      localStorage.clear();
      alert("Odlogovalii ste se");
      window.location.href = "login.html";
    };
  
    usersBtn.onclick = function () {
      if (!localStorage.getItem("token")) {
        alert("Niste ulogovani");
        return;
      }
      const token = localStorage.getItem("token");
      fetch("http://localhost:3000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "token": `${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.message){
              if (jwtExpired(data.message)) return;
              alert(JSON.stringify(data.message));
              return;
          }
          console.log(data);
          localStorage.setItem("users", JSON.stringify(data))
          window.location.href = "models/users/users.html";
        });
    };
  
    moviesBtn.onclick = function () {
      if (!localStorage.getItem("token")) {
          alert("Niste ulogovani");
          return;
        }
        const token = JSON.parse(localStorage.getItem("token"));
        fetch("http://localhost:3000/api/movies", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "token": `${token}`,
          },
        })
          .then((res) => {
            localStorage.setItem("movies", JSON.stringify(res.data))
            window.location.href = "models/movies/movies.html";
          });
    };
  
    showsBtn.onclick = function () {
        if (!localStorage.getItem("token")) {
            alert("Niste ulogovani");
            return;
          }
          const token = JSON.parse(localStorage.getItem("token"));
          fetch("http://localhost:3000/api/shows", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "token": `${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if(data.message){
                  if (jwtExpired(data.message)) return;
                  alert(JSON.stringify(data.message));
                  return;
              }
              console.log(data);
              localStorage.setItem("shows", JSON.stringify(data))
              window.location.href = "models/shows/shows.html";
            });
      };
  
      animesBtn.onclick = function () {
        if (!localStorage.getItem("token")) {
            alert("Niste ulogovani");
            return;
          }
          const token = JSON.parse(localStorage.getItem("token"));
          fetch("http://localhost:3000/api/animes", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "token": `${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if(data.message){
                  if (jwtExpired(data.message)) return;
                  alert(JSON.stringify(data.message));
                  return;
              }
              console.log(data);
              localStorage.setItem("animes", JSON.stringify(data))
              window.location.href = "models/animes/animes.html";
            });
      };
      standupsBtn.onclick = function () {
        if (!localStorage.getItem("token")) {
            alert("Niste ulogovani");
            return;
          }
          const token = JSON.parse(localStorage.getItem("token"));
          fetch("http://localhost:3000/api/standups", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "token": `${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if(data.message){
                  if (jwtExpired(data.message)) return;
                  alert(JSON.stringify(data.message));
                  return;
              }
              console.log(data);
              localStorage.setItem("standups", JSON.stringify(data))
              window.location.href = "models/standups/standups.html";
            });
      };
  
    loginBtn.onclick = function () {
      if (localStorage.getItem("token")) {
        alert("Ulogovani ste");
        return;
      }
      window.location.href = "login.html";
    };
  
    const jwtExpired = (message) => {
      if (
        message == "jwt expired" ||
        message == "Authentication missing" ||
        message == "Please login"
      ) {
        alert("Niste ulogovani");
        window.location.href = "/../../login.html";
        localStorage.clear();
        return true;
      }
      return false;
    };
    
  
  };
  