/**
 * Created by Ashton on 2/20/2017.
 */

module.exports = function(app) {
    // var UserModel = require("./model/user/user.model.server")(app);
    // require("./services/user.service.server")(app, UserModel);
    //
    // var WebsiteModel = require("./model/website/website.model.server")(app);
    // require("./services/website.service.server")(app, WebsiteModel);
    //
    // var PageModel = require("./model/page/page.model.server")(app);
    // require("./services/page.service.server")(app, PageModel);
    //
    // var WidgetModel = require("./model/widget/widget.model.server")(app);
    // require("./services/widget.service.server")(app, WidgetModel);

    var models = require('./model/models.server')();
    require("./services/user.service.server.js")(app, models.UserModel);
    require("./services/website.service.server.js")(app, models.WebsiteModel);
    require("./services/page.service.server.js")(app, models.PageModel);
    require("./services/widget.service.server.js")(app, models.WidgetModel);
};