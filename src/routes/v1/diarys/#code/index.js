const { Router } = require("express")
const { HTTPError, check } = require("lambert-server")
const rateLimit = require("express-rate-limit");
const DiaryManager = require("../../../../util/DiaryManager");
const router = Router();

router.get("/", async (req, res) => {
	var code = req.params.code;
	var diary = await DiaryManager.fetchFullDiary(code)
	
	if(!diary) throw new HTTPError("Not found", 404)
	res.status(200).json(diary)
});


module.exports = router;
