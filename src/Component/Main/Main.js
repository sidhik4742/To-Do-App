import React, { useState, useEffect } from "react";
import login from "../Login/Login";
import "./Main.css";
import ItemEditing from "./ItemEditing";
import Header from "../Header/Header";

function Main(props) {
  const items = props.items || JSON.parse(sessionStorage.getItem("itemList"));
  const copyItems = JSON.parse(sessionStorage.getItem("itemList"));
  const setItems = props.setItems;
  const [searchItem, setSearchItem] = useState("");
  const [selectItem, setSelectItem] = useState();
  const [showHide, setShowHide] = useState(false);

  // console.log(items);
  // console.log(selectItem);
  const editItemFun = (event) => {
    // console.log(event.target);
    const selectedItemId = parseInt(event.target.dataset.selecteditem);
    // console.log(selectedItemId);
    setSelectItem({
      selectedItemId: selectedItemId,
      itemName: items[selectedItemId].itemName,
      rate: items[selectedItemId].rate,
    });
    setShowHide(true);
  };

  const checkedItemFun = (event) => {
    // console.log(`${event.target.name}" "${event.target.checked}`);
    const btnId = parseInt(event.target.dataset.id);
    // console.log(btnId);
    let newItems = [...items];
    newItems[btnId].currentStatus = event.target.checked;
    setItems(newItems);
  };
  const changeHandler = (event) => {
    let searchData = event.target.value;
    // console.log(searchData)
    setSearchItem((event.target.name = event.target.value));
    let newItems = [...copyItems];
    // console.log(newItems);
    newItems = newItems.filter((item) => {
      return (
        item.itemName.toLowerCase().search(searchData.toLowerCase()) !== -1
      );
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
    <div>
      <div>
        <Header />
      </div>
      <div className="to-do-main">
        <main>
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
            </form>
          </div>
          <div className="item-list">
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  <div className="item-details">
                    <div className="action">
                      <div>
                        <label data-selecteditem={index} onClick={editItemFun}>
                          {item.itemName}
                        </label>
                      </div>
                      {!item.currentStatus ? (
                        <div className="checkbox">
                          <input
                            type="checkbox"
                            data-id={index}
                            id={item.itemName}
                            name={item.itemName}
                            value={item.itemName}
                            checked={item.currentStatus}
                            onChange={checkedItemFun}
                          />
                        </div>
                      ) : (
                        <div className="action-input">
                          <button
                            type="button"
                            data-id={index}
                            onClick={decrement}
                          >
                            {" "}
                            -{" "}
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            onChange={changeHandler}
                            disabled
                          />
                          <button
                            type="button"
                            data-id={index}
                            onClick={increment}
                          >
                            {" "}
                            +{" "}
                          </button>
                        </div>
                      )}
                    </div>
                    <div>
                      <p>Rate/kg: {item.rate}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {showHide && (
              <ItemEditing
                selectItem={selectItem}
                setSelectItem={setSelectItem}
                items={items}
                setItems={setItems}
                setShowHide={setShowHide}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// 0: {itemName: "Boost", quantity: "1kg", rate: "300 rs"}
// 1: {itemName: "Horlicks", quantity: "1kg", rate: "320 rs"}

export default Main;
