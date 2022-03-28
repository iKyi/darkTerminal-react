import { CircularProgress, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useAppSelector } from "app/hooks";

export type AppLoaderPropsType = {};

const variants = {
  open: { opacity: 1, scale: "100%" },
  closed: { opacity: 0, scale: "90%" },
};

const AppLoader: React.VFC<AppLoaderPropsType> = () => {
  const theme = useTheme();
  const loaders = useAppSelector((state) => state.global.loaders);

  const isOpen = loaders && loaders.length > 0;
  // *************** RENDER *************** //
  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      style={{
        position: "fixed",
        left: 20,
        bottom: 20,
        zIndex: 99999,
        backgroundColor: `rgba(0,0,0,0.65)`,
        padding: "16px",
        borderRadius: "100%",
        boxShadow: `0px 0px 18px 3px ${theme.palette.primary.main}`,
      }}
    >
      <CircularProgress />
    </motion.div>
  );
};

export default AppLoader;
