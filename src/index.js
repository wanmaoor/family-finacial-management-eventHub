import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

let money = {
  amount: 100000
};
let eventLists = {};
let eventHub = {
  trigger(eventName, data) {
    eventLists[eventName].forEach(eventList => {
      eventList(data);
    });
  },
  on(eventName, fn) {
    if (!eventLists[eventName]) {
      eventLists[eventName] = [];
    }
    eventLists[eventName].push(fn);
  }
};
let store = {
  init() {
    eventHub.on("我想花钱", data => {
      money.amount -= data;
      render();
    });
  }
};
store.init();
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      money: money
    };
  }

  render() {
    return (
      <div className="root">
        <BigPapa money={this.state.money} />
        <YoungPapa money={this.state.money} />
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
    eventHub.trigger("我想花钱", 250);
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
  ReactDOM.render(<App />, rootElement);
}
render();
