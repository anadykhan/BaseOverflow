"use client";

import Prism from "prismjs";
import parse from "html-react-parser";
import { Props } from "next/script";
import { useEffect } from "react";

const ParseHTML = ({ data }: Props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return <div>{parse(data)}</div>;
};
export default ParseHTML;