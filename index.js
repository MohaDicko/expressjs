const express = require("express");
const app = express();
const path = require("path");

// middelwarre de vérification jour et heure

const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send(
      "<h1> Our App is only availabe from Monday to Friday , 9 AM to 5 PM </h1>"
    );
  }
};

// set the view engine EJS

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//serve static files ...
app.use(express.static(path.join(__dirname, "public")));


app.use(checkWorkingHours)

app.get('/', (req, res) => {
    res.render('home');
    
})

app.get('/services', (req, res) => {
    res.render('services');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

const PORT = 8000

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})