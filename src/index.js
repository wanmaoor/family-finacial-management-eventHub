import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";

import "./styles.css";

let reducers = (state = { money: { amount: 10000 } }, action) => {
  switch (action.type) {
    case "我想花钱":
      return {
        money: {
          amount: state.money.amount - action.payload
        }
      };
    default:
      return state;
  }
};
let store = createStore(reducers);

class App extends React.Component {
  render() {
    return (
      <div className="root">
        <BigPapa money={this.props.store.money} />
        <YoungPapa money={this.props.store.money} />
      </div>
    );
  }
}

class BigPapa extends React.Component {
  render() {
    return (
      <div className="papa">
        大爸 {this.props.money.amount}
        <Son1 money={this.props.money} />
        <Son2 money={this.props.money} />
      </div>
    );
  }
}
class YoungPapa extends React.Component {
  render() {
    return (
      <div className="papa">
        二爸 {this.props.money.amount}
        <Son3 money={this.props.money} />
        <Son4 money={this.props.money} />
      </div>
    );
  }
}
class Son1 extends React.Component {
  render() {
    return <div className="son">1儿子{this.props.money.amount}</div>;
  }
}
class Son2 extends React.Component {
  consume = () => {
    store.dispatch({ type: "我想花钱", payload: 100 });
  };
  render() {
    return (
      <div className="son">
        2儿子{this.props.money.amount}
        <button onClick={() => this.consume()}>消费</button>
      </div>
    );
  }
}
class Son3 extends React.Component {
  render() {
    return <div className="son">3儿子{this.props.money.amount}</div>;
  }
}
class Son4 extends React.Component {
  render() {
    return <div className="son">4儿子{this.props.money.amount}</div>;
  }
}
const rootElement = document.getElementById("root");
function render() {
  ReactDOM.render(<App store={store.getState()} />, rootElement);
}
render();
store.subscribe(render);
