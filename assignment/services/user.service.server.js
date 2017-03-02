/**
 * Created by Ashton on 2/22/2017.
 */

module.exports = function(app) {

    app.post("/api/user", createUser);
    app.get("/api/user/:uid", findUserById);
    app.get("/api/user", findUser);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    function createUser(req, res) {
        var newUser = req.body;
        newUser._id = (new Date()).getTime() + "";
        users.push(newUser);
        res.json(newUser);
    }

    function findUserById(req, res) {
        var userId = req.params.uid;
        for(var u in users) {
            if(users[u]._id === userId) {
                res.send(users[u]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            findUserByCredentials(req, res);
        }
        else if(username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var user = users.find(function (user){
            return user.username == username && user.password == password;
        });
        res.send(user);
    }

    function findUserByUsername(req, res) {
        var user = users.find(function (u){
            return u.username == req.query.username;
        });
        if(user) {
            res.json(user);
        }
        else {
            res.sendStatus(404);
        }
    }

    function updateUser(req, res){
        var userId = req.params.uid;
        var newUser = req.body;
        for(var u in users) {
            if(users[u]._id == userId) {
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                users[u].username = newUser.username;
                users[u].email = newUser.email;
                res.json(users[u]);
                return;
            }
        }
    }

    function deleteUser(req, res) {
        var userId = req.params.uid;
        for(var u in users) {
            if(users[u]._id == userId) {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

};
