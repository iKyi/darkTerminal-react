import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import StrapiPublicProvider from "../../providers/StrapiPublicProvider";
import Footer from "../Reusable/Layout/Footer/Footer";
import Header from "../Reusable/Layout/Header/Header";

export type FourOhFourPropsType = {
  children?: any;
};

const FourOhFour: React.VFC<FourOhFourPropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return (
    <StrapiPublicProvider>
      <Header />
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
      <Footer />
    </StrapiPublicProvider>
  );
};

export default FourOhFour;
