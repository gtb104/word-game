import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import wordlist from "./utils/wordlist.js";
import trie from "./utils/trie.js";

const app = express();
const port = 3000;
const alphabet = "abcdefghijklmnopqrstuvwxyz";
let characterGroups;
let validWords = [];

/**
 * Generates an Array of random alphabet characters.
 * @param {number} count The number of characters to generate
 * @returns An Array of characters
 */
const generateRandomCharacters = (count = 5) => {
  const randomChars = Array.from(
    { length: count },
    () => alphabet[Math.floor(Math.random() * alphabet.length)]
  );
  //validate unique letters within the group. Regenerate if not unique.
  const charSet = new Set(randomChars);
  if (charSet.size !== 5) {
    console.log("duplicate characters, trying again");
    return generateRandomCharacters(count);
  }
  return randomChars;
};

// Generate all valid words derived from the supplied character sets.
// There must be at least two valid words.
while (validWords.length < 2) {
  characterGroups = new Array(5).fill(1).map(() => generateRandomCharacters());
  validWords = trie(wordlist, characterGroups);
}

// Middleware
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json()); // Parse JSON bodies
// app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// // Functions
// const cache = {};
// const defaultLimit = 500;
// const limitFn = (id, fn, data, limit = defaultLimit) => {
//   if (cache[id]) {
//     console.log('RATE LIMITED');
//     return 429;
//   }
//   fn(data);
//   const pid = setTimeout((data) => {
//     delete cache[id];
//   }, limit);
//   cache[id] = pid;
// };

// APIs
// Returns all valid words given the characters
app.get("/api/valid-words", (_, res) => {
  res.json({ words: validWords });
});

// Return all the characters for the columns
app.get("/api/groups", (_, res) => {
  res.json({ groups: characterGroups });
});

// // Get value from UI
// app.post("/api/foo", (req, res) => {
//   const { body, headers } = req;
//   const status = limitFn(headers.token, console.log, `PASSED IN: ${body.foo}`) || 200;
//   res.status(status).end();
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running at htttp://localhost:${port}`);
});
