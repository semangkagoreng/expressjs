import express from "express";

const app = express();
const port = process.env.port || 3000;

const mockUsers = [
            {id:1,name:"Dewa",age:22,job:"backend developer"},
            {id:2,name:"Ipin",age:25,job:"frontend developer"},
            {id:3,name:"agung",age:24,job:"database design"}
        ]

app.get('/',(req, res) => {
    res.status(201).send({msg:"Hello from express.js"});
})

app.get('/api/users', (req,res) => {
res.status(201).send(
    {
        success:true,
        data: mockUsers        
    }
    )
})

app.get('/api/products', (req,res) => {
    res.status(200).send(
        {
            success:true,
            data:[
                {products:"laptop",price:5000},
                {products:"keyboard", price:500},
                {products:"mouse", price:200}
            ]
        }
    )
})

app.get('/api/users/:id', (req,res) => {
    const id = parseInt(req.params.id);
    
    const users = mockUsers.find((user) => {return user.id === id})
    if(isNaN(id)){
        return res.status(400).send(
            {
                status:false,
                msg:"id must be number"
            }
        )
    }
    if(!users){
        return res.status(404).send(
            {
                status:false,
                msg:"user not found"
            }
        )
    }
    res.status(200).send(
        {
            status:true,
            data: users
        }
    )
    
})

app.listen(port, () => {
    console.log(`listen on port ${port}`)
})