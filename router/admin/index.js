module.exports = (app) => {
    const express = require("express");
    const assert = require("http-assert");
    const AdminUser = require("../../models/adminUser");
    const jwt = require("jsonwebtoken");
    const authMiddleware = require("../../middleware/auth");
    const resourceMiddleware = require("../../middleware/resource");
    // 合并路由参数
    const router = express.Router({
        mergeParams: true,
    });

    let modelName;

    /**
     * 资源列表
     */
    router.get("/", async(req, res) => {
        const Model = require(`../../models/${modelName}`);
        const model = await Model.find().populate("parent").limit(10);
        res.send(model);
    });

    /**
     * 资源详情
     */
    router.get("/:id", async(req, res) => {
        const Model = require(`../../models/${modelName}`);
        const model = await Model.findById(req.params.id);
        res.send(model);
    });

    /**
     * 添加资源
     */
    router.post("/", async(req, res) => {
        const Model = require(`../../models/${modelName}`);
        const model = await Model.create(req.body);
        res.send(model);
    });

    /**
     * 编辑资源
     */
    router.put("/:id", async(req, res) => {
        const Model = require(`../../models/${modelName}`);
        const model = await Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    });

    /**
     * 删除资源
     */
    router.delete("/:id", async(req, res) => {
        const Model = require(`../../models/${modelName}`);
        const model = await Model.findByIdAndDelete(req.params.id);
        res.send("删除成功");
    });

    app.use(
        "/admin/api/rest/:resource",
        authMiddleware(),
        resourceMiddleware(),
        router
    );

    /**
     * 上传文件
     */
    const multer = require("multer");
    const upload = multer({ dest: __dirname + "/../../uploads" });
    app.post(
        "/admin/api/upload",
        authMiddleware(),
        upload.single("file"),
        async(req, res) => {
            const file = req.file;
            file.url = `http://localhost:3000/uploads/${file.filename}`;
            res.send(file);
        }
    );

    /**
     * 登录接口
     */
    app.post("/admin/api/login", async(req, res, next) => {
        const { username, password } = req.body;

        // 根据用户名查找用户
        const user = await AdminUser.findOne({ username }).select("+password");
        assert(user, 422, "用户不存在22231");

        // 校验密码
        const isValid = require("bcrypt").compareSync(password, user.password);
        assert(isValid, 422, "密码错误", {});

        // 生成token
        const token = jwt.sign({ id: user._id }, app.get("secret"));
        res.cookie("AUTHONZATION", token);
        res.send({
            code: 1000,
            message: "登录成功",
        });
    });

    // 错误处理函数
    app.use(async(err, req, res, next) => {
        res.status(err.statusCode).send({
            message: err.message,
        });
    });
};