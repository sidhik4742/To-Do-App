import React, { useState, useEffect } from "react";
import login from "../Login/Login";
import "./Main.css";

function Main(props) {
  const items = props.items || JSON.parse(sessionStorage.getItem("itemList"));
  const copyItems = JSON.parse(sessionStorage.getItem("itemList"));
  const setItems = props.setItems;
  const [searchItem, setSearchItem] = useState("");

  const searchItemFun = (event) => {
    console.log("button clicked");
  };
  const changeHandler = (event) => {
    let searchData = event.target.value;
    // console.log(searchData)
    setSearchItem((event.target.name = event.target.value));
    let newItems = [...copyItems];
    // console.log(newItems);
    newItems = newItems.filter((item) => {
      return item.itemName.toLowerCase().search(searchData.toLowerCase()) != -1;
    });
    setItems(newItems);
    // console.log("filter result ");
    // console.log(items);
  };
  const increment = (event) => {
    const btnId = parseInt(event.target.dataset.id);
    let newItems = [...items];
    // console.log(newItems);
    newItems[btnId].quantity = newItems[btnId].quantity + 1;
    setItems(newItems);
    // console.log(items);
  };
  const decrement = (event) => {
    const btnId = parseInt(event.target.dataset.id);
    let newItems = [...items];
    if (newItems[btnId].quantity <= 0) {
      newItems[btnId].quantity = 0;
    } else {
      newItems[btnId].quantity = newItems[btnId].quantity - 1;
    }
    setItems(newItems);
  };

  return (
    <div className="to-do-main">
      <main>
        .
        <div className="search-item">
          <form>
            <div>
              <span>
                <i className="fa fa-search" aria-hidden="true"></i>

                <input
                  type="text"
                  id="add-item"
                  value={searchItem}
                  placeholder="Search items"
                  onChange={changeHandler}
                />
              </span>
            </div>
            <button type="button" onClick={searchItemFun}>
              {" "}
              Search Item{" "}
            </button>
          </form>
        </div>
        <div className="item-list">
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <div className="item-details">
                  <div className="action">
                    <div>
                      <label>{item.itemName}</label>
                    </div>
                    <div className="action-input">
                      <button type="button" data-id={index} onClick={decrement}>
                        {" "}
                        -{" "}
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={changeHandler}
                        disabled
                      />
                      <button type="button" data-id={index} onClick={increment}>
                        {" "}
                        +{" "}
                      </button>
                    </div>
                  </div>
                  <div>
                    <p>Rate/kg: {item.rate}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

// 0: {itemName: "Boost", quantity: "1kg", rate: "300 rs"}
// 1: {itemName: "Horlicks", quantity: "1kg", rate: "320 rs"}

export default Main;
