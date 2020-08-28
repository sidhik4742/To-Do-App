import React, { useEffect, useState } from "react";
import "./CheckOut.css";

function CheckOut(props) {
  console.log(props);
  const calculateItem = props.calculateItem;
  const [listItem, setListItem] = useState([]);
  const [totalRate, setTotalRate] = useState(0);

  useEffect(() => {
    calculateItem.forEach((item) => {
      if (item.currentStatus) {
        setListItem((listItem) => [...listItem, item]);
        console.log(item);
      }
    });
  }, [calculateItem]);
  useEffect(() => {
    let totalRate = listItem.reduce(
      (totalRate, individualRate) => totalRate + parseInt(individualRate.rate),
      0
    );
    setTotalRate(totalRate);
  }, [listItem]);

  const saveList = () => {
    
  };

  const removeItem = (id) => {
    const newList = listItem.filter((item) => item._id !== id);
    setListItem(newList);
  };
  // console.log(listItem);
  return (
    <div className="checkout">
      <div className="itemTable">
        <table>
          <thead>
            <tr key="0">
              <td>Item</td>
              <td>Qty</td>
              <td>Rate</td>
              <td>Remove</td>
            </tr>
          </thead>
          <tbody>
            {listItem.map((item, index) => (
              <tr key={index}>
                <td>{item.itemName}</td>
                <td>
                  {item.quantity.toFixed(2)} {item.type}
                </td>
                <td>&#x20B9; {item.rate}</td>
                <td>
                  <i
                    className="fa fa-trash-o"
                    aria-hidden="true"
                    onClick={() => removeItem(item._id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="totalRate">
        <label>
          Total : <span>&#x20B9;</span>
          {totalRate}
        </label>
        <button onClick={saveList}>Save list</button>
      </div>
    </div>
  );
}

export default CheckOut;
