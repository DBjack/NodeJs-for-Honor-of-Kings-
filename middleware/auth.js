module.exports = (options) => {
    const assert = require("http-assert");
    const jwt = require("jsonwebtoken");
    const AdminUser = require("../models/AdminUser");

    return async(req, res, next) => {
        if (req.baseUrl !== "/admin/api/rest/adminUser") {
            const token = String(req.headers.authonzation || "");
            assert(token, 401, "请先登录");
            const { id } = jwt.verify(token, req.app.get("secret"));
            assert(id, 401, "请先登录");
            console.log(id, "id");
            req.user = await AdminUser.findById(id);
            console.log(req.user);
            assert(req.user, 401, "请先登录");
        }
        await next();
    };
};