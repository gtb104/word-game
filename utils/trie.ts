class TrieNode {
  children: Record<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class TrieRoot {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let currentNode = this.root;
    for (const char of word) {
      if (!currentNode.children[char]) {
        currentNode.children[char] = new TrieNode();
      }
      currentNode = currentNode.children[char];
    }
    currentNode.isEndOfWord = true;
  }

  search(word: string): boolean {
    let currentNode = this.root;
    for (const char of word) {
      if (!currentNode.children[char]) {
        return false;
      }
      currentNode = currentNode.children[char];
    }
    return currentNode.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    let currentNode = this.root;
    for (const char of prefix) {
      if (!currentNode.children[char]) {
        return false;
      }
      currentNode = currentNode.children[char];
    }
    return true;
  }
}

// Generate all possible words and check if they exist in the dictionary
const findValidWords = (groups: string[][], trie: TrieRoot): string[] => {
  const validWords: string[] = [];

  // Generate all combinations of 5 characters, one from each group
  function generateCombinations(prefix: string, groupIndex: number): void {
    if (prefix.length === 5) {
      // Only check the word if the full prefix is valid
      if (trie.search(prefix)) {
        validWords.push(prefix);
      }
      return;
    }

    // Recursively build the word by adding one character from the current group
    if (groupIndex < groups.length) {
      for (const char of groups[groupIndex]) {
        // Check if the current prefix is potentially a valid word (if the Trie has the prefix)
        if (trie.startsWith(prefix + char)) {
          generateCombinations(prefix + char, groupIndex + 1);
        }
      }
    }
  }

  // Start the recursive generation with an empty prefix
  generateCombinations("", 0);
  return validWords;
};

const Trie = (wordlist: string[], groups: string[][]): string[] => {
  // Build a Trie from the word list
  const trie = new TrieRoot();
  wordlist.forEach((word) => trie.insert(word));

  // Find all the valid words, making sure there's at least one valid word
  const validWords = findValidWords(groups, trie);

  return validWords;
}

export default Trie;
