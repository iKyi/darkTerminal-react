import { Box } from "@mui/material";
import videoLazyLoadImage from "../../assets/images/videoLazyLoadImage.png";

export type HomeVideoBoxPropsType = {};

const HomeVideoBox: React.VFC<HomeVideoBoxPropsType> = () => {
  const introVideoUrl = "https://www.youtube.com/embed/qyD5H7m_sOs?controls=0";
  // *************** RENDER *************** //
  return (
    <Box>
      <iframe
        width="100%"
        height="280"
        src={`${introVideoUrl}`}
        srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${introVideoUrl}><img src=${videoLazyLoadImage} alt='Video Dark Terminal'><span>▶</span></a>`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video Dark Terminal"
      />
    </Box>
  );
};

export default HomeVideoBox;
