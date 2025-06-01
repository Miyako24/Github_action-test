import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read and parse the JSON file
const pythonQuestions = JSON.parse(
  readFileSync(join(__dirname, "./pythonQuestions.json"), "utf-8")
);

db.once('open', async () => {
  await cleanDB('Question', 'questions');
  await Question.insertMany(pythonQuestions);
  console.log('Questions seeded!');
  process.exit(0);
});