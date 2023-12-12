import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

const processLogin = async ({ request, response, state, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const userFromDatabase = await userService.findUserByEmail(
    params.get("email"),
  );

  if (userFromDatabase.length !== 1) {
    console.log("User not found");
    render("login.eta", { error: "Invalid email or password" });
    return;
  }

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(
    params.get("password"),
    user.password,
  );

  if (!passwordMatches) {
    console.log("Incorrect password");
    render("login.eta", { error: "Invalid email or password" });
    return;
  }

  await state.session.set("user", user);
  console.log("Login successful");
  response.redirect("/topics");
};

const showLoginForm = ({ render }) => {
  render("login.eta", { error: null });
};

export { processLogin, showLoginForm };