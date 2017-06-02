import React, {Component} from 'react';
import '../../styles/Bar.css';
import TYPE from '../../filterType'

class Bar extends Component {
    render() {
        return (
            <div className="bar">
                <div className="left">{this.props.sumDone} items left</div>
                <div className="fill"></div>
                <div className="filter">
                    <span className={this.props.filterClass(TYPE.all)}
                          onClick={() => this.props.changeFilter(TYPE.all)}>All</span>
                    <span className={this.props.filterClass(TYPE.active)}
                          onClick={() => this.props.changeFilter(TYPE.active)}>Active</span>
                    <span className={this.props.filterClass(TYPE.completed)}
                          onClick={() => this.props.changeFilter(TYPE.completed)}>Completed</span>
                </div>
                <div className="fill"></div>
                <div className="right" onClick={this.props.clearComputed}>Clear computed</div>
            </div>
        );
    }
}

export default Bar;
