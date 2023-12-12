import * as statistics from "../../services/statisticsService.js";


const showMain = async ({ render }) => {
  const data = {
    totalQuestions: await statistics.getTotalNumberOfQuestions(),
    totalAnswers: await statistics.getTotalNumberOfAnswers(),
  }
  console.log(data);
  console.log(data.totalQuestions);


  render("main.eta", {questions: data.totalQuestions, answers: data.totalAnswers});
};

export { showMain };
