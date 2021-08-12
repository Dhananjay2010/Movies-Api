let express = require("express");

let data = require("./data.json")

// Bas abhi create kiya hai, chalu nhi hua hai
let server = express(); // Server ka instance ban gaya.



server.get("/movies", function (req, res) {
    res.json(data);
});

server.get("/genre", function (req, res) {
    let allGenreObjects = data.map(function (el) {
        return el.genre
    })
    // Ye pura kam data.json se unique genre nikalne ke liye kara
    // hai taki use hum apne movies app mai use kar payein
    let uniqueGenreObjects = [];

    for (let i = 0; i < allGenreObjects.length; i++) {
        let genreId = allGenreObjects[i]["_id"];

        let index = uniqueGenreObjects.findIndex(function (el) {
            return el._id == genreId // findIndex function=> agar index mil jata hai to wo return hoga nhi to -1.
        })

        if (index == -1) {
            uniqueGenreObjects.push(allGenreObjects[i]);
        }
    }

    res.json(uniqueGenreObjects);
});


server.listen(4000);

/*
server.listen(4000);

=> Ye line server ko shuru kar deti hai ek kisi port per.

   4000 is a port here. Port ek destination ki tarah hai.



Request: ==> Request on the server can be of many types.

            Here we are going to use is "get" request.
            Which says to get something from the server.


http://localhost:4000/

=> local host ka matlab hota hai ki local machine.

    http://localhost:4000/ ==> Ye ek url hai server ka


server.get("/movies", function (req, res) {
  res.send("movies data from server");
});

==> Isne bola ki jiske aage /movies(http://localhost:4000/movies) hai, usko response mai
    "movies data from server" bhejde.

JSON: ==> JavaScript Object Notation{ Used to transfer data on the web.}


server.get("/movies", function(req, res){
    res.json(data); // let data=require("./data.json")
});

==> Isse humne json data bhejdiya


Web API====> Aisa server jo sirf data bhejta hai ya data ke terms mai baat
        karta hai or koi code na bheje use WEB API bolte hain.



<=====================LifeCycle==========================================>

React ke class component ki ek lifecycle hoti hai jo humare component ki sthithi
bata hai ki humara component kar kaisa raha hai abhi.


constructor==> Render===> ComponentDidMount==>ComponentWillUnmount

Jab component kisi bhi phase mai hota hai to function execute hota hai.
Matlab jaise ki jab component render phase mai hota hai to render function 
execute hota hai.

Component Did Mount==> Similarly jab component apne ComponentDidMount wale phase mai hota hai to 
                        ye function execute hota hai.

                        Ye ek one time phase hai. React component ki puri zindagi mai sirf ekk bar hota hai.
                        (Render jaise ki many times hota hai. jab bhi hum state change karte hain, component re-render hota hai.)

                        Per ye bas ek bar hota hai apni puri lifecycle mai. Aur ye tab hoga jab component ui pe puri 
                        tarah visible ho chuka hai.

                        So it is the best time for making the api calls.



*/