import React, { useState } from "react";
import "./ItemCreating.css";
import Axios from "axios";

function ItemCreating(props) {
  console.log(props);
  const items = props.items;
  const setItems = props.setItems;
  const setCopyItems = props.setCopyItems;
  const setShowHideCreateItem = props.setShowHideCreateItem;
  const [rateType, setRateType] = useState("Rate/kg");
  const [createItem, setCreateItem] = useState({
    currentStatus: false,
    itemName: "",
    quantity: 1,
    rate: 0,
    type: "Rate/kg",
  });
  console.log(createItem);
  // console.log(items);
  const changeHandler = (event) => {
    // let newCreateItem = [...createItem];
    setCreateItem({ ...createItem, [event.target.name]: event.target.value });
  };
  const createItems = (event) => {
    event.preventDefault();
    if (createItem.itemName !== "" && createItem.rate !== 0) {
      console.log("item created button");
      setItems([...items, createItem]);
      setShowHideCreateItem(false);
      Axios({
        method: "put",
        url: "http://localhost:3001/todoapp/main/addItem",
        data: createItem,
      }).then((response) => {
        console.log(response.data);
        Axios({
          method: "get",
          url: "http://localhost:3001/todoapp/display",
        })
          .then((response) => {
            console.log("success");
            console.log(response.data);
            const itemList = response.data;
            setItems(itemList);
            setCopyItems(itemList);
            sessionStorage.setItem("itemList", JSON.stringify(itemList));
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  };
  return (
    <div className="creatItemScreen">
      <form>
        <div className="itemname">
          <label>Item Name</label>
          <input
            type="text"
            name="itemName"
            value={createItem.itemName}
            onChange={changeHandler}
          />
        </div>
        <div className="rateSelector" onChange={changeHandler}>
          <input type="radio" value="Rate/kg" name="type" defaultChecked />
          Rate/kg
          <input type="radio" value="Rate/qty" name="type" /> Rate/qty
          <input type="radio" value="Rate/li" name="type" /> Rate/li
        </div>
        <div className="rate">
          <label>{rateType} in Rs</label>
          <input
            type="text"
            name="rate"
            value={createItem.rate}
            onChange={changeHandler}
          />
        </div>
        <button onClick={createItems}>Create</button>
      </form>
    </div>
  );
}

export default ItemCreating;
