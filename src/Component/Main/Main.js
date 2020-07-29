import React, { Component } from "react";
import login from "../Login/Login"
import "./Main.css";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemName: "",
      items: [],
      quantity: 1,
    };
  }

  addItem = (event) => {
    console.log("button clicked");
    this.setState({
      items: [...this.state.items, this.state.itemName], //add item to the array study (...)spread operator
    });
    this.state.itemName = "";
  };

  changeHandler = (event) => {
    this.setState(
      {
        itemName: event.target.value,
      },
      () => {
        // console.log(this.state.itemName);
      }
    );
  };
  increment = (event) => {
    this.setState((prevState) => ({
      quantity: prevState.quantity + 1,
    }));
  };
  decrement = (event) => {
    this.setState((prevState) => ({
      quantity: prevState.quantity - 1,
    }));
  };

  render() {
    const { itemName, items, quantity } = this.state;
    return (
      <div className="to-do-main">
        <main>
          <div className="search-item">
            <form>
              <input
                type="text"
                id="add-item"
                value={itemName}
                placeholder="Add items"
                onChange={this.changeHandler}
              />
              <button type="button" onClick={this.addItem}>
                {" "}
                Add Item{" "}
              </button>
            </form>
          </div>
          <ul>
            {items.map((value, index) => (
              <li key={index}>
                <div className="item-details">
                  <div className="action">
                    <div>
                      <label>{value}</label>
                    </div>
                    <div className="action-input">
                      <button type="button" onClick={this.decrement}>
                        {" "}
                        -{" "}
                      </button>
                      <input type="text" value={quantity} disabled="true" />
                      <button type="button" onClick={this.increment}>
                        {" "}
                        +{" "}
                      </button>
                    </div>
                  </div>
                  <div>
                    <p>Rate/kg</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>
    );
  }
}

export default Main;
