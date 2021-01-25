import React, { useState } from "react";

import Preloader from "../Preloader/Preloader";

const LoaderComponent = (WrappedComponent) => {
  function Loader(props) {
    const [isLoad, setLoad] = useState(true);

    const setLoadingState = (isComponentLoad) => {
      setLoad(isComponentLoad);
    };
    return (
      <>
        {isLoad && <Preloader />}
        <WrappedComponent {...props} setLoad={setLoadingState} />
      </>
    );
  }

  return Loader
};

export default LoaderComponent