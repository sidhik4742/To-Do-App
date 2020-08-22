import React, { useState } from "react";
import login from "../Login/Login";
import "./Main.css";
import ItemEditing from "./ItemEditing";
import Header from "../Header/Header";

function Main(props) {
  const items = props.items || JSON.parse(sessionStorage.getItem("itemList"));
  const setItems = props.setItems;
  const [copyItems, setCopyItems] = useState(
    JSON.parse(sessionStorage.getItem("itemList"))
  );

  const [calculateItem, setCalculateItem] = useState(
    JSON.parse(sessionStorage.getItem("itemList"))
  );
  const [searchItem, setSearchItem] = useState("");
  const [selectItem, setSelectItem] = useState();
  const [showHide, setShowHide] = useState(false);

  // console.log(items);
  // console.log(copyItems);
  // console.log(calculateItem);
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
    const checkedId = parseInt(event.target.dataset.id);
    const checkedIndex = parseInt(event.target.dataset.index);
    // console.log(btnId);
    let newItems = [...items]; //*? checkedIndex
    let newCalculateItem = [...calculateItem]; //*? checkedId
    newItems[checkedIndex].currentStatus = event.target.checked;
    newCalculateItem[checkedId].currentStatus = event.target.checked;
    setItems(newItems);
    setCalculateItem(newCalculateItem);
  };
  const changeHandler = (event) => {
    let searchData = event.target.value;
    // console.log(searchData)
    setSearchItem((event.target.name = event.target.value));
    let newItems = [...calculateItem];
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
    const btnIndex = parseInt(event.target.dataset.index);
    console.log(btnId);
    console.log(btnIndex);
    let newItems = [...items]; //*? btnIndex
    let newCalculateItem = [...calculateItem]; //*? btnId
    let copyItem = [...copyItems];

    if (
      newItems[btnIndex].type === "Rate/kg" ||
      newItems[btnIndex].type === "Rate/li"
    ) {
      newItems[btnIndex].quantity = newItems[btnIndex].quantity + 0.1;
      newItems[btnIndex].rate = (
        (newItems[btnIndex].quantity * copyItem[btnId].rate) /
        1
      ).toFixed(1);
      newCalculateItem[btnId].quantity = newItems[btnIndex].quantity;
      newCalculateItem[btnId].rate = newItems[btnIndex].rate;
    } else if (newItems[btnIndex].type === "Rate/qty") {
      newItems[btnIndex].quantity = newItems[btnIndex].quantity + 1;
      newItems[btnIndex].rate =
        copyItem[btnId].rate * newItems[btnIndex].quantity;
      newCalculateItem[btnId].quantity = newItems[btnIndex].quantity;
      newCalculateItem[btnId].rate = newItems[btnIndex].rate;
    }
    setItems(newItems);
    setCalculateItem(newCalculateItem);

    // console.log(items);
  };
  const decrement = (event) => {
    const btnId = parseInt(event.target.dataset.id);
    const btnIndex = parseInt(event.target.dataset.index);
    console.log(btnId);
    console.log(btnIndex);
    let newItems = [...items]; //*? btnIndex
    let newCalculateItem = [...calculateItem]; //*? btnId
    let copyItem = [...copyItems];

    if (newItems[btnIndex].quantity < 0.1) {
      newItems[btnIndex].quantity = 0;
    } else {
      if (
        newItems[btnIndex].type === "Rate/kg" ||
        newItems[btnIndex].type === "Rate/li"
      ) {
        newItems[btnIndex].quantity = newItems[btnIndex].quantity - 0.1;
        newItems[btnIndex].rate = (
          (newItems[btnIndex].quantity * copyItem[btnId].rate) /
          1
        ).toFixed(1);
        newCalculateItem[btnId].quantity = newItems[btnIndex].quantity;
        newCalculateItem[btnId].rate = newItems[btnIndex].rate;
      } else if (newItems[btnIndex].type === "Rate/qty") {
        newItems[btnIndex].quantity = newItems[btnIndex].quantity - 1;
        newItems[btnIndex].rate =
          copyItem[btnId].rate * newItems[btnIndex].quantity;
        newCalculateItem[btnId].quantity = newItems[btnIndex].quantity;
        newCalculateItem[btnId].rate = newItems[btnIndex].rate;
      }
    }
    setItems(newItems);
    setCalculateItem(newCalculateItem);
  };

  return (
    <div>
      <div>
        <Header items={items} setItems={setItems} setCopyItems={setCopyItems} />
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
                            data-index={index}
                            data-id={item._id}
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
                            data-index={index}
                            data-id={item._id}
                            onClick={decrement}
                          >
                            {" "}
                            -{" "}
                          </button>
                          <input
                            type="text"
                            value={item.quantity.toFixed(1)}
                            onChange={changeHandler}
                            disabled
                          />
                          <button
                            type="button"
                            data-index={index}
                            data-id={item._id}
                            onClick={increment}
                          >
                            {" "}
                            +{" "}
                          </button>
                        </div>
                      )}
                    </div>
                    <div>
                      <p>
                        {item.type} : {item.rate}
                      </p>
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
