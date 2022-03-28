import { DownhillSkiingOutlined, MailOutline } from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import Logo from "assets/images/logo.png";
import { Link as RouterLink } from "react-router-dom";

export type DashboardLeftMenuMainPropsType = {};

const DashboardLeftMenuMain: React.VFC<DashboardLeftMenuMainPropsType> = () => {
  // *************** RENDER *************** //
  return (
    <Box>
      <Toolbar>
        <RouterLink
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={Logo}
            alt="Alt logo"
            style={{ width: "100%", height: "auto" }}
          />
        </RouterLink>
      </Toolbar>
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <MailOutline /> : <DownhillSkiingOutlined />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <MailOutline /> : <DownhillSkiingOutlined />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DashboardLeftMenuMain;
