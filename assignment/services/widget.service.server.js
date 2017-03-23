/**
 * Created by Ashton on 2/22/2017.
 */

module.exports = function (app, WidgetModel) {

    var multer = require("multer");
    var fs = require("fs");
    var uploadsDirectory = __dirname+"/../../public/uploads";
    var publicDirectory =__dirname+"/../../public";
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            if(!fs.existsSync(uploadsDirectory)){
                fs.mkdir(uploadsDirectory, function(error){
                    if(error) {
                        return error;
                    }
                });
            }
            cb(null, uploadsDirectory);
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now()+ '.' +extension)
        }
    });
    var upload = multer({storage: storage});

    app.post("/api/upload", upload.single('myFile'), uploadImage);

    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);
    app.put("/page/:pid/widget", updateWidgetOrder);

    function createWidget(req, res) {
        var newWidget = req.body;
        var pageId = req.params.pid;
        WidgetModel
            .createWidget(pageId, newWidget)
            .then(function (widget) {
               res.json(widget)
            }, function (error) {
                res.send(error);
            });
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pid;
        WidgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (error) {
                res.send(error);
            })
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.wgid;
        WidgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.send(error);
            });
    }

    function widgetUpdateRequest(widgetId, updatedWidget, res) {
        WidgetModel
            .updateWidget(widgetId, updatedWidget)
            .then(function (response) {
                // if(response.nModified === 1 && response.ok === 1 && response.n === 1){
                if(response.ok === 1 && response.n === 1){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }
    function updateWidget(req, res){
        var widgetId = req.params.wgid;
        var updatedWidget = req.body;

        if(updatedWidget.type == "IMAGE"){
            if(updatedWidget.url.search('http') != -1){
                WidgetModel
                    .findWidgetById(widgetId)
                    .then(function (widget) {
                        if(widget.url != "" && widget.url.search('http') == -1){
                            deleteUploadedImage(widget.url);
                        }
                        widgetUpdateRequest(widgetId, updatedWidget, res);
                    }, function (err) {
                        res.sendStatus(404);
                    });
            }
            else{
                widgetUpdateRequest(widgetId, updatedWidget, res);
            }
        }
        else{
            widgetUpdateRequest(widgetId, updatedWidget, res);
        }
    }
    function deleteUploadedImage(imageUrl) {
        if(imageUrl && imageUrl.search('http') == -1){
            fs.unlink(publicDirectory+imageUrl, function (error) {
                if(error){
                    return error;
                }
            });
        }
    }
    function deleteWidget(req, res){
        var widgetId = req.params.wgid;
        WidgetModel
            .deleteWidget(widgetId)
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    res.sendStatus(200);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }
    function uploadImage(req, res){
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var imageWidget = {
            width: width,
            _id:widgetId
        };

        if(req.file){
            // Make sure file was uploaded
            var myFile = req.file;
            var originalname = myFile.originalname; // File name on user's computer
            var filename = myFile.filename; // new file name in upload folder
            var path = myFile.path; // full path of uploaded file
            var destination = myFile.destination; // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;
            if(imageWidget.url){
                deleteUploadedImage(imageWidget.url);
            }
            imageWidget.url = "/uploads/" + filename;

            WidgetModel
                .updateWidget(widgetId, imageWidget)
                .then(function (response) {
                    if(response.ok === 1 && response.n === 1){
                        res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
                    }
                    else{
                        res.sendStatus(404);
                    }
                }, function (err) {
                    res.sendStatus(404);
                });

        }
        else{
            res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
        }
    }

    function updateWidgetOrder(req, res) {
        var pageId = req.params.pid;
        var startIndex = parseInt(req.query.initial);
        var endIndex = parseInt(req.query.final);
        WidgetModel
            .reorderWidget(pageId, startIndex, endIndex)
            .then(function (response) {
                // Code will be returned
                res.sendStatus(response);
            }, function (error) {
                res.sendStatus(404);
            });
    }
};