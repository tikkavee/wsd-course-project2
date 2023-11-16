import { sql } from "../database/database.js";

const addTopic = async (userId, name) => {
    await sql`INSERT INTO topics
        (user_id, name)
          VALUES (${userId}, ${name})`;
  };

  const listTopics = async () => {
    const rows = await sql `SELECT * FROM topics`;
    return rows;
  };

  const deleteTopic = async (topicId) => {
    await sql`DELETE FROM question_answers 
    WHERE question_id IN (SELECT id FROM questions WHERE topic_id =${topicId})`;

    await sql`DELETE FROM question_answer_options
    WHERE question_id IN (SELECT id FROM questions WHERE topic_id =${topicId})`;

    await sql`DELETE FROM questions
    WHERE topic_id =${topicId}`;

    await sql`DELETE FROM topics
    WHERE id = ${topicId}`;
  };


const findById = async (id) => {
    console.log(id);
    const topic = await sql `SELECT * FROM topics WHERE id = ${ id }`;
    console.log("topic on" + topic[0])
    return topic[0];

};

  
  export { addTopic, listTopics, deleteTopic, findById };