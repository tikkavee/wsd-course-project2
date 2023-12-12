import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import {
  isEmail,
  minLength,
  required,
  validate,
} from "https://deno.land/x/validasaur@v0.15.0/mod.ts";


const validationRules = {
  email: [required, isEmail],
  password: [required, minLength(4)],
};


const getRegisterData = async (request) => {
  const data = {
    email: "",
    password: "",
    errors: {},
  };
  if(request) {

    const body = request.body({ type: "form" });
    const params = await body.value;
    data.email = params.get("email");
    data.password = params.get("password")

  }
  return data;
}


const registerUser = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const data = await getRegisterData(request);
  const [passes, errors] = await validate(data, validationRules);

  if(!passes) {
    data.errors = errors;
    console.log("löytyi virheitä");
    render("registration.eta", {data: data.errors, email: data.email, password: data.password });
  } else {
      await userService.addUser(
      params.get("email"),
      await bcrypt.hash(params.get("password")),
    );
  
    response.redirect("/auth/login");
  }
 
  

    
  };
  
  const showRegistrationForm = ({ render }) => {
    render("registration.eta");
  };
  
  export { registerUser, showRegistrationForm };