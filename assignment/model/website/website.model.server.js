/**
 * Created by Ashton on 3/13/2017.
 */
module.exports = function (app) {

    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;
    var model = null;
    var WebsiteSchema = require('./website.schema.server')();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        deleteWebsiteAndChildren: deleteWebsiteAndChildren,
        setModel: setModel
    };

    return api;

    function createWebsiteForUser(userId, website) {
        return WebsiteModel.create({
            _user: userId,
            name: website.name,
            description: website.description
        })
            .then(function(website){
                    return model.UserModel
                        .findUserById(userId)
                        .then(function (user) {
                            user.websites.push(website._id);
                            website.save();
                            user.save();
                            return website;
                        }, function (error) {
                            return error;
                        })
                },
                function(error){
                    return error;
                });
    }

    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find({_user: userId});
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);
    }

    function updateWebsite(websiteId, website) {
        return WebsiteModel.update({_id: websiteId}, {$set: {
            name: website.name,
            description: website.description
        }});
    }

    function deleteWebsite(websiteId){
        return WebsiteModel.findOne({_id:websiteId}).populate('_user').then(function (website) {
            website._user.websites.splice(website._user.websites.indexOf(websiteId),1);
            website._user.save();
            return deleteWebsiteAndChildren(websiteId);
        }, function (error) {
            return error;
        });
    }

    function recursiveDelete(pagesOfWebsite, websiteId) {
        if(pagesOfWebsite.length == 0){
            return WebsiteModel.remove({_id: websiteId})
                .then(function (response) {
                    if(response.result.n == 1 && response.result.ok == 1){
                        return response;
                    }
                }, function (error) {
                    return error;
                });
        }

        return model.PageModel.deletePageAndChildren(pagesOfWebsite.shift())
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return recursiveDelete(pagesOfWebsite, websiteId);
                }
            }, function (error) {
                return error;
            });
    }

    function deleteWebsiteAndChildren(websiteId){
        return WebsiteModel.findById({_id: websiteId}).select({'pages':1})
            .then(function (website) {
                var pagesOfWebsite = website.pages;
                return recursiveDelete(pagesOfWebsite, websiteId);
            }, function (error) {
                return error;
            });
    }

    function setModel(_model) {
        model = _model;
    }
};