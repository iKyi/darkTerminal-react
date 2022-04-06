import { SvgIconProps, SvgIcon } from "@mui/material";

const SchemasTemplatesIcon: React.VFC<SvgIconProps> = (props) => {
  // *************** RENDER *************** //
  return (
    <SvgIcon viewBox="0 0 64 64" {...props}>
      <path
        fill="#36F097"
        d="M50.667 26.667H13.333A5.339 5.339 0 008 32v21.333a5.339 5.339 0 005.333 5.334h37.334A5.339 5.339 0 0056 53.333V32a5.339 5.339 0 00-5.333-5.333zM13.333 53.333V32h37.334l.005 21.333H13.333zm0-37.333h37.334v5.333H13.333V16zm5.334-10.667h26.666v5.334H18.667V5.333z"
      ></path>
    </SvgIcon>
  );
};

export default SchemasTemplatesIcon;
