import React, { useState } from "react";
import { useHistory } from "react-router";
import "./ItemCreating.css";
import Axios from "axios";

function ItemCreating(props) {
  // console.log(props);
  const history = useHistory();
  const items = props.items;
  const setItems = props.setItems;
  const setCopyItems = props.setCopyItems;
  const setShowHideCreateItem = props.setShowHideCreateItem;
  // const [rateType, setRateType] = useState("Rate/kg");
  const [createItem, setCreateItem] = useState({
    currentStatus: false,
    itemName: "",
    quantity: 1,
    rate: 0,
    type: "Rate/kg",
    model: "",
  });
  // console.log(createItem);
  // console.log(items);

  const navbarColse = () => {
    setShowHideCreateItem(false); //*?Hide pop up screen in the main.js //
  };

  const modelSelection = (event) => {
    let index = event.target.selectedIndex;
    let optionElement = event.target.childNodes[index].value;
    // console.log(optionElement);
    setCreateItem({ ...createItem, model: optionElement });
  };
  const changeHandler = (event) => {
    // let newCreateItem = [...createItem];
    setCreateItem({ ...createItem, [event.target.name]: event.target.value });
  };
  const createItems = (event) => {
    event.preventDefault();
    if (
      createItem.itemName !== "" &&
      createItem.rate !== 0 &&
      createItem.model !== ""
    ) {
      // console.log("item created button");
      setItems([...items, createItem]);
      setShowHideCreateItem(false);  //*?Hide pop up screen in the main.js //
      Axios({
        method: "put",
        url: "http://localhost:3001/todoapp/main/addItem",
        data: createItem,
      }).then((response) => {
        // console.log(response.data);
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
            alert("Successfully added to your list");
            history.push("/todoapp/main");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  };
  return (
    <div className="creatItemScreen">
      <div className="closeBtn">
        <i
          className="fa fa-times fa-1x"
          aria-hidden="true"
          onClick={navbarColse}
        ></i>
      </div>
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
          <label>{createItem.type} in Rs</label>
          <input
            type="text"
            name="rate"
            value={createItem.rate}
            onChange={changeHandler}
          />
        </div>
        <div>
          <select className="model" onChange={modelSelection}>
            <option value="" key="0">
              Choose model...
            </option>
            <option value="stationeryItems" key="1">
              stationery Items
            </option>
            <option value="Custom" key="2">
              Custom
            </option>
          </select>
        </div>
        <button onClick={createItems}>Create</button>
      </form>
    </div>
  );
}

export default ItemCreating;
