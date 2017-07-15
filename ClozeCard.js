var ClozeCard = function(text, cloze) {
	this.cloze = cloze;
	this.partial = text.replace(cloze, "...");
	this.fullText = text;
	this.type = 'cloze';
}

module.exports = ClozeCard;