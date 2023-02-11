const mysql = require('mysql2');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const { copyFile } = require('fs');
//const queryString = require('query-string');

//require('dotenv').config()
dotenv.config({ path: "./sec2_gr9_ws_src/process.env"  });
//console.log(process.env.host);
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use("/", router);


app.listen(3030, function(){
    console.log("listening at Port " + 3030);
});

var dbconn = mysql.createConnection({
    host : process.env.host,
    user : process.env.user,
    password : process.env.pwd,
    database : process.env.db
});

dbconn.connect(function(err){
    if(err) throw err;
    console.log("Connected to " + process.env.db);
});
//home
router.get('/',function(req,res){
    res.statusCode = 200; //status 200: OK
    console.log("Accessed Home page");
    res.sendFile(path.join(__dirname+'/public/homepage.html'));
   });
//login
   router.get('/login',function(req,res){
    res.statusCode = 200; //status 200: OK
    console.log("Accessed login page");
    res.sendFile(path.join(__dirname+'/public/login.html'));
   });

//login services
router.get('/login/:user/:pass', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true); 
    var username = req.params.user;
    var password = req.params.pass;
    var sql = "SELECT * FROM user_ where username=" + mysql.escape(username)+ " AND u_password=" + mysql.escape(password);
    if (!username && !password) {
        return res.status(400).send({ error: true, message: 'Please insert username and password' });
    }
    dbconn.query(sql, function (error, results) {
    if (error) throw error;
        return res.send({ error: false, result: results[0], message: 'User retrieved' });
    });
});

//search
router.get('/search',function(req,res){
    //if(err) throw err;
    res.statusCode = 200;
    console.log("get search page");
    res.sendFile(path.join(__dirname + '/public/search.html'))
});

//aboutus
router.get('/aboutus',function(req,res){
    res.statusCode = 200; //status 200: OK
    console.log("Accessed login page");
    res.sendFile(path.join(__dirname+'/public/aboutuspGT.html'));
   });


/**
 * Search for movie
 * test: localhost:3030/search-movie 
 * method: POST
 * put this in the body
 * 
{
    "que" : "The",
    "crit": "short"
}
 */

router.post('/search-movie/',function(req,res){
    console.log(req.body);
    let query = req.body.que;
    //let test = req.params.que;
    let checkbox=req.body.crit;
    let crit="";
    if(!checkbox){crit+="movie|short|TVSeries|documentary";}
    else if(checkbox[0]=="all" || checkbox=="all"){crit+="movie|short|TVSeries|documentary";}
    else if(checkbox[0].length>1){
        for(let i=0;i<checkbox.length;i++){
            console.log("crit :"+checkbox[i]);
            //console.log("i = "+i);
            if(i<checkbox.length-1){crit+=checkbox[i]+"|";}
            else if(i==checkbox.length-1){crit+=checkbox[i]}
        }
    }
    else{
        console.log("crit: "+checkbox);
        //crit += '"' + checkbox + '"'+  ");";
        crit+=checkbox;
    }
    console.log("criteria :"+crit);
    //console.log(test);
    //console.log(`${query}`);
    query = '%'+query+'%'
    //query+=crit;
    var sql = "SELECT * FROM movie WHERE movieName LIKE "+mysql.escape(query)+" AND movieType REGEXP" + mysql.escape(crit);
    console.log(sql);
    //console.log(query);
    dbconn.query(sql,function(error,results){
        if (error) throw error;
        console.log({data: results})
        return res.send({error: false, data: results, message: "Movie retrieved"})
    })
});

/**
 * view movie
 * method: GET
 * test: localhost:3030/movies
 */
router.get('/movies', function (req, res) {
    dbconn.query('SELECT * FROM movie', function (error, results) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'Movie list.' });});
});


/**
 * view user
 * method: GET
 * test: localhost:3030/users
 */

router.get('/users', function (req, res) {
    dbconn.query('SELECT * FROM user_', function (error, results) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'User list.' });});
});


/**
 * search movie by titleID
 * test: localhost:3030/13651628
 * method: GET
 */
router.get('/title/:movieID', function(req,res){
    let movieID = req.params.movieID;
    console.log(req.body);
    dbconn.query("SELECT * FROM movie WHERE movieID LIKE?",[movieID],function(error,results){
        if (error) throw error;
        console.log({data: results});
        return res.send({error: false,data: results, messege: "Movie retrieved"})
    })
});
/**
 * search user by userID
 * test: localhost:3030/search-user/421233
 */
router.get('/search-user/:id',function(req,res){
    let userID = req.params.id;
    console.log(req.body);
    //res.send(`query = ${query}`);
    console.log(`${userID}`);
    userID = '%'+userID+'%'
    //console.log(query);
    dbconn.query("SELECT * FROM user_ WHERE userID LIKE ?",[userID],function(error,results){
        if (error) throw error;
        console.log({data: results})
        return res.send({error: false, data: results, message: "User retrieved"})
    })
    //return dbconn.query("SELECT * FROM movie WHERE movieName LIKE ?",[query]);
});


/**
 * insert user
 * test: localhost:3030/ins-user
 * method: POST
 * put this in body: raw JSON
 {
    "user":{
        "userID" : 104142,
        "username" : "nnloat",
        "u_password" : "123456789",
        "email" : "nno1212@gmail.com",
        "firstname" : "Oatty",
        "lastname": "Oat",
        "middlename" : null,
        "DateOfBirth" : "1990-2-1",
        "gender" : "M",
        "bio": null

    }
}
 * 
 */
router.post('/ins-user', function (req, res) {
    let user = req.body.user;
    console.log(user);
    if (!user) {
    return res.status(400).send({ error: true, message: 'Please provide user information' });
    }
    dbconn.query("INSERT INTO user_ SET ? ", user, function (error, results) {
    if (error) throw error;
    return res.send({error: false, data: results.affectedRows, message: 'New user has been added successfully.'});
    });
});
/**
 * insert movie
 * test: localhost:3030/ins-mov
 * method : POST
 * put this in body: raw JSON
 * 
{
    "movie":{
        "movieID" :"2625030",
        "IMDB_rating" : 7.6,
        "movieName" : "New World",
        "countryID" : 101256,
        "movieDescripiton" : "An undercover cop finds it difficult to play both a cop and a goon.",
        "movieType": "movie"
    }
}
 */
router.post('/ins-mov', function (req, res) {
    let movie = req.body.movie;
    //console.log(movie);
    if (!movie) {
    return res.status(400).send({ error: true, message: 'Please provide movie information' });
    }
    dbconn.query("INSERT INTO movie SET ? ", movie, function (error, results) {
    if (error) throw error;
    return res.send({error: false, data: results.affectedRows, message: 'New movie has been added successfully.'});
    });
});

/**
 * update movie
 * test: localhost:3030/upd-movie
 * method: PUT
 * update movie name from "New World" to "New World updated"
 * put this in body: raw JSON
{
    "movie":{
        "movieID" :"2625030",
        "IMDB_rating" : 7.6,
        "movieName" : "New World updated",
        "countryID" : 101256,
        "movieDescripiton" : "An undercover cop finds it difficult to play both a cop and a goon.",
        "movieType": "movie"
    }
}
 * 
 */
router.put('/upd-movie', function (req, res) {
    let movieID = req.body.movie.movieID;
    let movie = req.body.movie;
    if (!movieID || !movie) {
        return res.status(400).send({ error: movie, message: 'Please provide movie information!!' });
    }
    dbconn.query("UPDATE movie SET ? WHERE movieID = ?", [movie, movieID], function (error,results) {
    if (error) throw error;
    return res.send({error: false, data: results.affectedRows, message: 'Movie has been updated successfully.'})
    });
});

/**
 * update user
 * test: localhost:3030/upd-user
 * method: PUT
 * update username from "nnloat" to 'nnloatty'
 * put this in body: raw JSON
{
"user":{
        "userID" : 104142,
        "username" : "nnloatty",
        "u_password" : "123456789",
        "email" : "nno1212@gmail.com",
        "firstname" : "Oatty",
        "lastname": "Oat",
        "middlename" : null,
        "DateOfBirth" : "1990-2-1",
        "gender" : "M",
        "bio": null

    }
}
 */
router.put('/upd-user', function (req, res) {
    let userID = req.body.user.userID;
    let user_ = req.body.user;
    if (!userID || !user_) {
        return res.status(400).send({ error: user_, message: 'Please provide user information!!' });
    }
    dbconn.query("UPDATE user_ SET ? WHERE userID = ?", [user_, userID], function (error,results) {
    if (error) throw error;
    return res.send({error: false, data: results.affectedRows, message: 'User has been updated successfully.'})
    });
});

/**
 * delete user by userID
 * test: localhost:3030/user
 * method: DELETE
 * put this in body: raw JSON
 * 
{
    "userID": 104142
}
 */
router.delete('/user', function (req, res) {
    let userID = req.body.userID;
    if (!userID) {
        return res.status(400).send({ error: true, message: 'Please provide userID' });
    }
    dbconn.query('DELETE FROM user_ WHERE userID = ?', [userID], function (error, results)
    {
    if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'User has been deleted successfully.' });
    });
});

/**
 * delete movie by movieID
 * test: localhost:3030//movie
 * method: DELETE
 * put this in body: raw JSON
 * 
{
    "movieID": "2625030"
}
 */
router.delete('/movie', function (req, res) {
    let movieID = req.body.movieID;
    if (!movieID) {
        return res.status(400).send({ error: true, message: 'Please provide movieID' });
    }
    dbconn.query('DELETE FROM movie WHERE movieID = ?', [movieID], function (error, results)
    {
    if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'Movie has been deleted successfully.' });
    });
});


