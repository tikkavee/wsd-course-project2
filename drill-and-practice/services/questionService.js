import { sql } from "../database/database.js";

const addQuestion = async (userId, topicId, questionText) => {
    await sql`INSERT INTO questions
        (user_id, topic_id, question_text)
          VALUES (${userId}, ${topicId}, ${questionText})`;

    console.log("question added");
  };


  const findById = async (id) => {

    console.log(id);
    const rows = await sql `SELECT * questions WHERE question_id = ${ id }`;
    console.log("rivit ovat" + rows[0]);
    return rows[0];


  };

  const listAllQuestions = async () => {
    const rows = await sql `SELECT * FROM questions`;
    console.log(rows[0]);
    return rows;
  };

  const listQuestions = async (id) => {
    const rows = await sql `SELECT * FROM questions WHERE topic_id = ${ id }`;
    console.log("tässä on kysymtkset"+rows);
    return rows;
  };

  const getQuestionByName = async (tId, qId) => {
    const rows = await sql `SELECT questions.id, questions.question_text, topics.name FROM questions
    JOIN topics ON questions.topic_id = topics.id
    WHERE questions.topic_id = ${tId} AND questions.id = ${qId}`;
    console.log("question name on"+rows[0].question_text);
    return rows[0];
  };

  const addQuestionAnswerOption = async (qId, answerText, isCorrect) => {
    await sql `INSERT INTO question_answer_options
    (question_id, option_text, is_correct)
    VALUES (${qId}, ${answerText}, ${isCorrect})`;
    console.log("question answer added");


  };

  const listQuestionAnswers = async (id) => {
    const rows = await sql `SELECT * FROM question_answer_options WHERE question_id = ${id}`;
    
    console.log(rows);
    return rows;
  };

  const deleteQuestionAnswerOption = async (optionId) => {
    await sql `DELETE FROM question_answers WHERE question_answer_option_id = ${optionId}`;
    await sql `DELETE FROM question_answer_options WHERE id = ${optionId}`;
  };

  const deleteQuestion = async (questionId) => {
    await sql `DELETE FROM questions WHERE id = ${questionId}`;

  };

  const checkAnswer = async (questionId, selectedOptionId) => {
    // Retrieve the correct answer for the given question from the database
    const correctAnswer = await getCorrectAnswer(questionId);
  
    // Compare the selected option with the correct answer
    return correctAnswer && correctAnswer.id === selectedOptionId;
  };

  const getCorrectAnswer = async (questionId) => {
    const [correctAnswer] = await sql `SELECT id
    FROM question_answer_options
    WHERE question_id = ${questionId}
    AND is_correct = TRUE
    LIMIT 1`;
    return correctAnswer;
  };


  

  export {addQuestion, findById, listQuestions, getQuestionByName, addQuestionAnswerOption, listQuestionAnswers, deleteQuestionAnswerOption, deleteQuestion, listAllQuestions, checkAnswer };