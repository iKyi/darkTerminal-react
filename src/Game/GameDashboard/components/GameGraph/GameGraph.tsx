import { Box } from "@mui/material";
import ReactFlow, { Background } from "react-flow-renderer";
import ConnectorNode from "./components/ConnectorNode";
import CustomEdge from "./components/CustomEdge";
import TerminalNode from "./components/TerminalNode";
import useGetNodes from "./utils/useGetNodes";

export type GameGraphPropsType = {};

const GameGraph: React.VFC<GameGraphPropsType> = () => {
  const elements = useGetNodes();

  const nodeTypes = {
    terminal: TerminalNode,
    connector: ConnectorNode,
  };
  const edgeTypes = {
    terminal: CustomEdge,
  };

  // *************** RENDER *************** //
  return (
    <Box sx={{ height: "100vh" }}>
      <ReactFlow
        elements={elements}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        defaultZoom={0.5}
        minZoom={0.2}
      >
        <Background color="transparent" />
      </ReactFlow>
    </Box>
  );
};

export default GameGraph;
