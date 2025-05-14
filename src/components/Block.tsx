import "./Block.css";

interface BlockProps {
  char: string;
  onClick?: () => void;
}

const Block = ({ char, onClick }: BlockProps) => {
  return <div className="block" onClick={onClick}>{char.toUpperCase()}</div>;
}

export default Block;
