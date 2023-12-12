import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";
import * as sinon from "https://esm.sh/sinon";
import { sql } from "../database/database.js";

import * as questionCotroller from "../routes/controllers/questionController.js";
import * as questionApi from "../routes/apis/questionApi.js";
import * as questionService from "../services/questionService.js";



const mockRequest = {
    body: async (type) => ({
      value: Promise.resolve({
        get: (params) => "form",
        get: (params) => "question_text",
      }),
    }),
  };


  Deno.test("getQuestionData returns correct data when request has body", async () => {
    const data = await questionCotroller.getQuestionData(mockRequest);
    assertEquals(data.questionText, "question_text");
    assertEquals(data.errors, {});
  });
  

  Deno.test("getQuestionData returns default data when request is null", async () => {
    const data = await questionCotroller.getQuestionData(null);
    assertEquals(data.questionText, "");
    assertEquals(data.errors, {});
  });
  
  // Similar test cases can be written for other functions
  // ...
  
  // Test cases for getRandomElement function
  Deno.test("getRandomElement returns null for an empty array", () => {
    const result = questionApi.getRandomElement([]);
    assertEquals(result, null);
  });
  
  Deno.test("getRandomElement returns an element from a non-empty array", () => {
    const array = [1, 2, 3, 4, 5];
    const result = questionApi.getRandomElement(array);
    assert(array.includes(result));
  });





 