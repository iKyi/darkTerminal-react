import { Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { SubdirectoryArrowLeftSharp } from "@mui/icons-material";

export type StakeCardEntryPropsType = {
  children?: any;
};

const StakeCardEntry: React.VFC<StakeCardEntryPropsType> = ({ children }) => {
  const params = useParams();
  console.log(params);
  // *************** RENDER *************** //
  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Button
          size="large"
          component={RouterLink}
          to="/stake/"
          startIcon={<SubdirectoryArrowLeftSharp />}
        >
          Back
        </Button>
      </Box>
      Card entry inner
    </Box>
  );
};

export default StakeCardEntry;
