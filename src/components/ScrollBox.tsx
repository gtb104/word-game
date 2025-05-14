import "./ScrollBox.css";
import { ReactNode } from "react";

interface ScrollBoxProps {
  children?: ReactNode
}
const ScrollBox = (props: ScrollBoxProps) => {
  return <div className="scroll-box">{ props.children }</div>;
};

export default ScrollBox;
