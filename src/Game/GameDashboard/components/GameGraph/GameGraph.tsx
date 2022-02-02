import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ReactFlow, { Background, FlowElement } from "react-flow-renderer";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { clickAction } from "../../../../features/game/gameActions";
import gameBackground from "../../gameBackground.png";
import CustomEdge from "./components/CustomEdge";
import TerminalNode from "./components/TerminalNode";

export type GameGraphPropsType = {
  children?: any;
};

// const elements = [
//   { id: "1", data: { label: "-" }, position: { x: 100, y: 100 } },
//   { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 200 } },
//   {
//     id: "e1-2",
//     source: "1",
//     target: "2",
//     type: "smoothstep",
//     animated: true,
//     style: {
//       stroke: "#36F097",
//       strokeWidth: "3px",
//       boxShadow: "3px 3px 3px 3px rgba(100,100,100,1)",
//     },
//   },
// ];

const GameGraph: React.VFC<GameGraphPropsType> = ({ children }) => {
  const dispatch = useAppDispatch();
  const gameData = useAppSelector((state) => state.game.game);
  const actorData = useAppSelector((state) => state.game.actor);
  const levelsAmount = useAppSelector((state) => state.game.game.stageAmount);

  const { sequence } = gameData;
  const { tries } = actorData;

  const [elements, setElements] = useState<FlowElement[]>([]);

  const onElementClick = (element: FlowElement) => {
    console.log("click", element);
    dispatch(clickAction());
  };

  useEffect(() => {
    const itemsWorking: FlowElement[] = [];
    let posX = 200;
    let posY = 200;

    let odd = true;
    for (let workingIndex = 0; workingIndex < levelsAmount; workingIndex++) {
      if (odd) {
        posX += 230;
        odd = false;
      } else {
        posY += 230;
        odd = true;
      }

      const active =
        workingIndex === sequence - 1 && workingIndex !== levelsAmount
          ? true
          : false;
      const activated = workingIndex <= sequence - 1;
      const item: FlowElement = {
        id: workingIndex.toString(),
        type: "terminal",
        data: {
          activated,
          active,

          onClick: onElementClick,
        },
        style: {
          cursor: active && tries > 0 ? "pointer" : "not-allowed",
        },
        position: {
          x: posX,
          y: posY,
        },
      };

      itemsWorking.push(item);
      if (workingIndex !== levelsAmount - 1) {
        const lineItem: FlowElement = {
          id: workingIndex.toString() + "line",
          source: `${workingIndex}`,
          target: `${workingIndex + 1}`,
          type: "smoothstep",
          animated: true,
          style: {
            stroke: !active && activated ? "#36F097" : "gray",
            strokeWidth: "3px",
            boxShadow: "3px 3px 3px 3px rgba(100,100,100,1)",
          },
        };
        itemsWorking.push(lineItem);
      }
    }
    setElements(itemsWorking);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tries, sequence]);

  const nodeTypes = {
    terminal: TerminalNode,
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
      >
        <Background
          color="transparent"
          style={{
            background: `url('${gameBackground}'), #0b0e10`,
            backgroundBlendMode: "color",
          }}
        />
      </ReactFlow>
    </Box>
  );
};

export default GameGraph;
