const RestaurantCard = (props) => {
  const { resdata } = props;
  const { info } = resdata;

  return (
    <div className="res-card">

      <img
        className="res-logo"
        src={
          "https://media-assets.swiggy.com/swiggy/image/upload/" +
          info.cloudinaryImageId
        }
      />

      <h3>{info.name}</h3>

      <h4>{info.cuisines.join(", ")}</h4>

      <h4>{info.avgRating} stars</h4>

      <h4>{info.sla.deliveryTime} minutes</h4>

      <h4>{info.costForTwo}</h4>

    </div>
  );
};

export default RestaurantCard;