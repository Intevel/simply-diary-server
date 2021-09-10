const { Router } = require("express")
const { HTTPError, check } = require("lambert-server")
const DiaryManager = require("../../../util/DiaryManager");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 15
});

const router = Router();
 
router.post("/", check({ title: String }), limiter, async (req, res) => {
	var diary = await DiaryManager.createDiary(req.body.title)
	res.status(200).json(diary).send()
});


module.exports = router;
