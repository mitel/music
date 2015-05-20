import 'main.css';
import React from 'react';
import stateTree from 'stateTree.js';
import App from 'components/App.js';

import setInputValue from 'actions/setInputValue.js';
import addItem from 'actions/addItem.js';

import 'supersonic/css/supersonic.css';
import 'supersonic/supersonic.core.js';

import Router, {Route, RouteHandler, DefaultRoute} from 'react-router';

stateTree.signal('inputValueChanged', setInputValue);
stateTree.signal('inputValueSubmitted', addItem);

let Wrapper = stateTree.injectInto(App);

var About = React.createClass({ // native left drawer - steroids/config/structure.coffee
    render: function () {
        return (
            <div className="list">
                <a className="item item-icon-left" href="#">
                    <i className="icon super-email"></i>
                    Check mail
                </a>
                <a className="item item-icon-left item-icon-right" href="#">
                    <i className="icon super-chatbubble-working"></i>
                    Call Ma
                    <i className="icon super-ios7-telephone-outline"></i>
                </a>
                <a className="item item-icon-left" href="#">
                    <i className="icon super-mic-a"></i>
                    Record album
                        <span className="item-note">
                          Grammy
                        </span>
                </a>
                <a className="item item-icon-left" href="#">
                    <i className="icon super-person-stalker"></i>
                    Friends
                    <span className="badge badge-assertive">0</span>
                </a>
            </div>
        );
    }
});

// declare our routes and their hierarchy
// addresable in browser and supersonic native components: /#/about
var routes = (
    <Route handler={TestS}>
        <DefaultRoute handler={Wrapper}/>
        <Route path="about" handler={About}/>
    </Route>
);

export default class TestS extends React.Component {
    render() {
        return (
            <div>
                <RouteHandler/>
            </div>
        )
    }
}

Router.run(routes, Router.HashLocation, (Root) => {
    React.render(<Root/>, document.querySelector('#app'));
});