import { Box } from "@mui/system";
import { memo } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useAppSelector } from "../../../../../app/hooks";
import terminalIcon from "./TerminalPic.png";

export type TerminalNodePropsType = {
  data: {
    open: boolean;
    active: boolean;
    onClick: (arg: any) => void;
    activated: boolean;
  };
  isConnectable: boolean;
};

const TerminalNode: React.VFC<TerminalNodePropsType> = ({ data }) => {
  const tries = useAppSelector((state) => state.game.actor.tries);
  const hackingInProgress = useAppSelector((state) => state.game.game.hacking);

  const { active, onClick, activated } = data;

  const clickHandler = (event: any) => {
    if (active && tries > 0) {
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
          backgroundColor: "#000",
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
            activated && !active
              ? "primary.light"
              : active && !noTries
              ? "yellow"
              : noTries && active
              ? "error.main"
              : "primary.main",
          transform: "rotate(45deg)",
          transition: ".3s",
          filter: activated ? "none" : "grayscale(70)",
          boxShadow: "none",
          pointerEvents: active ? "all" : "none",
          "&:hover": {
            transform: "scale(1.2) rotate(45deg)",
            boxShadow: (theme) =>
              `0px 0px 20px 3px ${theme.palette.primary.main}`,
          },
          "&.hacking": {
            animation: `hackEffect 1s infinite ease`,
          },
        }}
      >
        <img
          src={terminalIcon}
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
