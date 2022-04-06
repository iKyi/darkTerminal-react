import dashboardLinks from "./Urls/DashboardLinks";
import LeftNavItems from "./Urls/MintLeftNavLinks";

const cleanedNav = LeftNavItems.map((item) => {
  return { url: item.url, name: item.name };
});

const cleanedDash = dashboardLinks.map((item) => {
  return { url: item.url, name: item.name };
});

const mintingNavLinks = [...cleanedNav, ...cleanedDash];

export default mintingNavLinks;
