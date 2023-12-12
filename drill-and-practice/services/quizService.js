import { sql } from "../database/database.js";

const getAllTopics = async () => {
    const rows = await sql `SELECT * FROM topics ORDER BY name`;
    console.log(rows);
    return rows;
};


const getRandomQuestion = async (id) => {
    const rows = await sql `SELECT * FROM questions WHERE topic_id = ${id} ORDER BY RANDOM() LIMIT 1`;
    console.log(rows);
    return rows;
};


const getQuizWithId = async (tId, qId) => {
    const rows = await sql `SELECT * FROM questions WHERE topic_id = ${tId} AND id = ${qId}`;
    console.log(rows.length);
    if (rows.length === 0) {
        return [];

    } else {
        return rows;
    };
  
};

const listQuestionAnswers = async (qId) => {
    const rows = await sql `SELECT * FROM question_answer_options WHERE question_id = ${qId}`;
    
    console.log("tässä on vastausvaihtoehdot" +rows);
    return rows;
  };

  const getTopicById = async(tId) => {
    const rows = await sql `SELECT * FROM topics WHERE id = ${tId}`;
    return rows;
  };

  const addQuestionAnswer = async(userId, qId, oId) => {
    await sql `INSERT INTO question_answers
    (user_id, question_id, question_answer_option_id)
    VALUES (${userId}, ${qId}, ${oId})`;
    console.log("question answer added");
  };

  const getQuestionAnswerCorrectnes = async (oId) => {
    const rows = await sql `SELECT is_correct FROM question_answer_options
    WHERE id = ${oId}`;
    console.log("vastaus on väärin/oikein"+rows);
    return rows;

  };

  const getTrueAnswer = async(qId) => {
    const rows = await sql `SELECT * FROM question_answer_options
    WHERE question_id = ${qId}
    AND is_correct = TRUE
    ORDER BY id
    LIMIT 1`;
    console.log(rows);
    return rows;
  };







export { getAllTopics, getRandomQuestion, getQuizWithId, listQuestionAnswers, getTopicById, addQuestionAnswer, getQuestionAnswerCorrectnes, getTrueAnswer };