const { Router } = require("express")
const { HTTPError, check } = require("lambert-server")
const DiaryManager = require("../../../../../util/DiaryManager");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 15
});

const router = Router();

router.get("/", async (req, res) => {
	var code = req.params.code;
	var diaryPosts = await DiaryManager.fetchDiaryPosts(code)
	if(!diaryPosts) throw new HTTPError("Not found", 404)
	res.status(200).json(diaryPosts)
});
 
router.post("/", check({ content: String }), limiter, async (req, res) => {
	var code = req.params.code;
	var diaryPost = await DiaryManager.createDiaryPost(code, req.body.content)
	
	res.status(200).json(diaryPost)
});


module.exports = router;
