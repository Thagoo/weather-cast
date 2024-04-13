import { CodeBracketIcon, HeartIcon } from "@heroicons/react/24/outline";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-4">
      <div
        className="group flex items-center justify-center gap-1 text-neutral-400 dark:text-neutral-600"
        aria-hidden={true}
      >
        <CodeBracketIcon className="h-5 w-5" />
        <span>with</span>
        <HeartIcon className="h-4 w-4 group-hover:text-red-500" />
        <span>by Lohith</span>
      </div>
    </footer>
  );
};

export default Footer;
