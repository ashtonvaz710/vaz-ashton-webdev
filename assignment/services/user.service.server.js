/**
 * Created by Ashton on 2/22/2017.
 */

module.exports = function(app, UserModel) {

    app.post("/api/user", createUser);
    app.get("/api/user/:uid", findUserById);
    app.get("/api/user", findUser);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);

    function createUser(req, res) {
        var newUser = req.body;
        UserModel
            .createUser(newUser)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.uid;
        UserModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(404).send(error);
            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(req, res);
        }
        else if (username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        UserModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.send(error)
            });
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;

        UserModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user) {
                    res.json(user);
                }
                else {
                    res.sendStatus(404);
                }
            }, function () {
                res.sendStatus(404)
            });
    }

    function updateUser(req, res){
        var userId = req.params.uid;
        var newUser = req.body;
        UserModel
            .updateUser(userId, newUser)
            .then(function (status) {
                res.send(status);
            }, function (error) {
                res.send(error);
            })
    }

    function deleteUser(req, res) {
        var userId = req.params.uid;
        UserModel
            .deleteUser(userId)
            .then(function (error) {
                res.json(error);
            })
    }
};
