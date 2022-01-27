import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";

export type MarkdownParserPropsType = {
  children: string;
};

const MarkdownParser: React.VFC<MarkdownParserPropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return <ReactMarkdown rehypePlugins={[rehypeRaw]}>{children}</ReactMarkdown>;
};

export default MarkdownParser;
