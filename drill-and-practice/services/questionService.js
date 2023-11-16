import { sql } from "../database/database.js";

const addQuestion = async (userId, topicId, questionText) => {
    await sql`INSERT INTO questions
        (user_id, topic_id, question_text)
          VALUES (${userId}, ${topicId}, ${questionText})`;

    console.log("question added");
  };

  const listQuestions = async () => {
    const rows = await sql `SELECT * FROM questions`;
    console.log(rows);
    return rows;
  };

  export {addQuestion, listQuestions };