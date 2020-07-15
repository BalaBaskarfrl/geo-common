import express, { Application } from "express";
import bodyParser from "body-parser";

//import connect from "./connect";

import * as BookController from "./controllers/book_controller";
import SampleController from "./controllers/sampleController";

const app: Application = express();
const port: number = 5000 || process.env.PORT;

const sampleControllerObj = new SampleController();


//connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/books", BookController.allBooks);

app.get("/books/:id", BookController.showBook);

app.post("/decorator", sampleControllerObj.returnFunctionTest);

app.post("/books", BookController.addBook);

app.patch("/books/:id", BookController.updateBook);

app.delete("/books/:id", BookController.deleteBook);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
