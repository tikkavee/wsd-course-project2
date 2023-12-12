import * as quizService from "../../services/quizService.js";

const listQuizTopics = async ({ render }) => {
    render("quiz.eta", { quiz: await quizService.getAllTopics() });
};


const listRandomQuestion = async ({ request, response, render}) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const randomQuestion = await quizService.getRandomQuestion(urlParts[2]);
    console.log("tässä on kysymykset"+randomQuestion);
    if(randomQuestion && randomQuestion.length > 0 ) {
       
        response.redirect("/quiz/"+urlParts[2]+"/questions/"+randomQuestion[0].id);

    } else {
        console.log("eilöytynyt kysymyksiä");
        render("noQuestionsInTheTopic.eta");

        

    };

    



};

const renderRandomQuestion = async ({ request, render}) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const tId = urlParts[2];
    const qId = urlParts[4];

    render("randomquiz.eta", { quiz: await quizService.getQuizWithId(tId, qId), aOptions: await quizService.listQuestionAnswers(qId), topic: await quizService.getTopicById(tId)});
};

const addQuestionAnswer = async ({request, user, response}) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const tId = urlParts[2];

    const qId = urlParts[4];
    const oId = urlParts[6];
    
    await quizService.addQuestionAnswer(
        user.id,
        qId,
        oId,

    );
    console.log("lisätty vastaus");
    const rightOrWrong = await quizService.getQuestionAnswerCorrectnes(oId);
    console.log(rightOrWrong[0].is_correct);
    if(rightOrWrong[0].is_correct) {
        response.redirect("/quiz/"+tId+"/questions/"+qId+"/correct");
    } else {
        response.redirect("/quiz/"+tId+"/questions/"+qId+"/incorrect");
    };
    

};


const renderCorrect = async ({request, render}) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const tId = urlParts[2];

    render("correctAnswer.eta", {topic: tId});
};



const renderIncorrect = async ({request, render}) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const tId = urlParts[2];
    const qId = urlParts[4];
    
   
    render("wrongAnswer.eta", {topic: tId, trueAnswer: await quizService.getTrueAnswer(qId)});
}





export { listQuizTopics, listRandomQuestion, renderRandomQuestion, addQuestionAnswer, renderCorrect, renderIncorrect };