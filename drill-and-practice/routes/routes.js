import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicCotroller.js";
import * as questionController from "./controllers/questionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";

import * as questionApi from "./apis/questionApi.js";

const router = new Router();

router.get("/", mainController.showMain);

router.post("/topics", topicController.addTopic);
router.get("/topics", topicController.listTopics); 
router.post("/topics/:id/delete", topicController.deleteTopic);
router.post("/topics/:id/questions", questionController.addQuestion);
router.get("/topics/:id", questionController.listQuestions);
router.get("/topics/:id/questions/:id", questionController.getQuestionName);
router.post("/topics/:id/questions/:id/options", questionController.addQuestionAnswer);
router.post("/topics/:id/questions/:id/options/:id/delete", questionController.deleteQuestionAnswerOption);
router.post("/topics/:id/questions/:id/delete", questionController.deleteQuestion);
router.get("/quiz", quizController.listQuizTopics);
router.get("/quiz/:id", quizController.listRandomQuestion);
router.get("/quiz/:id/questions/:id", quizController.renderRandomQuestion);
router.post("/quiz/:id/questions/:id/options/:id", quizController.addQuestionAnswer);
router.get("/quiz/:id/questions/:id/correct", quizController.renderCorrect);
router.get("/quiz/:id/questions/:id/incorrect", quizController.renderIncorrect);




router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/api/questions/random", questionApi.getRandomQuestion);
router.post("/api/questions/answer", questionApi.ansWerQuestion);

export { router };
