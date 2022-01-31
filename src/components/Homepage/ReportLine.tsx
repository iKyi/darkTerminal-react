import { Box, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import axiosGetter from "../../lib/axios/axiosGetter";
import { getStrapiURL } from "../../lib/theme/api";

export type ReportLinePropsType = {
  children?: any;
};

const ReportLine: React.VFC<ReportLinePropsType> = ({ children }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axiosGetter(getStrapiURL("system-info-entries?populate=*")).then((resp) => {
      setData(resp.data);
    });
  }, []);

  // *************** RENDER *************** //
  if (!data) {
    return null;
  }
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
        <Marquee
          gradientColor={[11, 15, 16]}
          gradientWidth={30}
          speed={40}
          pauseOnClick={true}
          pauseOnHover={true}
        >
          {data.map((item: Record<any, any>) => {
            const { attributes } = item;

            return (
              <Stack
                key={attributes.name}
                direction="row"
                sx={{
                  p: 1.7,
                  fontFamily: "Furore",
                  textShadow: "1px 1px 1px black",
                }}
              >
                <Box sx={{ color: "common.white" }}>{attributes.name}:</Box>
                <Box sx={{ color: "error.main", ml: 1 }}>
                  {attributes.value}
                </Box>
                <Box sx={{ color: "primary.main", ml: 1 }}>
                  ({attributes.info})
                </Box>
              </Stack>
            );
          })}
        </Marquee>
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
            color: "common.gray",
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
