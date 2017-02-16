/**
 * Created by Ashton on 2/7/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", widgetService);

    function widgetService() {
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

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function createWidget(pid, widget) {
            widget._id=(new Date()).getTime();
            widget.pageId=pid;

            widgets.push(widget);
            return angular.copy(widget);
        }

        function findWidgetsByPageId(pid) {
            var widgetList = [];
            for(var wg in widgets) {
                if(widgets[wg].pageId === pid) {
                    widgetList.push(widgets[wg]);
                }
            }
            return angular.copy(widgetList);
        }

        function findWidgetById(widgetId) {
            for(var wg in widgets) {
                if(widgets[wg]._id == widgetId) {
                    return angular.copy(widgets[wg]);
                }
            }
            return null;
        }

        function updateWidget(widgetId, newWidget) {
            for(var wg in widgets) {
                if(widgets[wg]._id === widgetId) {
                    if(newWidget.widgetType == "HEADER" || newWidget.widgetType == "HTML") {
                        widgets[wg].size = newWidget.size;
                        widgets[wg].text = newWidget.text;
                    }
                    else if(newWidget.widgetType == "IMAGE" || newWidget.widgetType == "YOUTUBE") {
                        widgets[wg].width = newWidget.width;
                        widgets[wg].url = newWidget.url;
                        console.log("service, width: "+widgets[wg].width);
                        console.log("service, width: "+newWidget.width);
                    }
                }
            }
        }

        function deleteWidget(wgid) {
            for(var wg in widgets) {
                if(widgets[wg]._id === wgid) {
                    widgets.splice(wg, 1);
                }
            }
        }
    }
})();