const express = require('express');
const authRoute = express.Router();

authRoute.route('/login').post(function (req, res) {
    if(req.body._username=="admin" && req.body._password=="admin"){
    
        res.status(200).send("Success");
      

    }else{
        res.status(400).send("Login Failed");
    }
});


module.exports = authRoute;