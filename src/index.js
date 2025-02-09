const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In memory database
let users = [];

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

//Create New User Using POST
app.post('/users', (req,res) => {
    const {name, email} = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }
    
    const id = uuidv4();
    const newUser = { id, name, email };

    users.push(newUser);
    res.status(201).json(newUser);
});

//Retrieve user using GET
app.get("/users/:id", (req, res) => {
    const{id} = req.params;
    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
});

//Update user using PUT
app.put("/users/:id", (req, res) => {
    const {id} = req.params;
    const {name, email} = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    user.name = name;
    user.email = email;

    res.status(200).json(user);
});

//Delete user using DELETE

app.delete("/users/:id", (req, res) => {
    const {id} = req.params;
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
      }

    users.splice(userIndex, 1);
    res.status(204).send();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});



// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing