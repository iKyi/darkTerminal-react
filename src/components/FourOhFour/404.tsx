import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";

export type FourOhFourPropsType = {
  children?: any;
};

const FourOhFour: React.VFC<FourOhFourPropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return (
    <Container
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card>
        <CardHeader title={`We're sorry, this page was not found.`} />
        <CardContent>
          <Button
            sx={{ my: 4 }}
            fullWidth
            color="primary"
            variant="contained"
            component={Link}
            to="/"
          >
            Go Home
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FourOhFour;
