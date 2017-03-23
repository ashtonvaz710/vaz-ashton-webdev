/**
 * Created by Ashton on 3/13/2017.
 */
module.exports = function () {
    // require("./user/user.schema.server")(app);
    // require("./website/website.schema.server")(app);
    // require("./page/page.schema.server")(app);
    // require("./widget/widget.schema.server")(app);

    var UserModel = require("./user/user.model.server")();
    var WebsiteModel = require("./website/website.model.server")();
    var PageModel = require("./page/page.model.server")();
    var WidgetModel = require("./widget/widget.model.server")();

    var model = {
        UserModel: UserModel,
        WebsiteModel: WebsiteModel,
        PageModel: PageModel,
        WidgetModel: WidgetModel
    };

    UserModel.setModel(model);
    WebsiteModel.setModel(model);
    PageModel.setModel(model);
    WidgetModel.setModel(model);

    return model;
};