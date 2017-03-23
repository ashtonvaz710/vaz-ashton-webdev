/**
 * Created by Ashton on 2/22/2017.
 */

module.exports = function (app, PageModel) {

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findAllPagesForWebsite);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);


    function createPage(req, res) {
        var websiteId = req.params.wid;
        var newPage = req.body;
        PageModel
            .createPage(websiteId, newPage)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.send(error);
            });
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.wid;
        PageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (websites) {
                res.json(websites);
            }, function (error) {
                res.send(error);
            });
    }

    function findPageById(req, res) {
        var pageId = req.params.pid;
        PageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.send(error);
            });
    }

    function updatePage(req, res) {
        var pageId = req.params.pid;
        var newPage = req.body;
        PageModel
            .updatePage(pageId, newPage)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.send(error);
            });
    }

    function deletePage(req, res) {
        var pageId = req.params.pid;
        PageModel
            .deletePage(pageId)
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }
};