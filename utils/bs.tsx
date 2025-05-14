import wordlist from "./wordlist.js";

const binarySearch = (words: string[], target: string, isPrefix: boolean = false): boolean => {
  let left = 0;
  let right = words.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (isPrefix && words[mid].startsWith(target)) {
      return true; // Found a prefix match
    }
    if (words[mid] === target) {
      return true; // Found the word
    }
    if (words[mid] < target) {
      left = mid + 1; // Search in the right half
    }
    else {
      right = mid - 1; // Search in the left half
    }
  }
  return false; // Not found
};

const findValidWords = (groups: string[][], words: string[]): string[] => {
  const validWords: string[] = [];

  // Generate all combinations of 5 characters, one from each group
  function generateCombinations(prefix: string, groupIndex: number) {
    if (!binarySearch(words, prefix, true)) {
      return; // Stop recursion if no word starts with the prefix
    }
    if (prefix.length === 5) {
      // Use binary search to check if the word exists
      if (binarySearch(words, prefix)) {
        validWords.push(prefix);
      }
      return;
    }

    // Recursively build the word by adding one character from the current group
    if (groupIndex < groups.length) {
      for (const char of groups[groupIndex]) {
        generateCombinations(prefix + char, groupIndex + 1);
      }
    }
  }

  // Start the recursive generation with an empty prefix
  generateCombinations("", 0);
  return validWords;
};

const groups: string[][] = [
  ["s", "a", "c", "d", "e"],
  ["c", "k", "h", "p", "j"],
  ["k", "q", "e", "p", "o"],
  ["p", "l", "r", "w", "t"],
  ["u", "e", "w", "x", "s"],
];

const t0:DOMHighResTimeStamp = performance.now();
const validWords: string[] = findValidWords(groups, wordlist);
console.log(`BS: findValidWords took ${performance.now() - t0} milliseconds.`);

function Bs() {
  return (
    <div>
      <p>Possible words: {validWords.join(', ')}</p>
      <p>Skews found? {validWords.includes("skews").toString()}</p>
    </div>
  );
}

export default Bs;
