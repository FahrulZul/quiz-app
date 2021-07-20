export default function Question(question, option, answerKey){
    this.question = question;
    this.option = option;
    this.answerKey = answerKey;
}

Question.prototype.isCorrect = function(guessKey){
    return guessKey === this.answerKey;
}