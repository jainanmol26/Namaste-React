
import RestaurantCard from "../RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listofRestaurant, setListofRestaurant] = useState([]);
  const [filteredRestaurant, setfilteredRestaurant] = useState([]);
  const [searchText, setsearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=29.47420&lng=77.70270&carousel=true&third_party_vendor=1"
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const json = await response.json();

      console.log("Swiggy API Response:", json);

      const restaurants =
        json?.data?.cards
          ?.map((card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants)
          ?.find((restaurants) => restaurants?.length > 0) || [];

      console.log("Restaurants:", restaurants);

      setListofRestaurant(restaurants);
      setfilteredRestaurant(restaurants);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  if (listofRestaurant.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">

      <div className="filter">

        <div className="search">

          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => setsearchText(e.target.value)}
          />

          <button
            onClick={() => {
              const filteredList = listofRestaurant.filter((res) =>
                res?.info?.name
                  ?.toLowerCase()
                  .includes(searchText.toLowerCase())
              );

              setfilteredRestaurant(filteredList);
            }}
          >
            Search
          </button>

        </div>

        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listofRestaurant.filter(
              (res) => res?.info?.avgRating > 4
            );

            setfilteredRestaurant(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>

      </div>

      <div className="Restaurant-Container">

        {filteredRestaurant.map((restaurant) => (
          <RestaurantCard
            key={restaurant?.info?.id}
            resdata={restaurant}
          />
        ))}

      </div>

    </div>
  );
};

export default Body;

