import BlendIcon from "components/Icons/BlendIcon";
import MintIcon from "components/Icons/MintIcon";
import PackIcon from "components/Icons/PackIcon";
import SchemasTemplatesIcon from "components/Icons/SchemasTemplatesIcon";
import SetupDropIcon from "components/Icons/SetupDropIcon";
import mintRoutes from "pages/Mint/MintRoutes";
import { SvgIconProps } from "@mui/material";
import { VFC } from "react";

interface IDashboardLink {
  name: string;
  url: string;
  icon?: VFC<SvgIconProps<"svg", {}>>;
}

const dashboardLinks: IDashboardLink[] = [
  {
    url: mintRoutes.MINT_NFTS,
    name: "Mint NFTs",
    icon: MintIcon,
  },
  {
    url: mintRoutes.SCHEMAS_AND_TEMPLATES,
    name: "Schemas and Templates",
    icon: SchemasTemplatesIcon,
  },
  { url: mintRoutes.SETUP_DROP, name: "Setup Drop", icon: SetupDropIcon },
  { url: mintRoutes.BLENDS, name: "Blends", icon: BlendIcon },
  {
    url: mintRoutes.MINTED_ON_DEMAND_PACKS,
    name: "Minted On Demand Packs",
    icon: PackIcon,
  },
];

export default dashboardLinks;
