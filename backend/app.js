const express = require('express')
const { TodoSchema, UserSchema } = require('./validation')
const { User, Todo } = require('./database')
const { generateToken, validateUser } = require('./middleware')
const port = 3000

const app = express()
app.use(express.json())


app.post('/createUser', async function(req, res){ 
    const body = req.body
    const validateUser = UserSchema.safeParse(body)
    if(!validateUser.success){
        res.status(411).json({
            msg: "Not proper Username or password"
        })
    }
    try {
        const createUser = await User.create(body);
        const token = generateToken({username: body.username}); // jwt token
        console.log(token);

        // Set the token in the headers
        res.headers('Authorization', `Bearer ${token}`);
        
        res.json({
            msg: "User Created",
            createUser 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
})

app.get('/', async function(req, res){ // Home Route
    const username = req.body.username
    const password = req.body.password

    const findUser = await User.findOne({username, password})
    if(findUser == null){
        res.json({
            msg:"User doesnot exist"
        })
    }
    const token = generateToken({username});
    res.headers('Authorization', `Bearer ${token}`);
    res.json({
        msg: "User login done"
    })

})

app.post('/newTodo', async function(req, res){

    const body = req.body
    const validateData = TodoSchema.safeParse({
        title: body.title,
        done: false
    })
    if(!validateData.success){
        res.status(411).json({
            msg: "Incorrect data"
        })
    }
    const newTodo = await User.create({
        title: body.title,
        done: false
    })
    res.json({
        msg: "Todo Created",
        newTodo 
    })
    
    
})

app.get('/todo',validateUser, async function(req, res){
    const id = req.body.id
    try{
        const allTodo = await User.find()
        res.send(findTodo)
    } catch{
        res.send({
            msg:"Not found"
        })
    }

})

app.put('/complete',validateUser, async function(req, res){
    const id = req.body.id
    try{
        const doneTodo = await Todo.updateOne({
            _id: id
        },{
            done: true
        })
        res.send(doneTodo)
    } catch{
        res.send({
            msg:"Not found or some error occured"
        })
    }
})


app.listen(port, ()=> console.log(`Listening on port ${port}`))

