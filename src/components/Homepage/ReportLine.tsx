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
        background:
          "linear-gradient(270deg, rgba(11, 14, 16, 0) 3.62%, rgba(54, 240, 151, 0.12) 48.3%, rgba(6, 3, 13, 0) 100%)",
      }}
    >
      <Box
        sx={{
          borderTop: "2px solid transparent",
          borderImageSlice: 30,
          borderImageSource:
            "linear-gradient(269.98deg, rgba(54, 240, 151, 0) 3.73%, #36F097 51.58%, rgba(54, 240, 151, 0) 99.42%)",
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
          borderTop: "2px solid transparent",
          borderBottom: "2px solid transparent",
          borderImageSlice: 30,
          borderImageSource:
            "linear-gradient(269.98deg, rgba(54, 240, 151, 0) 3.73%, #36F097 51.58%, rgba(54, 240, 151, 0) 99.42%)",
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
