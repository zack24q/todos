import React, {Component} from 'react';
import '../../styles/List.css';
import TYPE from '../../filterType'
import Item from '../../components/Item'
import Bar from '../../components/Bar'

class List extends Component {
    constructor(props) {
        super(props);
        let storage = localStorage.getItem('todolist');
        this.state = {
            TYPE,
            inputContent: '',
            filterType: TYPE.all,
            list: (storage && JSON.parse(storage)) || []
        }
    }

    componentDidUpdate() {
        localStorage.setItem('todolist', JSON.stringify(this.state.list))
    }

    // computed
    filterList() {
        switch (this.state.filterType) {
            case TYPE.all:
                return this.state.list;
            case TYPE.active:
                return this.state.list.filter(item => !item.done);
            case TYPE.completed:
                return this.state.list.filter(item => item.done);
            default :
                return this.state.list;
        }
    }

    allDone() {
        let flag = true;
        for (let item of this.state.list) {
            if (!item.done) {
                flag = false;
                break
            }
        }
        return flag
    }

    sumDone() {
        let count = 0;
        for (let item of this.state.list) {
            if (!item.done) {
                count++
            }
        }
        return count
    }

    // methods
    addItem(content, event) {
        if (event.keyCode === 13) {
            if (content === '') return;
            this.state.list.push({id: new Date().getTime(), content, done: false});
            this.setState({
                inputContent: ''
            })
        }
    }

    toggleItem(item) {
        item.done = !item.done;
        this.forceUpdate()
    }

    deleteItem(item) {
        let i = this.state.list.findIndex(temp => temp === item);
        this.state.list.splice(i, 1);
        this.forceUpdate()
    }

    toggleAll() {
        let temp = !this.allDone();
        for (let item of this.state.list) {
            item.done = temp
        }
        this.forceUpdate()
    }

    clearComputed() {
        for (let item of this.state.list.filter(item => item.done)) {
            this.deleteItem(item)
        }
        this.forceUpdate()
    }

    filterClass(type) {
        return this.state.filterType === type ? 'selected' : ''
    }

    changeFilter(type) {
        this.setState({
            filterType: type
        })
    }

    render() {
        return (
            <div className="todo-list">
                <h1 className="title">Todos</h1>
                <div className="content">
                    <div className="input-box">
                        <div className="checkbox" onClick={this.toggleAll.bind(this)}>
                            <span className={`arrow${this.allDone() ? ' enable' : ''}`}>❯</span>
                        </div>
                        <input type="text" placeholder="What needs to be done?"
                               value={this.state.inputContent}
                               onChange={event => this.setState({inputContent: event.target.value})}
                               onKeyUp={this.addItem.bind(this, this.state.inputContent)}/>
                    </div>
                    <div>
                        {
                            this.filterList().map((item, i) => {
                                return <Item key={i} value={item}
                                             toggle={this.toggleItem.bind(this, item)}
                                             delete={this.deleteItem.bind(this, item)}></Item>
                            })
                        }
                    </div>
                    <Bar sumDone={this.sumDone()} filterClass={this.filterClass.bind(this)}
                         changeFilter={this.changeFilter.bind(this)}
                         clearComputed={this.clearComputed.bind(this)}></Bar>
                </div>
            </div>
        );
    }
}

export default List;
