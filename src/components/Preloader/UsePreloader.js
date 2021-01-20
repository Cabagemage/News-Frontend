import React, {useState} from "react";
import  "./preloader/preloader.css";
import Preloader from "./Preloader"

const UsePreloader = () =>{
  const [isLoad, setLoader] = useState(false)

  const showLoader = () =>{
    setLoader(true)
  }
  const hideLoader = () =>{
    setLoader(false)
  }
  const Loader = isLoad ? <Preloader /> : null

  return [Loader, showLoader, hideLoader]
}

export default UsePreloader;
