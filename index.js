const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 4000;

app.use(express.json());

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Doing Task");
  });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

const users = [];

app.post('/signup', (req, res) => {
  const {number,name} = req.body;

  if (!number || !name) {
    return res.status(400).json({ error: 'something is missing' });
  }

  
  let existingUser = null;

for (let i = 0; i < users.length; i++) {
  const user = users[i];

  if (user.number === number) {
    existingUser = user;
    break;
  }
}

  if (existingUser) {
    return res.status(409).json({ error: 'number already registered.' });
  }

  const newUser = {
    number,
    name
  };

  users.push(newUser);
  console.log(users)

const baseURL = 'http://localhost:4000';
const generatedURL = `${baseURL}/${number}/${name}`;
console.log(generatedURL);



  res.json({ message: 'Signup successful!' , link : generatedURL });
});


app.post('/:number/:name', (req, res)=> {
  const number = Number(req.params.number)
  const name = req.params.name;

  console.log(number)
  console.log(name)

  let existingUser = null;

for (let i = 0; i < users.length; i++) {
  const user = users[i];

  if (user.number === number) {
    existingUser = user;
    break;
  }
}

  if (existingUser) {
    res.json({ message: 'Yes, this link was sent by us.' });
  } else {
    res.status(404).json({ error: 'Invalid link.' });
  }
});



// postman:
// post :
// http://localhost:4000/signup
// {
//   "number":1234,
//   "name":"maddy"
// }
// response link will also be post