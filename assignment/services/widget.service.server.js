/**
 * Created by Ashton on 2/22/2017.
 */

module.exports = function (app) {

    var multer = require('multer');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage: storage});
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function uploadImage(req, res) {
        var pageId = null;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var myFile = req.file;
        var destination = myFile.destination; // folder where file is saved to

        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i].width = width;
                widgets[i].url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
                pageId = widgets[i].pageId;
            }
        }
        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
    }


    function createWidget(req, res) {
        var newWidget = req.body;
        var pageId = req.params.pid;
        newWidget._id = (new Date()).getTime() + "";
        newWidget.pageId = pageId;
        widgets.push(newWidget);
        res.json(newWidget);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pid;
        var widgetList = [];
        for(var wg in widgets) {
            if(widgets[wg].pageId === pageId) {
                widgetList.push(widgets[wg]);
            }
        }
        res.json(widgetList);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.wgid;
        for(var wg in widgets) {
            if(widgets[wg]._id == widgetId) {
                res.json(widgets[wg]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.wgid;
        var newWidget = req.body;
        for(var wg in widgets) {
            if(widgets[wg]._id == widgetId) {
                if(newWidget.widgetType == "HEADER" || newWidget.widgetType == "HTML") {
                    widgets[wg].size = newWidget.size;
                    widgets[wg].text = newWidget.text;
                }
                else if(newWidget.widgetType == "IMAGE" || newWidget.widgetType == "YOUTUBE") {
                    widgets[wg].width = newWidget.width;
                    widgets[wg].url = newWidget.url;
                }
                res.json(widgets[wg]);
            }
        }
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.wgid;
        for(var wg in widgets) {
            if(widgets[wg]._id === widgetId) {
                widgets.splice(wg, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

};