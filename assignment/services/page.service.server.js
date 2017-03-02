/**
 * Created by Ashton on 2/22/2017.
 */

module.exports = function (app) {

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findAllPagesForWebsite);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function createPage(req, res) {
        var websiteId = req.params.wid;
        var newPage = req.body;
        newPage._id = (new Date()).getTime() + "";
        newPage.websiteId = websiteId;
        pages.push(newPage);
        res.json(newPage);
        // var newWebsite = req.body;
        // newWebsite._id = (new Date()).getTime() + "";
        // newWebsite.developerId = req.params.uid;
        // websites.push(newWebsite);
        // res.json(newWebsite);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.wid;
        var sites = [];
        for(var p in pages) {
            if (pages[p].websiteId === websiteId) {
                sites.push(pages[p]);
            }
        }
        res.send(sites);
    }

    function findPageById(req, res) {
        var pageId = req.params.pid;
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                res.json(pages[p]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updatePage(req, res) {
        var pageId = req.params.pid;
        var newPage = req.body;
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                pages[p].name = newPage.name;
                pages[p].description = newPage.description;
                res.json(pages[p]);
                return;
            }
        }
    }

    function deletePage(req, res) {
        var pageId = req.params.pid;
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};