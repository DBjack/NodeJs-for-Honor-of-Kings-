module.exports = (app) => {
    const router = require("express").Router();

    const mongoose = require("mongoose");
    // const Article = mongoose.model("Article");
    const Category = mongoose.model("Category");

    router.get("/news/init", async(req, res) => {
        const cats = await Category.find().lean();
        const newsTitles = [
            "郑爽张继科空降QQ名人赛，互动观赛赢好礼",
            "《天天酷跑》七周年福利嗨翻，初心不改、携跑未来！",
            "王者零距离 | 满满都是“料”！你关注的问题，策划现场回复了！",
            "狄某有话说 | 嚣张“演员”在线强卖？正义狄某不请自来！",
            "王者风物志 | 共创三分风物，五大赛道等你挥洒才情！",
            "9月15日全服不停机更新公告",
            "9月14日体验服停机更新公告",
            "9月12日体验服停机更新公告",
            "9月11日体验服停机更新公告",
            "9月9日净化游戏环境声明及处罚公告",
            "赛末冲刺享回馈，秋分登录领好礼",
            "时隔五年，廉颇再出皮肤，限时秒杀不容错过！",
            "99公益日参与活动送好礼，廉颇新皮肤限时秒杀",
            "【99公益日-集合，一块做好事！】活动公告",
            "英雄专属梦境限时开启，白露时节好礼来袭",
            "2020年KPL秋季赛9月16日热血开赛，主场地域化全面升级",
            "2020年KPL秋季赛热血来袭，线下售票9月7日12:00开启！",
            "2020年KGL秋季赛选手大名单公布，9月13日该我上场！",
            "2020年KPL秋季赛大名单公布",
            "王者荣耀电竞推出六大措施打造全民参与体验闭环",
        ];
        const newsList = newsTitles.map((title) => {
            return {
                categories: [],
                title: title,
            };
        });
        res.send(newsList);
    });

    app.use("/web/api", router);
};