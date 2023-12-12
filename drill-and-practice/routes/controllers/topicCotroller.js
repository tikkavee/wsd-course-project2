import * as topicService from "../../services/topicService.js";
import {
    minLength,
    required,
    validate,
  } from "https://deno.land/x/validasaur@v0.15.0/mod.ts";


  const validationRules = {
    name: [required, minLength(2)],
  };






const getTopicData = async (request) => {


    const data = {
        name: "",
        errors: {},
    };
    if(request) {
        const body = request.body({type: "form"});
        const params = await body.value;
        data.name = params.get("name");
    }
    return data;

   
};




const addTopic = async ({ request, response, user, render }) => {
    const data = await getTopicData(request);
    const [passes, errors] = await validate(data, validationRules);
    if (!passes) {
        data.errors = errors;
        render("topics.eta", {data: data.errors, nimi: data.name, topics: await topicService.listTopics()});
    } else {
        await topicService.addTopic(
            user.id,
            data.name,
        );
        response.redirect("/topics");

    }
    
        
    };
  

   
    


   


const listTopics = async ({ render }) => {
    render("topics.eta", { topics: await topicService.listTopics() });
};

const deleteTopic = async ({ params, response }) => {
    await topicService.deleteTopic(params.id); 

    console.log("ohjataan takaisin topicseihin");

    response.redirect("/topics");
};




export { addTopic, listTopics, deleteTopic };