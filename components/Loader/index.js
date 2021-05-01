import React from "react";
import { Circle } from "better-react-spinkit";

import { Container, Image } from "./Elements";

const Loader = () => {
  return (
    <Container>
      <div>
        <Image
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt="noImg"
        />
        <Circle color="#3CBC28" size={60} />
      </div>
    </Container>
  );
};

export default Loader;
