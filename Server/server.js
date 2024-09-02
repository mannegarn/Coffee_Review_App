import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reviews from "./Routes/reviews.js";
import countries from "./Routes/countries.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/reviews", reviews);
app.use("/countries", countries);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
