const res = require("express/lib/response");
const fetch = require('node-fetch');

function init() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('fullName').value,
            password: document.getElementById('password').value
        };

        fetch('localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    window.location.href = 'index.html';
                }
            });
    });
}