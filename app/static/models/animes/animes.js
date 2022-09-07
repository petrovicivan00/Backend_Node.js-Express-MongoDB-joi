const addEntry = () => {

    
    const title = document.getElementById("title1").value;
    const creator = document.getElementById("creator1").value;
    const year = document.getElementById("year1").value;
    const season = document.getElementById("season1").value;
    const episode = document.getElementById("episode1").value;
    const rating = document.getElementById("rating1").value;
  
    if(title == "" | creator =="" | year == "" | season == "" | episode=="" | rating=="" ){
      alert("Please fill every element!")
      return false;
    }

    const requestData = {
        title : title,
        creator : creator,
        year : Number.parseInt(year),
        season : Number.parseInt(season),
        episode : Number.parseInt(episode),
        rating :Number.parseFloat(rating)
    };
  
    if(requestData.title.length > 100 | requestData.genre.length > 100){
      alert('Credentials are too long!');
      return false;
    }
    if(requestData.rating > 10 && requestData.rating < 0.1){
      alert('Rating is not between 0 and 10!');
      return false;
    }
    if(requestData.year > 2022 && requestData.year < 1800){
      alert('Invalid year!');
      return false;
    }
    
    const token = JSON.parse(localStorage.getItem("token"));
    fetch("http://localhost:3000/api/animes", {
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

    const animeId = document.getElementById("id2").value;
    const title = document.getElementById("title2").value;
    const creator = document.getElementById("creator2").value;
    const year = document.getElementById("year2").value;
    const season = document.getElementById("season2").value;
    const episode = document.getElementById("episode2").value;
    const rating = document.getElementById("rating2").value;
    
    if(animeId =="" | title == "" | creator =="" | year == "" | season == "" | episode =="" | rating =="" ){
      alert("Please fill every element!")
      return false;
    }

    const requestData = {
        animeId : animeId,
        title : title,
        creator : creator,
        year : Number.parseInt(year),
        season : Number.parseInt(season),
        episode : Number.parseInt(episode),
        rating :Number.parseFloat(rating)
    };

      
    if(requestData.title.length > 100 | requestData.genre.length > 100){
      alert('Credentials are too long!');
      return false;
    }
    if(requestData.rating > 10 && requestData.rating < 0.1){
      alert('Rating is not between 0 and 10!');
      return false;
    }
    if(requestData.year > 2022 && requestData.year < 1800){
      alert('Invalid year!');
      return false;
    }
  
    const token = JSON.parse(localStorage.getItem("token"));
    fetch("http://localhost:3000/api/animes/" + animeId, {
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

    const animeId = document.getElementById("id3").value;

    const requestData = {
        animeId: animeId,
    };
    const token = JSON.parse(localStorage.getItem("token"));
    fetch("http://localhost:3000/api/animes/"+ animeId , {
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
      alert("Token expired!");
      window.location.href = "/../../login.html";
      localStorage.clear();
      return true;
    }
    return false;
  };

  const showAnimes = () =>  {

    const token = JSON.parse(localStorage.getItem("token"));
    fetch('http://localhost:3000/api/animes', {
      method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        }
    })
        .then( res => res.json() )
        .then( data => {
            const allAnimes = document.getElementById('getAnimes');

            data.forEach( el => {
                allAnimes.innerHTML += `<li>animeId: ${el._id}, title: ${el.title}, 
                    creator: ${el.creator}, year: ${el.year}, season: ${el.season}, episode: ${el.episode},
                    rating: ${el.rating} </li>`;
            });
        });
      }