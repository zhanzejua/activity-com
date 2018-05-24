export default {
	urlValidator(val) {
		if(!val) return false;
		return /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(val);
	},
	phoneValidator(val) {
		if(!val) return false;
		return /^[1][3,4,5,7,8][0-9]{9}$/.test(val)
	},
	nameValidator(val) {
		if(!val) return false;
		return /^[a-zA-Z\u4e00-\u9fa5]+$/.test(val);
	},
	addressValidator(val) {
		if(!val) return false;
		return /^[a-zA-Z\u4e00-\u9fa5]+$/.test(val);
	}
}