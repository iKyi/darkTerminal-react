import { Box, Stack, Typography } from "@mui/material";

const Items = [
  {
    name: "HACKER SET",
    value: "32.2 SOL",
    info: "0.33% OF PRIZE POOL",
  },
  {
    name: "MAIN SYSTEM",
    value: "32.2 SOL",
    info: "0.33% OF PRIZE POOL",
  },
  {
    name: "SECONDARY SYSTEM",
    value: "32.2 SOL",
    info: "0.33% OF PRIZE POOL",
  },
];

export type ReportLinePropsType = {
  children?: any;
};

const ReportLine: React.VFC<ReportLinePropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        backgroundColor: "rgba(0,120,0,0.10)",
      }}
    >
      <Box
        sx={{
          borderTopWidth: "1px",
          borderTopColor: "primary.main",
          borderTopStyle: "solid",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {Items.map((item) => {
          return (
            <Stack
              key={item.name}
              direction="row"
              sx={{
                p: 1.7,
                fontFamily: "Furore",
                textShadow: "1px 1px 1px black",
              }}
            >
              <Box sx={{ color: "common.white" }}>{item.name}:</Box>
              <Box sx={{ color: "error.main", ml: 1 }}>{item.value}</Box>
              <Box sx={{ color: "primary.main", ml: 1 }}>({item.info})</Box>
            </Stack>
          );
        })}
      </Box>
      <Box
        sx={{
          py: 1.3,
          borderTopWidth: "1px",
          borderTopColor: "primary.main",
          borderTopStyle: "solid",
          borderBottomWidth: "1px",
          borderBottomColor: "primary.main",
          borderBottomStyle: "solid",
          textAlign: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            textTransform: "uppercase",
            fontFamily: "Furore",
            fontSize: "0.8rem",
          }}
        >
          {
            "Prizes displayed in sol are the amounts in case the nft drop sells out"
          }
        </Typography>
      </Box>
    </Box>
  );
};

export default ReportLine;
