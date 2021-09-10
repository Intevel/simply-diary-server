const { Router } = require("express")
const { HTTPError, check } = require("lambert-server")
const rateLimit = require("express-rate-limit");
const DiaryManager = require("../../../../util/DiaryManager");
const router = Router();

router.get("/", async (req, res) => {
	var code = req.params.code;
	var diary = await DiaryManager.fetchFullDiary(code)
	var sortedPosts = diary.posts.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
	diary.posts = sortedPosts;
	if(!diary) throw new HTTPError("Not found", 404)
	res.status(200).json(diary)
});


module.exports = router;
