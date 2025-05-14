import "./App.css";
import { useEffect, useState } from "react";
import Block from "./components/Block";
import Button from "./components/Button";
import ScrollBox from "./components/ScrollBox";
import SelectionBox from "./components/SelectionBox";

// interface fData {
//   foo: string
// };

interface Dimensions {
  top: number
  left: number
}

const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let pid: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(pid);
    pid = setTimeout(() => func(...args), delay);
  };
};

const App = () => {
  const [validWords, setValidWords] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [groups, setGroups] = useState<string[][]>([[]]);
  const [dimensions, setDimensions] = useState<Dimensions>({top: 0, left: 0});
  // const [formData, setFormData] = useState<fData>({ foo: "" });

  useEffect(() => {
    fetch("http://localhost:3000/api/valid-words")
      .then((res: Response) => res.json())
      .then((data) => {
        setValidWords(data.words);
        console.log('valid words', data.words.join(', '));
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/groups")
      .then((res: Response) => res.json())
      .then((data) => {
        setGroups(data.groups);
      });
  }, []);

  // Setup resize handler. This will recalculate the position of the selection box
  useEffect(() => {
    const handleResize = debounce(() => {
      const wordRow = document.querySelector('.selection-box');
      const {left = 0, top = 0} = wordRow?.getBoundingClientRect() || {};
      setDimensions({left, top});
    }, 200);

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({foo: e.target.value});
  // };

  // const onSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   fetch("http://localhost:3000/api/foo",{
  //     method: "POST",
  //     headers: {"Content-type": "application/json", "token": "123"},
  //     body: JSON.stringify(formData)
  //   });
  //   setFormData({foo: ""});
  // };

  const getSelectedCharacters = () => {
    const y = dimensions.top + 40;
    const xOffsets = new Array(5).fill(1).map((_, i) => {
      const start = dimensions.left + 40;
      return start + i * 80;
    });
    const chars = xOffsets.map((x) => document.elementFromPoint(x, y)?.textContent);
    console.log('SELECTED CHARACTERS:', chars.join(''));
    return chars.join('').toLowerCase();
  };

  const checkSelectedCharacters = () => {
    const selection = getSelectedCharacters();
    if (validWords.includes(selection) && !foundWords.includes(selection)) {
      setFoundWords([...foundWords, selection]);
    }
  };

  return (
    <>
      <p>Words found({foundWords.length} of {validWords.length}): {foundWords.join(", ").toUpperCase()}</p>
      <Button className="submit" type="button" isPrimary onClick={checkSelectedCharacters}>Check Word</Button>

      <div className="main-container">
        {groups.map((group, idx) => (
          <ScrollBox key={idx}>
            <div className="spacer"></div>
            {group.map((groupChar, charIdx) => (
              <Block key={charIdx} char={groupChar}></Block>
            ))}
            <div className="spacer"></div>
          </ScrollBox>
        ))}
      </div>
      <SelectionBox></SelectionBox>
    </>
  );
};

export default App;
