import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={455}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="138" cy="138" r="138" />
    <rect x="0" y="296" rx="10" ry="10" width="280" height="20" />
    <rect x="0" y="340" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="456" rx="10" ry="10" width="90" height="30" />
    <circle cx="157" cy="471" r="17" /> 
    <circle cx="206" cy="471" r="17" /> 
    <circle cx="256" cy="471" r="17" />
  </ContentLoader>
);

export default Skeleton;
