import {sql} from "../database/database.js";


const getTotalNumberOfQuestions = async () => {
    const count = await sql `SELECT count(*) AS totalQuestions FROM questions`;
    console.log(count[0].totalquestions);
   
        
    return count[0].totalquestions;
    
};

const getTotalNumberOfAnswers = async () => {
    const count = await sql `SELECT count(*) AS totalQuestionAnswers FROM question_answers`;
    console.log(count[0].totalquestionanswers);
    return count[0].totalquestionanswers;
};



export { getTotalNumberOfQuestions, getTotalNumberOfAnswers };