import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth.js';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";


const BubblePage = () => {
  //atate for our list of colors
  const [colorList, setColorList] = useState([]);
  //fetches the list of colors on render of components
  useEffect(()=>{
    axiosWithAuth()
    .get('/api/colors')
    .then(res => setColorList(res.data))
    .catch(err => console.log(`Error: ${err}`))


  },[])

  return (
    <>
    {/* List of colors */}
      <ColorList colors={colorList} updateColors={setColorList} />
      {/* LBubbles of colors */}
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
