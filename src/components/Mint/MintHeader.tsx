import { Box } from "@mui/system";
import { useContext } from "react";
import { StrapiContext } from "../../providers/StrapiPublicProvider";
import { NavLink } from "react-router-dom";
import { getStrapiMedia } from "../../lib/theme/media";
import useMobile from "../../hooks/useMobile";

export type MintHeaderPropsType = {
  children?: any;
};

const MintHeader: React.VFC<MintHeaderPropsType> = ({ children }) => {
  const data = useContext(StrapiContext);
  const isMobile = useMobile();

  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          width: isMobile ? "200px" : "280px",
        }}
      >
        <NavLink
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={getStrapiMedia(data.logo)}
            alt="Dark Terminal Logo"
            style={{ maxWidth: "100%" }}
          />
        </NavLink>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default MintHeader;
