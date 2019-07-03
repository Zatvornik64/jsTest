import React from 'react';
import ReactDOM from 'react-dom';


const items = [
  {
    id: 1,
    text: 'option 1'
  },
  {
    id: 2,
    text: 'option 2'
  },
  {
    id: 3,
    text: 'option 3'
  },
  {
    id: 4,
    text: 'option 4'
  },
  {
    id: 5,
    text: 'option 5'
  }
];

class LeftBlock extends React.Component {
  render() {
  return (
    <div className="left-unit">
      <b>Available</b>
      <div className="left-items items">
        <div className="block">Option 1</div>
        <div className="block">Option 2</div>
        <div className="block">Option 3</div>
      </div>
    </div>
  )
}}

class CenterBlock extends React.Component {
  render() {
  return (
    <div className="center-unit">
      <div className="all-to-right btn"> {String.fromCharCode(62)}{String.fromCharCode(62)} </div>
      <div className="to-right btn"> {String.fromCharCode(62)} </div>
      <div className="to-left btn"> {String.fromCharCode(60)} </div>
      <div className="all-to-left btn"> {String.fromCharCode(60)}{String.fromCharCode(60)} </div>
    </div>
  )
}}

class RightBlock extends React.Component {
  render() {
  return (
    <div className="right-unit">
      <b>Selected</b>
      <div className="right-items items">
        <div className="block">Option 4</div>
        <div className="block">Option 5</div>
      </div>
    </div>
  )
}}

const App = () => {
  return (
    <React.Fragment>
      <LeftBlock />
      <CenterBlock/>
      <RightBlock/>
    </React.Fragment>
  )
}

ReactDOM.render(
  <App />,
  document.querySelector('.butterfly-control')
);
