import express from "express";

const app = express();
app.use(express.json());
const port = process.env.port || 3000;

app.get("/", (req, res) => {
  res.status(201).send({ msg: "Hello from express.js" });
});

const mockUsers = [
  { id: 1, name: "Dewa", age: 22, job: "backend developer" },
  { id: 2, name: "Ipin", age: 25, job: "frontend developer" },
  { id: 3, name: "agung", age: 24, job: "database design" },
];

app.get("/api/users", (req, res) => {
  const {
    query: { filter, value },
  } = req;

  if (!filter && !value) return res.send(mockUsers);
  if (filter && value) {
    value.toLowerCase();
    const filtered = mockUsers.filter((user) => {
      return user[filter].toLowerCase().includes(value);
    });
    return res.send(filtered);
  }
});

app.get("/api/products", (req, res) => {
  res.status(200).send({
    success: true,
    data: [
      { products: "laptop", price: 5000 },
      { products: "keyboard", price: 500 },
      { products: "mouse", price: 200 },
    ],
  });
});

app.post("/api/users", (req, res) => {
  const { body } = req;
  const newUsers = {
    id: mockUsers.length + 1,
    ...body,
  };
  try {
    mockUsers.push(newUsers);
    res.status(201).send({
      status: true,
      data: newUsers,
      msg: "user created successfully",
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      msg: `internal server error ${e}`,
    });
  }
});

app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const users = mockUsers.find((user) => {
    return user.id === id;
  });
  if (isNaN(id)) {
    return res.status(400).send({
      status: false,
      msg: "id must be number",
    });
  }
  if (!users) {
    return res.status(404).send({
      status: false,
      msg: "user not found",
    });
  }
  res.status(200).send({
    status: true,
    data: users,
  });
});

app.put('/api/users/:id', (req,res) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)) return res.sendStatus(400);
    const users = mockUsers.find((user) => {
        return user.id === id;
    })

    if(!users) return res.sendStatus(404);

    const {body} = req;
    const updatedUsers = {
        id: id,
        ...body
    }
    mockUsers[id - 1] = updatedUsers;
    res.send(
        {
            status:true,
            data: updatedUsers
        }
    )
})

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
