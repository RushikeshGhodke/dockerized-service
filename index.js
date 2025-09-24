import express from "express";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
const port = 3000;

let isAuthenticated = false;

app.use(express.urlencoded({ extended: true })); // To parse form data

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/secret', (req, res) => {
    if (!isAuthenticated) {
        res.send(`
      <h1>You are not authenticated</h1>
      <form method="POST" action="/authenticate">
        <label for="username">Enter Username:</label>
        <input type="text" name="username" id="username" required />
        <label for="password">Enter Password :</label>
        <input type="text" name="password" id="password" required />
        <button type="submit">Submit</button>
      </form>
    `);
    } else {
        res.send(`${process.env.SECRET_MESSAGE}`);
    }
});

app.post('/authenticate', (req, res) => {
    const { username, password } = req.body;
    console.log(`Received username & password: ${process.env.USERNAME} & ${process.env.PASSWORD}`);

    if (username === process.env.USERNAME && password === process.env.PASSWORD) {
        isAuthenticated = true;
        res.redirect('/secret');
    } else {
        res.send('Invalid credentials, please try again.');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
