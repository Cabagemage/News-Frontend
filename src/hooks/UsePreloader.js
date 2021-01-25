import React, {useState} from "react";
import  "../components/Preloader/preloader/preloader.css";
import Preloader from "../components/Preloader/Preloader"

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
