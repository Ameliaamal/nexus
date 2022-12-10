const express = require('express'); 
const path = require('path'); 
const bodyParser = require('body-parser'); 
const { engine } = require('express-handlebars'); 
const { getConnection } = require('./db/db'); 
const userService = require('./users_module/service');
const cookieParser = require("cookie-parser");
const { auth, adminGaurd } = require('./users_module/auth')



const app = express(); 
const port = 3000; 


app.engine('handlebars', engine());
app.set('views', './views')
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, './client/public'))) 
app.use(bodyParser.json()) 
app.use(cookieParser());


app.get('/', (req, res) => {
    console.log('accessing route /, METHOD = GET');
    
    res.sendFile(path.join(__dirname, '/client/index.html')); 
})

app.get('/login', (req, res) => {
    console.log('accessing route /login, METHOD = GET');
    res.sendFile(path.join(__dirname, '/client/public/login.html'));
})

app.post('/login', async (req, res) => {
    const body = req.body

    if(!body.email || !body.password || !body.email.includes('@') || body.password.length === 0) {
        res.status(400).json({
            error: "Invalid User Information, Please check your input"
        })
        return;
    }

    try {
       
        const { userId, token } = await userService.login(body)
        if(userId && token) {
            res.cookie('token', token, {maxAge: 900000});
            res.status(200).json({
                userId,
                token
            })
        }
    } catch (error) {
        console.log('caught error in controller')
        console.log(error)
        res.status(error.code).json({
            error: error.msg
        })
    }


})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/signup.html'))
})

app.post('/signup', async (req, res) => {
    try {
        await userService.storeUser(req.body)
    } catch(err) {
        res.status(err.code).json({
            error: err.msg
        })
        return
    }
   
    res.status(200).json({
        message: "user created sucessfully"
    })
})

app.get('/postAjob', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/postAjob.html'))
})

app.post('/postAjob', async (req, res) => {

})

////app.get('/user/:email', (req, res) => {
   // const user = userService.getUser(req.params.email)
   // res.render('profile', {
       // layout: 'profile',
       // name: user.name, 
       // email: user.email,
       // about: user.about,
       // field: user.field,
   // })
//})

app.get('/dashboard', auth, async (req, res) => {
    try {
        const user = await userService.getUserById(req.userId)
        res.render('dashboard', {
            layout: 'profile',
            name: user.name, 
            email: user.email,
            course: user.course,
            address: user.address,
            dob: user.dob,
            bio: user.bio,
        })
    } catch(error) {
        res.redirect('/login')
        res.end()
        return
    }
})

app.get('/users', auth, adminGaurd, async (req, res) => {
    try {
        const users = await userService.getUsers()
        res.render('users', {
            layout: false,
            users,
        })
    } catch (error) {
        res.status(error.code).json({
            error: error.msg
        })
    }
})


app.listen(port, async () => {
    console.log('Listening on port: ' + port);
    await getConnection()
    console.log('connected to DB')
})


module.exports = app;