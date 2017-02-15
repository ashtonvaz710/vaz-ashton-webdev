/**
 * Created by Ashton on 2/7/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user) {
            var newUser = {
                "_id": (new Date()).getTime(),
                "username": user.username,
                "password": user.password
                //"firstName": website.description,
                //"lastName": website.description
            };
            websites.push(newUser);
        }

        function findUserById(uid) {
            for(var u in users) {
                if( users[u]._id == uid ) {
                    return users[u];
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for(var u in users) {
                if( users[u].username === username) {
                    return users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                if( users[u].username === username &&
                    users[u].password === password ) {
                    return users[u];
                }
            }
            return null;
        }

        function updateUser(uid, newUser) {
            for(var u in users) {
                if( users[u]._id === uid ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    return users[u];
                }
            }
            return null;
        }

        function deleteUser(uid) {
            for(var u in users) {
                if( users[u]._id === uid) {
                    users.splice(u, 1);
                }
            }
        }

    }
})();