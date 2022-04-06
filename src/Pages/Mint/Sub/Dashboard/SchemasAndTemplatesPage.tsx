import { ChevronRight } from "@mui/icons-material";
import { Breadcrumbs, Link as MUILink } from "@mui/material";
import MintingInnerPageWrapper from "components/Reusable/Layout/MintingInnerPageWrapper";
import { FONTS } from "lib/theme";
import mintRoutes from "pages/Mint/MintRoutes";
import { Link as RouterLink } from "react-router-dom";

export type SchemasAndTemplatesPagePropsType = {
  children?: any;
};

const BreadCrumbs: React.FC = () => {
  return (
    <Breadcrumbs
      separator={<ChevronRight color="primary" />}
      sx={{ mb: 3, fontFamily: FONTS.FURORE }}
    >
      <MUILink
        underline="hover"
        component={RouterLink}
        to={mintRoutes.COLLECTIONS}
      >
        Collections
      </MUILink>
      <MUILink
        underline="none"
        component={RouterLink}
        to={mintRoutes.SCHEMAS_AND_TEMPLATES}
        aria-current="page"
        color="common.gray"
      >
        Schemas and Templates
      </MUILink>
    </Breadcrumbs>
  );
};

const SchemasAndTemplatesPage: React.VFC<SchemasAndTemplatesPagePropsType> = ({
  children,
}) => {
  // *************** RENDER *************** //
  return (
    <MintingInnerPageWrapper topElement={<BreadCrumbs />}>
      schemas and temapltes inner
    </MintingInnerPageWrapper>
  );
};

export default SchemasAndTemplatesPage;
