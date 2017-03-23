/**
 * Created by Ashton on 3/13/2017.
 */
module.exports = function (app) {

    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;
    var model = null;
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser,
        setModel: setModel
    };

    return api;

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({username: username}, {password: password});
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    function updateUser(userId, user) {
        return UserModel.update({_id: userId}, {$set: {
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }});
    }
    function deleteUser(userId) {
        return UserModel.findById({_id: userId})
            .then(function (user) {
                var websitesOfUser = user.websites;
                return recursiveDelete(websitesOfUser, userId);
            }, function (err) {
                return err;
            });
    }

    function recursiveDelete(websitesOfUser, userId) {
        if(websitesOfUser.length == 0){
            return UserModel.remove({_id: userId})
                .then(function (response) {
                    if(response.result.n == 1 && response.result.ok == 1){
                        return response;
                    }
                }, function (error) {
                    return error;
                });
        }

        return model.WebsiteModel.deleteWebsiteAndChildren(websitesOfUser.shift())
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return recursiveDelete(websitesOfUser, userId);
                }
            }, function (error) {
                return error;
            });
    }

    function setModel(_model) {
        model = _model;
    }
};