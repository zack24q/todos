import React, {PureComponent} from 'react';
import '../../styles/Item.css';

class Item extends PureComponent {
    render() {
        return (
            <div className={`item${this.props.value.done ? ' done' : ''}`}>
                <div className="checkbox" onClick={this.props.toggle}>
                    {
                        this.props.value.done && <span>✓</span>
                    }
                </div>
                {this.props.value.content}
                <div className="delete" onClick={this.props.delete}>X</div>
            </div>
        );
    }
}

export default Item;
