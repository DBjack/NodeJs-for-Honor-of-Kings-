module.exports = (options) => {
    const assert = require("http-assert");
    const jwt = require("jsonwebtoken");
    const AdminUser = require("../models/AdminUser");

    return async(req, res, next) => {
        if (req.baseUrl !== "/admin/api/rest/adminUser") {
            const token = String(req.headers.authorization || "");
            console.log(token, 123);
            assert(token, 422, "请先登录");
            const { id } = jwt.verify(token, req.app.get("secret"));
            assert(id, 422, "请先登录");
            req.user = await AdminUser.findById(id);
            assert(req.user, 422, "请先登录");
        }
        await next();
    };
};