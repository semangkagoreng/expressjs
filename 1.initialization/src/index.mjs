import express from "express";

const app = express();
const port = process.env.port || 3000;

app.get('/',(req, res) => {
    res.status(201).send({msg:"Hello from express.js"});
})

app.get('/api/users', (req,res) => {
res.status(201).send(
    [
        {name:"Dewa",age:22,job:"backend developer"},
        {name:"Ipin",age:25,job:"frontend developer"},
        {name:"agung",age:24,job:"database design"}
    ]
    )
})

app.listen(port, () => {
    console.log(`listen on port ${port}`)
})