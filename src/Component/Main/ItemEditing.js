import React, { useState } from "react";
import "./ItemEditing.css";

function ItemEditing(props) {
  //   console.log(props);
  const selectItem = props.selectItem;
  const setSelectItem = props.setSelectItem;
  const setItems = props.setItems;
  const items = props.items;
  const setShowHide = props.setShowHide;
  //   console.log(selectItem);

  const savedItems = (event) => {
    event.preventDefault();
    let newItem = [...items];
    newItem[selectItem.selectedItemId].rate = selectItem.rate;
    setItems(newItem);
    setShowHide(false); //*?Hide pop up screen in the main.js //
  };
  const changeHandler = (event) => {
    let newSelectItem = { ...selectItem };
    console.log(newSelectItem);
    newSelectItem.rate = event.target.value;
    setSelectItem(newSelectItem);
  };
  return (
    <div className="editItemScreen">
      <form>
        <div className="itemname">
          <label>Item Name</label>
          <input type="text" defaultValue={selectItem.itemName} disabled />
        </div>
        <div className="rate">
          <label>Rate/kg</label>
          <input
            type="text"
            name="rate"
            value={selectItem.rate}
            onChange={changeHandler}
          />
        </div>
        <button onClick={savedItems}>Save</button>
      </form>
    </div>
  );
}

export default ItemEditing;
