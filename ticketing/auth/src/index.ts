import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";


const app = express();
// middleware
app.use(json());

// routes
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

// error handling
app.use(errorHandler);

// listen
app.listen(3000, () => {
    console.log("Listening on port 3000!");
});
