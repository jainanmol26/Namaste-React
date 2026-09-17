import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import { menuApi } from "../utils/constants";
const RestaurantMenu =() =>{
  const [resInfo, setresInfo] = useState(null);
  const {resId} = useParams();
  useEffect(()=>{
    fetchMenu()
  },[])
  const fetchMenu = async () => {
    const data= await fetch(menuApi + resId);
    const json = await data.json();
   
    setresInfo(json);
    console.log(resInfo);
  };
  
  return resInfo == null ? <Shimmer></Shimmer> : (
    <div className="menu">
      <h1>{resInfo.restaurant.name}</h1>
      <p>
        {resInfo.restaurant.cuisines.join(", ")}
      </p>
      <h2>Menu</h2>
      <ul>
       { resInfo.menu.map((item)=> <li key={item.id}>{item.name} - Rs{item.price}</li>)}
      </ul>

    </div>
  )
}

export default RestaurantMenu;