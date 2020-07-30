const express = require("express");
const path = require("path"); 
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.connect('mongodb://localhost/contactFood', {useNewUrlParser: true,useUnifiedTopology:true});


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("we r connected")
});

const contactSchema = new mongoose.Schema({
    FirstName:       String,
    LastName:        String,
    UserName:        String,
    password:        String,
    ConfirmPassword: String,
    email:           String,
    phone:           String,
    address:         String,
  });

  const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{ 
    res.status(200).render('home.pug');
})

app.get('/service', (req, res)=>{ 
    res.status(200).render('service.pug');
})

app.get('/about', (req, res)=>{ 
    res.status(200).render('about.pug');
})

app.get('/delivery', (req, res)=>{ 
    res.status(200).render('delivery.pug');
})

app.get('/catering', (req, res)=>{ 
    res.status(200).render('catering.pug');
})

app.get('/contact', (req, res)=>{ 
    res.status(200).render('contact.pug');
})


app.post('/contact', (req, res)=>{ 
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("item was not save to the database")
    })
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});