
import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";

const viewQuestions = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    console.log(urlParts[2]);

    const data = {
        topic: await topicService.findById(urlParts[2]),
        questions: await questionService.listQuestions(),
        

    };
    console.log(data);
    console.log(data.topic);
    console.log(data.questions);

    render("topicQuestions.eta", { data });

};


const addQuestion = async ({ request, response }) => {
    const body = request.body({ type: "form" });
    const params = await body.value;

    await questionService.addQuestion(
        1,
        params.get()
        params.get("question_text"),
    );

    console.log(params);

    response.redirect("/topics");
};