const addEntry = () => {

    
    const title = document.getElementById("title1").value;
    const genre = document.getElementById("genre1").value;
    const year = document.getElementById("year1").value;
    const mainActor = document.getElementById("mainActor1").value;
    const rating = document.getElementById("rating1").value;
  
    const requestData = {
        title : title,
        genre : genre,
        year : Number.parseInt(year),
        mainActor : mainActor,
        rating :Double.parseDouble(rating)
    };
  
    const token = JSON.parse(localStorage.getItem("token"));
    fetch("http://localhost:3000/api/api/movies", {
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

    const movieId = document.getElementById("id2").value;
    const title = document.getElementById("title2").value;
    const genre = document.getElementById("genre2").value;
    const year = document.getElementById("year2").value;
    const mainActor = document.getElementById("mainActor2").value;
    const rating = document.getElementById("rating2").value;
  
    const requestData = {
        movieId : movieId,
        title : title,
        genre : genre,
        year : Number.parseInt(year),
        mainActor : mainActor,
        rating :Double.parseDouble(rating)
    };
  
    const token = JSON.parse(localStorage.getItem("token"));
    fetch("http://localhost:3000/api/api/movies/" + movieId, {
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

  const deleteEntry = () => {

    const movieId = document.getElementById("id3").value;

    const requestData = {
        movieId: movieId,
    };
    const token = JSON.parse(localStorage.getItem("token"));
    fetch("http://localhost:3000/api/api/movies/"+ movieId , {
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
          return;
        }
      });
  };


  const jwtExpired = (message) => {
    if (message == "jwt expired") {
      alert("Istekao je token");
      window.location.href = "/../../login.html";
      localStorage.clear();
      return true;
    }
    return false;
  };

  const showMovies = () =>  {

    const token = localStorage.getItem("token");
    fetch('http://localhost:3000/api/movies', {
      method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token
        }
    })
        .then( res => res.json() )
        .then( data => {
            const allMovies = document.getElementById('getMovies');

            data.forEach( el => {
                allMovies.innerHTML += `<li>movieId: ${el._id}, title: ${el.title}, 
                    genre: ${el.genre}, year: ${el.year}, mainActor: ${el.mainActor},
                    rating: ${el.rating} </li>`;
            });
        });
      }