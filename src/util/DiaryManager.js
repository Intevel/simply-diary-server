var database = require("quick.db");
const {
	HTTPError
} = require("lambert-server")
var randomstring = require("randomstring");

class DiaryManager {

	static async createDiary(title) {
		var diaryCode = randomstring.generate({
			length: 6,
			charset: 'alphabetic'
		});
		diaryCode = await DiaryManager.generateUniqueDiaryCode(diaryCode);

		const newDiary = await database.set(`diary_${diaryCode}`, {
			title: title,
			code: diaryCode,
			posts: [],
			created_at: new Date()
		});

		return newDiary;
	}

	static async createDiaryPost(code, content) {
		const post = {
			code,
			content,
			created_at: new Date(),
			date_string: new Date().toDateString()
		};

		var posts = await database.get(`diary_${code}.posts`) || [];
		await posts.push(post);

		var databaseEntry = await database.set(`diary_${code}.posts`, posts)
		return post;
	}

	static async deleteDiaryPost(code, timestamp){
		var posts = await database.get(`diary_${code}.posts`);
		if(!posts) return false;
		posts = posts.filter(post => post.created_at !== timestamp);
		await database.set(`diary_${code}.posts`, posts);
		return posts;
	}

	static async fetchFullDiary(code){
		var diary = await database.get(`diary_${code}`);
		return diary;
	}

	static async fetchDiaryPosts(code) {
		var posts = await database.get(`diary_${code}.posts`) || [];

		return posts;
	}

	static async generateUniqueDiaryCode(code) {
		let diary = await database.fetch(`diary_${code}`);
		if (diary) {
			code = randomstring.generate({
				length: 6,
				charset: 'alphabetic'
			});
			return DiaryManager.generateUniqueDiaryCode(code);
		}
		console.log("[LOG] Diary Code is unique " + code);
		return code;
	}

}

module.exports = DiaryManager;
