import { useState } from 'react'

const ImageLoader = (props) => {
	const [loaded, setLoaded] = useState(false);
  
	const loadingImgStyle = {
	  display: loaded ? "none" : undefined
	};
  
	const displayImgStyle = {
	  display: loaded ? undefined : "none"
	};
  
	return (
	  <>
		<img src={'/loading.gif'} style={loadingImgStyle} alt={"Loading"} />
		<img
		  src={props.src}
		  alt="loadable"
		  style={displayImgStyle}
		  onLoad={() => setLoaded(true)}
		/>
</>
	);
  };
  
  export default ImageLoader;