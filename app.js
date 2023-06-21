const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }

            }
        ]
    };
    var jsonData = JSON.stringify(data);


    const url = "https://us20.api.mailchimp.com/3.0/lists/016df44a72";

    const options = {
        method: "POST",
        auth: "archana:d26115147ddc93f4b7a41396d1346ca4-us20"
    }



    const request = https.request(url, options, function (response) {

        if(response.statusCode===200){
            res.send("<h1>Successfully subscribed!</h1>");
        }
        else{
            res.send("<h1>Oh! there is some problemin signing you up <h1>");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();
})

app.listen(process.env.PORT||3000, function () {
    console.log("Server is running on port 3000");
});
// api key
// d26115147ddc93f4b7a41396d1346ca4-us20

// listid
// 016df44a72.