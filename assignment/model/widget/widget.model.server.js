/**
 * Created by Ashton on 3/13/2017.
 */
module.exports = function (model) {

    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;
    var model = null;
    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        deleteWidgetOfPage: deleteWidgetOfPage,
        reorderWidget: reorderWidget,
        setModel: setModel
    };

    return api;

    function createWidget(pageId, widget) {
        return WidgetModel.create({
            _page: pageId,
            type: widget.type,
            name: widget.name,
            text: widget.text,
            placeholder: widget.placeholder,
            description: widget.description,
            url: widget.url,
            width: widget.width,
            height: widget.height,
            rows: widget.rows,
            size: widget.size,
            class: widget.class,
            icon: widget.icon,
            deletable: widget.deletable,
            formatted: widget.formatted
        })
            .then(function (widget) {
                return model.PageModel.findPageById(pageId)
                    .then(function (page) {
                        widget._page = page._id;
                        page.widgets.push(widget._id);
                        widget.save();
                        page.save();
                        return widget;
                    }, function (error) {
                        return error;
                    });
            }, function (error) {
                return error;
            });
    }

    function findAllWidgetsForPage(pageId){
        return model.PageModel
            .findPageById(pageId)
            .then(function (page) {
                var widgetsOfPage = page.widgets;
                var numberOfWidgets = widgetsOfPage.length;
                var widgetCollectionForPage = [];

                return getWidgetsRecursively(numberOfWidgets, widgetsOfPage, widgetCollectionForPage);
            }, function (error) {
                return error;
            });
    }

    function getWidgetsRecursively(count, widgetsOfPage, widgetCollectionForPage) {
        if(count == 0){
            return widgetCollectionForPage;
        }

        return WidgetModel.findById(widgetsOfPage.shift()).select('-__v')
            .then(function (widget) {
                widgetCollectionForPage.push(widget);
                return getWidgetsRecursively(--count, widgetsOfPage, widgetCollectionForPage);
            }, function (error) {
                return error;
            });
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, newWidget) {
        return WidgetModel.update({_id: widgetId}, {$set: newWidget});
    }

    function deleteWidget(widgetId){
        return WidgetModel.findById(widgetId).populate('_page').then(function (widget) {
            widget._page.widgets.splice(widget._page.widgets.indexOf(widgetId),1);
            widget._page.save();
            if(widget.type == "IMAGE"){
                deleteUploadedImage(widget.url);
            }
            return WidgetModel.remove({_id:widgetId});
        }, function (error) {
            return error;
        });
    }

    function deleteWidgetOfPage(widgetId) {
        return WidgetModel.findById(widgetId)
            .then(function (widget) {
                if(widget.type == "IMAGE"){
                    deleteUploadedImage(widget.url);
                }
                return WidgetModel.remove({_id: widgetId});
            }, function (error) {
                return error;
            });
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

    function reorderWidget(pageId, start, end) {
        return model.PageModel
            .findPageById(pageId)
            .then(function (page) {
                page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
                page.save();
                return 200;
            }, function (error) {
                return error;
            });
    }

    function setModel(_model) {
        model = _model;
    }
};