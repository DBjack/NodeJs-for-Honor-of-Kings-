const jwt = require("jsonwebtoken");
const assert = require("http-assert");
const AdminUser = require("../models/adminUser");
module.exports = (options) => {
    return async(req, res, next) => {
        let token = req.headers.authonzation;
        assert(token, 422, "请先登录");
        let { id } = jwt.verify(token, req.app.get("secret"));
        assert(id, 422, "请先登录");
        req.user = await AdminUser.findById(id);
        assert(req.user, 422, "请先登录");
        next();
    };
};