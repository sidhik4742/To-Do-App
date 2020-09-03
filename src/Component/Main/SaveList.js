import React, { useEffect, useState, useRef } from "react";
import "./SaveList.css";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function SaveList() {
  const history = useHistory();
  const [savedList, setSavedList] = useState([]);

  const classRef = useRef([]);
  const scaleUpRef = useRef([]);
  const scaleDownRef = useRef([]);

  useEffect(() => {
    Axios({
      method: "get",
      url: "http://localhost:3001/todoapp/main/display/savelist",
    })
      .then((response) => {
        // console.log(response.data);
        setSavedList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const backButtonAction = () => {
    history.push("/todoapp/main");
  };

  const tableExpand = (index) => {
    // console.log(scaleUpRef.current[index]);
    // console.log(scaleDownRef.current[index]);

    let scaleUp = scaleUpRef.current[index];
    let scaleDown = scaleDownRef.current[index];
    let body = classRef.current[index];
    scaleUp.style.display = "none";
    scaleDown.style.display = "block";
    body.style.display = "block";
    console.log(body);
  };

  const tableReduce = (index) => {
    scaleDownRef.current[index].style.display = "none";
    scaleUpRef.current[index].style.display = "block";
    let body = classRef.current[index];
    body.style.display = "none";
    console.log(body);
  };

  console.log(savedList);

  return (
    <div>
      <div className="savedlist">
        {savedList.map((list, index) => (
          <div key={index} className="itemDiv">
            <div className="head">
              <div>
                <label>
                  Total Rate : <span>&#x20B9;</span>
                  {list.TotalRate}
                </label>
              </div>
              <div className="icon">
                <i
                  onClick={() => tableExpand(index)}
                  ref={(el) => (scaleUpRef.current[index] = el)}
                  className="fa fa-plus-circle fa-2x scaleUp"
                  aria-hidden="true"
                ></i>
                <i
                  onClick={() => tableReduce(index)}
                  ref={(el) => (scaleDownRef.current[index] = el)}
                  className="fa fa-minus-circle fa-2x scaleDown"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
            <div
              ref={(el) => (classRef.current[index] = el)}
              data-id={index}
              className="showbody"
            >
              <table>
                <thead>
                  <tr>
                    <td>Item</td>
                    <td>Qty</td>
                    <td>Rate</td>
                  </tr>
                </thead>
                <tbody>
                  {list.SavedList.map((item, id) => (
                    <tr key={id}>
                      <td>{item.itemName}</td>
                      <td>
                        {item.quantity} {item.type}
                      </td>
                      <td>{item.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      <div className="footer_saveList">
        <i
          className="fa fa-arrow-circle-left fa-2x"
          aria-hidden="true"
          onClick={backButtonAction}
        ></i>
      </div>
    </div>
  );
}

export default SaveList;
