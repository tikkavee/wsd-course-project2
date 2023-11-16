import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicCotroller.js";

const router = new Router();

router.get("/", mainController.showMain);

router.post("/topics", topicController.addTopic);
router.get("/topics", topicController.listTopics); 
router.post("/topics/:id/delete", topicController.deleteTopic);

export { router };
