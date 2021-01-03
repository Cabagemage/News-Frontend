import React, {Component} from "react";
import  "./preloader/preloader.css";

class Preloader extends Component {
  constructor(props) {
    super(props)
    this.viewRef = React.createRef()  }

render(){
  return(
    <i ref={this.viewRef} className="circle-preloader"></i>
  );
}
componentWillUnmount(){
  this.viewRef.current.style.opacity= 0

}
}

export default Preloader;
