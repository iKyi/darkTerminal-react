import { SvgIconProps, SvgIcon } from "@mui/material";

const BlendIcon: React.VFC<SvgIconProps> = (props) => {
  // *************** RENDER *************** //
  return (
    <SvgIcon viewBox="0 0 64 64" {...props}>
      <path
        fill="#36F097"
        fillRule="evenodd"
        d="M12.8 38.4c0-10.667 6.4-20.267 19.2-32 12.8 11.733 19.2 21.333 19.2 32a19.2 19.2 0 01-38.4 0zm33.928-2.974c-5.456-2.056-11.366.683-16.904 3.243-4.51 2.082-8.772 4.053-12.344 3.238a14.973 14.973 0 01-.413-3.507c0-8.055 4.381-15.906 14.933-26.138 9.25 8.969 13.76 16.111 14.728 23.168v-.004z"
        clipRule="evenodd"
      ></path>
    </SvgIcon>
  );
};

export default BlendIcon;
