import React, { useEffect, useState } from "react";
import "./CheckOut.css";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function CheckOut(props) {
  // console.log(props);
  const history = useHistory();
  const calculateItem = props.calculateItem;
  const setItems = props.setItems;
  const [listItem, setListItem] = useState([]);
  const [totalRate, setTotalRate] = useState(0);

  useEffect(() => {
    calculateItem.forEach((item) => {
      if (item.currentStatus) {
        setListItem((listItem) => [...listItem, item]);
        // console.log(item);
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

  const cancel = () => {
    setItems(JSON.parse(sessionStorage.getItem("itemList")));
    history.push("/todoapp/main");
  };

  const saveList = () => {
    Axios({
      method: "put",
      url: "http://localhost:3001/todoapp/main/savelist",
      data: {
        "SavedList": listItem,
        "TotalRate": totalRate,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          alert(error.response.data);
        }
      });
  };

  const checkOut = () => {
    setItems(JSON.parse(sessionStorage.getItem("itemList")));
    alert("Thank you for shopping");
    history.push("/todoapp/main");
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
      <div className="checkoutFooter">
        <div className="totalRate">
          <label>
            Total : <span>&#x20B9;</span>
            {totalRate}
          </label>
        </div>
        <div className="actionBtn">
          <button onClick={cancel}>Cancel</button>
          <button onClick={saveList}>Save list</button>
          <button onClick={checkOut}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
