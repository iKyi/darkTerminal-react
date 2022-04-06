import { styled, Grid, Box } from "@mui/material";
import dashboardLinks from "components/Minting/Urls/DashboardLinks";
import { Link as RouterLink } from "react-router-dom";

const DashboardMenuItemDesktop = styled(RouterLink)(({ theme }) => ({
  display: "flex",
  flexDirection: ["row", "row", "column"],
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid",
  borderImageSlice: 2,
  borderImageSource:
    "linear-gradient(180deg, rgba(54, 240, 151, 0) 35.49%, #36F097 100%)",
  backgroundColor: "#000",
  textDecoration: "none",
  padding: `${theme.spacing(3)}  ${theme.spacing(3)}  ${theme.spacing(
    3
  )}  ${theme.spacing(3)}`,
  color: "#fff",
  transition: "all .2s",
  textAlign: "center",
  fontSize: "0.92rem",
  path: {
    transition: "all .2s",
  },
  "&:hover": {
    color: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.main}`,
    path: {
      fill: theme.palette.error.main,
    },
  },
}));

export type DashboardMenuPagePropsType = {
  children?: any;
};

const DashboardMenuPage: React.VFC<DashboardMenuPagePropsType> = ({
  children,
}) => {
  // *************** RENDER *************** //
  return (
    <>
      <Grid container columnSpacing={[2, 2, 4]} rowSpacing={[2, 2, 4]}>
        {dashboardLinks.map((item) => {
          return (
            <Grid key={item.url} item xs={12} sm={6} md={4}>
              <DashboardMenuItemDesktop to={item.url}>
                {item.icon && (
                  <Box sx={{ fontSize: "64px" }}>
                    <item.icon fontSize="inherit" />
                  </Box>
                )}
                <Box>{item.name}</Box>
              </DashboardMenuItemDesktop>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default DashboardMenuPage;
