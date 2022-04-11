import HackSystemAuthProviderProvider from "./HackSystemAuthProvider";
import HackTheSystemProper from "./HackTheSystemProper/HackTheSystemProper";

export type HackTheSystemPropsType = {
  children?: any;
};

const HackTheSystem: React.VFC<HackTheSystemPropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return (
    <HackSystemAuthProviderProvider>
      <HackTheSystemProper />
    </HackSystemAuthProviderProvider>
  );
};

export default HackTheSystem;
