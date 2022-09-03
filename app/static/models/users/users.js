
  const deleteUser = () => {
    
    const userId = document.getElementById("id1").value;

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