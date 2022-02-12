import { useTheme } from "@emotion/react";
import { useMemo } from "react";
import { FlowElement } from "react-flow-renderer";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { clickAction } from "../../../../../features/game/gameActions";

const useGetNodes = () => {
  const theme = useTheme();
  const gameData = useAppSelector((state) => state.game.game);
  const { activeNodes, sequence } = gameData;
  const playerData = useAppSelector((state) => state.game.actor);
  const { tries } = playerData;
  const noTries = tries === 0;

  const dispatch = useAppDispatch();
  const onElementClick = (element: FlowElement) => {
    dispatch(clickAction(element));
  };

  const getLine = (
    sequenceNo: number,
    id1: string,
    id2: string,
    right?: boolean
  ) => {
    const active = right ? false : sequence === sequenceNo;
    const activated =
      (sequence > sequenceNo && activeNodes.includes(id1)) ||
      activeNodes.includes(id2);
    return {
      id: `${id1}-${id2}-line`,
      source: `${id1}`,
      target: `${id2}`,
      type: "smoothstep",
      animated: active ? true : false,
      style: {
        position: "relative" as "relative",
        stroke:
          active && noTries
            ? (theme as any).palette.error.main
            : active || activated
            ? "#36F097"
            : "gray",
        strokeWidth: active || activated ? "3px" : "1px",
        zIndex: active || activated ? "2" : "1",
      },
    };
  };

  const getConnectorNode = (
    id: string,
    parentSequence: number,
    x: number,
    y: number
  ) => {
    return {
      id: id,
      type: "connector",
      data: {
        activated: sequence > parentSequence,
        active: sequence === parentSequence,
      },
      style: {
        pointerEvents: "none" as "none",
      },
      position: { x, y },
    };
  };

  const getNode = (id: string, x: number, y: number, chance: number) => {
    const parentSequence = Number(id.charAt(0));

    return {
      id,
      type: "terminal",
      data: {
        activated: activeNodes.includes(id),
        inThePast: sequence > parentSequence,
        active: parentSequence === sequence,
        onClick: onElementClick,
        chance,
        id,
      },
      style: {
        cursor: "initial",
      },
      position: { x, y },
    };
  };

  const nodes: FlowElement[] = useMemo(() => {
    return [
      getConnectorNode("c-1", 0, 500, 1000),
      getNode("1-a", 800, 800, 0.66),
      getNode("1-b", 800, 1000, 0.66),
      getNode("1-c", 800, 1200, 0.66),
      getLine(1, "c-1", "1-a"),
      getLine(1, "c-1", "1-b"),
      getLine(1, "c-1", "1-c"),
      getLine(1, "1-a", "c-2", true),
      getLine(1, "1-b", "c-2", true),
      getLine(1, "1-c", "c-2", true),
      getConnectorNode("c-2", 1, 1100, 1000),
      getNode("2-a", 1400, 800, 0.66),
      getNode("2-b", 1400, 1000, 0.66),
      getNode("2-c", 1400, 1200, 0.66),
      getLine(2, "c-2", "2-a"),
      getLine(2, "c-2", "2-b"),
      getLine(2, "c-2", "2-c"),
      getLine(2, "2-a", "c-3", true),
      getLine(2, "2-b", "c-3", true),
      getLine(2, "2-c", "c-3", true),
      getConnectorNode("c-3", 2, 1700, 1000),
      getNode("3-a", 2000, 800, 0.33),
      getNode("3-b", 2000, 1000, 0.33),
      getNode("3-c", 2000, 1200, 0.33),
      getLine(3, "c-3", "3-a"),
      getLine(3, "c-3", "3-b"),
      getLine(3, "c-3", "3-c"),
      getLine(3, "3-a", "c-4", true),
      getLine(3, "3-b", "c-4", true),
      getLine(3, "3-c", "c-4", true),
      getConnectorNode("c-4", 3, 2300, 1000),
      getNode("4-a", 2600, 600, 0.2),
      getNode("4-b", 2600, 800, 0.2),
      getNode("4-c", 2600, 1000, 0.2),
      getNode("4-d", 2600, 1200, 0.2),
      getNode("4-e", 2600, 1400, 0.2),
      getLine(4, "c-4", "4-a"),
      getLine(4, "c-4", "4-b"),
      getLine(4, "c-4", "4-c"),
      getLine(4, "c-4", "4-d"),
      getLine(4, "c-4", "4-e"),
      getLine(4, "4-a", "c-5", true),
      getLine(4, "4-b", "c-5", true),
      getLine(4, "4-c", "c-5", true),
      getLine(4, "4-d", "c-5", true),
      getLine(4, "4-e", "c-5", true),
      getConnectorNode("c-5", 4, 2900, 1000),
      getNode("5-a", 3200, 600, 0.2),
      getNode("5-b", 3200, 800, 0.2),
      getNode("5-c", 3200, 1000, 0.2),
      getNode("5-d", 3200, 1200, 0.2),
      getNode("5-e", 3200, 1400, 0.2),
      getLine(5, "c-5", "5-a"),
      getLine(5, "c-5", "5-b"),
      getLine(5, "c-5", "5-c"),
      getLine(5, "c-5", "5-d"),
      getLine(5, "c-5", "5-e"),
      getLine(5, "5-a", "c-6", true),
      getLine(5, "5-b", "c-6", true),
      getLine(5, "5-c", "c-6", true),
      getLine(5, "5-d", "c-6", true),
      getLine(5, "5-e", "c-6", true),
      getConnectorNode("c-6", 5, 3500, 1000),
      getNode("6-a", 3800, 400, 0.1428),
      getNode("6-b", 3800, 600, 0.1428),
      getNode("6-c", 3800, 800, 0.1428),
      getNode("6-d", 3800, 1000, 0.1428),
      getNode("6-e", 3800, 1200, 0.1428),
      getNode("6-f", 3800, 1400, 0.1428),
      getNode("6-g", 3800, 1600, 0.1428),
      getLine(6, "c-6", "6-a"),
      getLine(6, "c-6", "6-b"),
      getLine(6, "c-6", "6-c"),
      getLine(6, "c-6", "6-d"),
      getLine(6, "c-6", "6-e"),
      getLine(6, "c-6", "6-f"),
      getLine(6, "c-6", "6-g"),
      getLine(6, "6-a", "c-7", true),
      getLine(6, "6-b", "c-7", true),
      getLine(6, "6-c", "c-7", true),
      getLine(6, "6-d", "c-7", true),
      getLine(6, "6-e", "c-7", true),
      getLine(6, "6-f", "c-7", true),
      getLine(6, "6-g", "c-7", true),
      getConnectorNode("c-7", 6, 4100, 1000),
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNodes, sequence, noTries]);

  return nodes;
};

export default useGetNodes;
