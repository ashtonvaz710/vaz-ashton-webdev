/**
 * Created by Ashton on 2/22/2017.
 */

module.exports = function (app, WebsiteModel) {

    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findAllWebsitesForUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);

    function createWebsite(req, res) {
        var newWebsite = req.body;
        var userId = req.params.uid;
        WebsiteModel
            .createWebsiteForUser(userId, newWebsite)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.send(error);
            });
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.uid;
        WebsiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites)
            }, function (error) {
                res.send(error);
            });
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.wid;
        WebsiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.send(error);
            })
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.wid;
        var newWebsite = req.body;
        WebsiteModel
            .updateWebsite(websiteId, newWebsite)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.send(error);
            })
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.wid;
        WebsiteModel
            .deleteWebsite(websiteId)
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(404);
                }
            }, function (error) {
                res.sendStatus(404);
            });
    }
};