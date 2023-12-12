import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import {
    minLength,
    required,
    validate,
  } from "https://deno.land/x/validasaur@v0.15.0/mod.ts";

  const validationRules = {
    questionText: [required, minLength(2)],
  };

  const validationRules2 = {
    optionText: [required, minLength(2)],
  };



  const getQuestionData = async (request) => {
    const data = {
        questionText: "",
        errors: {},
    };
    if(request) {
        const body = await request.body({type: "form"});
        const params = await body.value;
        data.questionText = params.get("question_text");
    };
    return data;
  };






const addQuestion = async ({ request, response, user, render }) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const questionData = await getQuestionData(request);
    const [passes, errors] = await validate(questionData, validationRules);
    if(!passes) {
        questionData.errors = errors;
        render("topicQuestions.eta", {data: questionData.errors, nimi: questionData.questionText, questions: await questionService.listQuestions(urlParts[2]), topic: await topicService.findTopicById(urlParts[2]) });
    } else {
        await questionService.addQuestion(
            user.id,
            urlParts[2],
            questionData.questionText,
        );
        response.redirect("/topics/"+urlParts[2]);

    };


    
};


const viewQuestions = async ({request, render}) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    console.log(urlParts[2]);
    const data = {
        topic: await topicService.topicNameById(urlParts[2]),
    };
    console.log(data);


    render("topicQuestions.eta", {topic: data});

   


};

const listQuestions = async ({ render, request }) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    render("topicQuestions.eta", { questions: await questionService.listQuestions(urlParts[2]), topic: await topicService.findTopicById(urlParts[2]) });

    
};


const getQuestionName = async ({render, request}) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const tId = urlParts[2];
    const qId = urlParts[4];
    console.log(tId);
    console.log(qId);
    render("questionAnswers.eta", {questionName: await questionService.getQuestionByName(tId, qId) , topic: await topicService.findTopicById(tId), answerOptions: await questionService.listQuestionAnswers(qId) });
    console.log("renderöidään kysymyssivu");


};

const getQuestionAnswerData = async (request) => {
    const data = {
        optionText: "",
        errors: "",
    };
    if(request) {
        const body = request.body({type: "form"});
        const params = await body.value;
        data.optionText = params.get("option_text");
        
    }
    return data;
};



const addQuestionAnswer = async ({request, response, render}) => {
    console.log("yritetään lisätä kysymystä");
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const tId = urlParts[2];
    const qId = urlParts[4];
    const body = request.body({ type: "form" });
    const params = await body.value; 
    const isCorrect = params.get("is_correct") === "on";
    const data = await getQuestionAnswerData(request);
    const [passes, errors] = await validate(data, validationRules2);
    if(!passes) {
        console.log("oli virheitä");
        data.errors = errors;
        console.log("virheet" +data.errors);
        render("questionAnswers.eta", {data: data.errors, nimi: data.optionText, questionName: await questionService.getQuestionByName(tId, qId) , topic: await topicService.findTopicById(tId), answerOptions: await questionService.listQuestionAnswers(qId) });
    } else {
        await questionService.addQuestionAnswerOption(
            qId,
            data.optionText,
            isCorrect,
    
        );
        console.log("added question answer option");
        response.redirect("/topics/"+urlParts[2]+"/questions/"+qId);

    }
   


  
    





};

const getQuestionAnswerOtions = async ({request}) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const qId = urlParts[4];
    const answerOtions = await questionService.listQuestionAnswers(qId);
    console.log("vaihtoehdon nimi on " +answerOtions.option_text);
    return answerOtions;

};


const deleteQuestionAnswerOption = async ({ response, request }) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const tId = urlParts[2];
    const qId = urlParts[4];
    const oId = urlParts[6];


    await questionService.deleteQuestionAnswerOption(oId); 
    response.redirect("/topics/"+tId+"/questions/"+qId);
};


const deleteQuestion = async ({response, request}) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const tId = urlParts[2];
    const qId = urlParts[4];

    await questionService.deleteQuestion(qId);
    response.redirect("/topics/"+tId);
};







export { addQuestion, viewQuestions, listQuestions, getQuestionName, addQuestionAnswer, getQuestionAnswerOtions, deleteQuestionAnswerOption, deleteQuestion, getQuestionData };


