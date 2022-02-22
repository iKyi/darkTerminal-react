import { useConnection } from "@solana/wallet-adapter-react";
import { createContext, useEffect, useState } from "react";
import darkTerminal, {
  IDarkTerminalClass,
} from "./Solana/services/darkTerminal";

export type AuthDarkTerminalClassWrapperPropsType = {
  children?: any;
};

export const DarkTerminalServiceProvider = createContext<{
  darkTerminal: IDarkTerminalClass | null;
}>({ darkTerminal: null });

const AuthDarkTerminalClassWrapper: React.VFC<
  AuthDarkTerminalClassWrapperPropsType
> = ({ children }) => {
  const { connection } = useConnection();

  //state values
  const [darkTerminalService, setDarkTerminalService] =
    useState<IDarkTerminalClass>(new darkTerminal(connection));

  // event watchers
  useEffect(() => {
    const newTerminal = new darkTerminal(connection);
    setDarkTerminalService(newTerminal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection]);

  // *************** RENDER *************** //
  return (
    <DarkTerminalServiceProvider.Provider
      value={{ darkTerminal: darkTerminalService }}
    >
      {children}
    </DarkTerminalServiceProvider.Provider>
  );
};

export default AuthDarkTerminalClassWrapper;
