const express = require('express');
const { reset } = require('nodemon');
const app = express();

app.listen(process.env.PORT || 5000, () => console.log('Running...'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => res.send('Node JS'));

let users = [
    {id: 1, name: 'kolab', password: '334'},
    {id: 2, name: 'romdul', password: '223'},
    {id: 3, name: 'bopha', password: '112'}
];

app.get('/api/users', (req, res) => res.send(users));

app.get('/api/users/:id', (req, res) => {
    let id = req.params.id;
    // let index = -1;

    // findIndex();
    let index = users.findIndex(user => user.id === parseInt(id));

    // for (let user of users){
    //     if (user.id === parseInt(id)){
    //         index = user.id - 1;
    //     }
    // }

    if (index >= 0){
        let user = users[index];
        res.send([user]);
    }else{
        res.status(404);
        res.send({error: 'User id not found'});
    }    
});

app.post('/api/users', (req, res) => {
    console.log(req.body);

    if (!req.body.password){
        res.status(404);
        return res.send({error: 'Password Required'});
    }

    let user = {
        id: users.length + 1,
        name: req.body.name,
        password: req.body.password
    }

    users.push(user);
    res.send(users);
});

app.put('/api/users/:id', (req, res) => {
    let id = req.params.id;
    let username = req.body.name;
    let pass = req.body.password;

    // findIndex();
    let index = users.findIndex(user => user.id === parseInt(id));

    if (index >= 0){
        let user = users[index];
        user.name = username;
        user.password = pass;
        res.send(user);
    }else{
        res.status(404);
        res.send({error: 'User id not found'});
    }    
});

app.delete('/api/users/:id', (req, res) => {
    let id = req.params.id;
    let index = users.findIndex(user => user.id === parseInt(id));

    if (index >= 0){
        users.splice(index, 1);
        res.send({Message: 'Deleted successfully'});
    }else{
        res.status(404);
        res.send({error: 'User id not found'})
    }
});
