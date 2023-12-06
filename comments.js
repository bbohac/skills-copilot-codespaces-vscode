// Create web server
// 1. Install express
// 2. Import express
// 3. Create an instance of express
// 4. Create a route
// 5. Start the server

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let comments = [
    {
        id: 1,
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: 2,
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: 3,
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, T
    },
    {
        id: 4,
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
];

app.get('/comments', (req, res) => {
    res.send(comments);
});

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment });
    res.send('POSTED');
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === Number(id));
    res.send(comment);
});

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === Number(id));
    foundComment.comment = newCommentText;
    res.send('UPDATED!');
});

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== Number(id));
    res.send('DELETED!');
});

app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}`);
});