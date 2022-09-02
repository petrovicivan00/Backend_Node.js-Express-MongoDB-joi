const addEntry = () => {

    
    const title = document.getElementById("title1").value;
    const mainActor = document.getElementById("mainActor1").value;
    const year = document.getElementById("year1").value;
    const rating = document.getElementById("rating1").value;
  
    const requestData = {
        title : title,
        mainActor : mainActor,
        year : Number.parseInt(year),
        rating :Double.parseDouble(rating)
    };
  
    const token = JSON.parse(localStorage.getItem("token"));
    fetch("http://localhost:3000/api/standups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
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

    const standupId = document.getElementById("id2").value;
    const title = document.getElementById("title2").value;
    const mainActor = document.getElementById("mainActor2").value;
    const year = document.getElementById("year2").value;
    const rating = document.getElementById("rating2").value;
  
    const requestData = {
        standupId : standupId,
        title : title,
        mainActor : mainActor,
        year : Number.parseInt(year),
        rating :Double.parseDouble(rating)
    };
  
    const token = JSON.parse(localStorage.getItem("token"));
    fetch("http://localhost:3000/api/standups/" + standupId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
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

    const standupId = document.getElementById("id3").value;

    const requestData = {
        standupId: standupId,
    };
    const token = JSON.parse(localStorage.getItem("token"));
    fetch("http://localhost:3000/api/standups/"+ standupId , {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
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

  const showStandups = () =>  {

    const token = JSON.parse(localStorage.getItem("token"));
    fetch('http://localhost:3000/api/standups', {
      method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        }
    })
        .then( res => res.json() )
        .then( data => {
            const allStandups = document.getElementById('getStandups');

            data.forEach( el => {
                allStandups.innerHTML += `<li>standupId: ${el._id}, title: ${el.title}, 
                    mainActor: ${el.mainActor}, year: ${el.year}, rating: ${el.rating} </li>`;
            });
        });
      }