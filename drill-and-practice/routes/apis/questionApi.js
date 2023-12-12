import * as questionService from "../../services/questionService.js";


const getRandomElement = (Array) => {
  
  if(Array.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * Array.length);
  return Array[randomIndex];
};

const getRandomQuestion = async ({ response }) => {
  console.log("json!")
  const allQuestions = await questionService.listAllQuestions();
  console.log(allQuestions);
  if(allQuestions === 0) {
    console.log("0");
    response.body = {};
    return;
  }
  const randomQuestion = getRandomElement(allQuestions);
  console.log(randomQuestion);

  const answerOptions = await questionService.listQuestionAnswers(randomQuestion.id);

  const jsonResponse = {
    questionId: randomQuestion.id,
    questionText: randomQuestion.question_text,
    answerOptions: answerOptions.map(option => ({ optionId: option.id, optionText: option.option_text })),

  };
  response.body = jsonResponse;
};


const ansWerQuestion = async ({ request, response }) => {
  const body = await request.body().value;
  const { questionId, optionId } = body;

  const isCorrect = await questionService.checkAnswer(questionId, optionId);

  const jsonResponse = {
    correct: isCorrect,
  };

  // Set the response body
  response.body = jsonResponse;
};


export { getRandomQuestion, ansWerQuestion, getRandomElement };