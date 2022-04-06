import {
  CollectionsOutlined,
  DashboardOutlined,
  DiamondOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import mintRoutes from "pages/Mint/MintRoutes";

interface ILeftNavItem {
  name: string;
  url: string;
  icon: any;
}

export const LeftNavItems: ILeftNavItem[] = [
  {
    name: "Dashboard",
    url: mintRoutes.DASHBOARD,
    icon: DashboardOutlined,
  },
  {
    name: "Collections",
    url: mintRoutes.COLLECTIONS,
    icon: CollectionsOutlined,
  },
  {
    name: "NFTS",
    url: mintRoutes.NFTS,
    icon: DiamondOutlined,
  },
  {
    name: "Notifications",
    url: mintRoutes.NOTIFICATIONS,
    icon: NotificationsOutlined,
  },
];

export default LeftNavItems;
