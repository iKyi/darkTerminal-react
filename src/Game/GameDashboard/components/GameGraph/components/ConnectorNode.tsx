import { Box } from "@mui/system";
import { memo } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useAppSelector } from "../../../../../app/hooks";
import iconBlack from "./iconBlack.png";
import iconWhite from "./iconWhite.png";

export type ConnectorNodePropsType = {
  data: {
    active: boolean;
    activated: boolean;
  };
  isConnectable: boolean;
};

const ConnectorNode: React.VFC<ConnectorNodePropsType> = ({ data }) => {
  const hackingInProgress = useAppSelector((state) => state.game.game.hacking);

  const { active, activated } = data;

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
        className={active && hackingInProgress ? "hacking" : ""}
        sx={{
          position: "relative",
          zIndex: 3,
          width: "64px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: "2px",
          borderStyle: "solid",
          borderRadius: "100%",
          borderColor: activated ? "#000" : active ? "primary.main" : "#fff",
          backgroundColor: activated ? "primary.main" : "#000",
          boxShadow: (theme) =>
            `0px 0px 20px 3px ${
              active || activated ? theme.palette.primary.main : "#fff"
            }`,
        }}
      >
        <img
          src={activated ? iconBlack : iconWhite}
          alt="Terminal entry icon"
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

export default memo(ConnectorNode);
