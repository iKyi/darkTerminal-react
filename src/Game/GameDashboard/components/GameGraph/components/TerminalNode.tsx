import { Box } from "@mui/system";
import { memo } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useAppSelector } from "../../../../../app/hooks";
import greenLock from "./greenLock.png";
import redLock from "./redLock.png";
import iconBlack from "./iconBlack.png";
import iconWhite from "./iconWhite.png";

export type TerminalNodePropsType = {
  data: {
    open: boolean;
    active: boolean;
    onClick: (arg: any) => void;
    activated: boolean;
    inThePast: boolean;
  };
  isConnectable: boolean;
};

const TerminalNode: React.VFC<TerminalNodePropsType> = ({ data }) => {
  const tries = useAppSelector((state) => state.game.actor.tries);
  const hackingInProgress = useAppSelector((state) => state.game.game.hacking);

  const { active, onClick, activated, inThePast } = data;

  const clickHandler = (event: any) => {
    if (active && tries > 0 && !hackingInProgress) {
      onClick(data);
    }
  };

  const noTries = tries === 0;
  // *************** RENDER *************** //
  return (
    <Box sx={{ position: "relative" }}>
      <Handle
        type="target"
        position={Position.Left}
        style={{
          borderRadius: 0,
          opacity: 0,
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      />
      <Box
        onClick={clickHandler}
        className={active && hackingInProgress ? "hacking" : ""}
        sx={{
          backgroundColor: activated ? "primary.main" : "#000",
          position: "relative",
          zIndex: 3,
          width: "64px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor:
            noTries && active
              ? "error.main"
              : activated
              ? "#000"
              : active || inThePast
              ? "primary.main"
              : "#fff",
          transform: "rotate(45deg)",
          transition: ".3s",
          filter: activated || active || inThePast ? "none" : "grayscale(70)",
          boxShadow: (theme) =>
            activated || inThePast
              ? "none"
              : `0px 0px 20px 1px ${
                  noTries && active
                    ? theme.palette.error.main
                    : theme.palette.primary.main
                }`,
          pointerEvents: active && !hackingInProgress ? "all" : "none",
          cursor: noTries ? "not-allowed" : active ? "pointer" : "initial",
          "&:hover": {
            transform: "scale(1.2) rotate(45deg)",
          },
          "&.hacking": {
            animation: `hackEffect 1s infinite ease`,
          },
        }}
      >
        <img
          src={
            noTries && active
              ? redLock
              : (!activated && inThePast) || active
              ? greenLock
              : activated
              ? iconBlack
              : iconWhite
          }
          alt="Terminal entry icon"
          style={{ transform: "rotate(-45deg)" }}
        />
      </Box>
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{
          borderRadius: 0,
          opacity: 0,
          position: "absolute",
          top: "50%",
          left: "calc(50% - 4px)",
        }}
      />
    </Box>
  );
};

export default memo(TerminalNode);
