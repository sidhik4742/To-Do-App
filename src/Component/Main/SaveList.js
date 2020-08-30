import React, { useEffect, useState } from "react";
import "./SaveList.css";
import Axios from "axios";

function SaveList(props) {
  const [savedList, setSavedList] = useState([]);

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

  const tableExpand = ()=>{
      
  }

  console.log(savedList);
  return (
    <div>
      <div className="savedlist">
        {savedList.map((item, index) => (
          <div key={index} className="itemDiv">
            <div className="head">
              <label>Total Rate : {item.TotalRate}</label>
              <i onClick={tableExpand} className="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
            </div>
            <div className="body">
                <h1>table</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SaveList;
