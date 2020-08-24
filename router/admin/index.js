module.exports = (app) => {
    const express = require("express");

    const router = express.Router({
        // 合并路由参数
        mergeParams: true,
    });
    let modelName;

    // 查询所有
    router.get("/", async(req, res) => {
        const Model = require(`../../models/${modelName}`);
        const model = await Model.find().populate("parent").limit(10);
        res.send(model);
    });

    // 查询单个详情
    router.get("/:id", async(req, res) => {
        const Model = require(`../../models/${modelName}`);
        const model = await Model.findById(req.params.id);
        res.send(model);
    });

    // 添加分类
    router.post("/", async(req, res) => {
        const Model = require(`../../models/${modelName}`);
        const model = await Model.create(req.body);
        res.send(model);
    });

    // 编辑分类
    router.put("/:id", async(req, res) => {
        const Model = require(`../../models/${modelName}`);
        const model = await Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    });

    // 删除分类
    router.delete("/:id", async(req, res) => {
        const Model = require(`../../models/${modelName}`);
        const model = await Model.findByIdAndDelete(req.params.id);
        res.send("删除成功");
    });

    app.use(
        "/admin/api/rest/:resource",
        async(req, res, next) => {
            modelName = require("inflection").classify(req.params.resource);
            next();
        },
        router
    );

    const multer = require("multer");
    const upload = multer({ dest: __dirname + "/../../uploads" });
    app.post("/admin/api/upload", upload.single("file"), async(req, res) => {
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file);
    });

    app.post("/admin/api/login", async(req, res) => {
        const { username, password } = req.body;

        const AdminUser = require("../../models/adminUser");
        // 根据用户名查找用户
        const user = await AdminUser.findOne({ username }).select("password");
        console.log(user);
        if (!user) {
            res.status(400).send({
                message: "用户不存在",
            });
        }

        // 校验密码
        const isValid = require("bcrypt").compareSync(password, user.password);
        console.log(isValid);
        if (!isValid) {
            res.status(400).send({
                message: "密码不正确",
            });
        }

        // 生成token
        const token = require("jsonwebtoken").sign(password, app.get("secret"));
        res.send({ token });
    });
};