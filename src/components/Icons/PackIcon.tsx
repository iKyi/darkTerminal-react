import { SvgIconProps, SvgIcon } from "@mui/material";

const PackIcon: React.VFC<SvgIconProps> = (props) => {
  // *************** RENDER *************** //
  return (
    <SvgIcon viewBox="0 0 64 64" {...props}>
      <path
        fill="#36F097"
        fillRule="evenodd"
        d="M32.474 8L57.2 14.591l2.8 2.025v29.036l-1.594 2.067L32 55 5.55 47.72 4 45.651V16.616l2.628-2.025L31.31 8h1.163zm-.388 4.308l-17.23 4.308 2.369.861L32 21.355l12.923-3.49 4.092-1.25-16.929-4.307zM8.308 44.015l21.538 5.902V25.232L8.308 19.459v24.556zm25.846-18.783v24.685l21.538-5.902V19.33l-8.701 2.382v11.059l-4.308 1.12V22.893l-8.53 2.339z"
        clipRule="evenodd"
      ></path>
    </SvgIcon>
  );
};

export default PackIcon;
