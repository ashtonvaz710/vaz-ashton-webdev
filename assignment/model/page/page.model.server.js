/**
 * Created by Ashton on 3/13/2017.
 */
module.exports = function (app) {

    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;
    var model = null;
    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        deletePageAndChildren: deletePageAndChildren,
        setModel: setModel
    };

    return api;

    function createPage(websiteId, page) {
        return PageModel.create({
            _website: websiteId,
            name: page.name,
            title: page.title,
            description: page.description
        })
            .then(function (page) {
                return model.WebsiteModel.findWebsiteById(websiteId)
                    .then(function (website) {
                        website.pages.push(page._id);
                        page._website = website._id;
                        website.save();
                        page.save();
                        return page;
                    }, function (error) {
                        return error;
                    });
            }, function (error) {
                return error;
            });
    }

    function findAllPagesForWebsite(websiteId) {
        return PageModel.find({_website: websiteId});
    }

    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }

    function updatePage(pageId, page) {
        return PageModel.update({_id: pageId}, {$set: {
            name: page.name,
            title: page.title,
            description: page.description
        }});
    }

    function deletePage(pageId) {
        // Delete a page, its reference in parent website and its children (widgets)
        return PageModel.findById(pageId).populate('_website').then(function (page) {
            page._website.pages.splice(page._website.pages.indexOf(pageId),1);
            page._website.save();
            return deletePageAndChildren(pageId);
        }, function (err) {
            return err;
        });
    }

    function recursiveDelete(widgetsOfPage, pageId) {
        if(widgetsOfPage.length == 0){
            return PageModel.remove({_id: pageId})
                .then(function (response) {
                    if(response.result.n == 1 && response.result.ok == 1){
                        return response;
                    }
                }, function (error) {
                    return error;
                });
        }

        return model.WidgetModel.deleteWidgetOfPage(widgetsOfPage.shift())
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return recursiveDelete(widgetsOfPage, pageId);
                }
            }, function (error) {
                return error;
            });
    }

    function deletePageAndChildren(pageId) {
        return PageModel.findById({_id: pageId})
            .then(function (page) {
                var widgetsOfPage = page.widgets;
                return recursiveDelete(widgetsOfPage, pageId);
            }, function (err) {
                return err;
            });
    }

    function setModel(_model) {
        model = _model;
    }
};