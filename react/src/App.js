import React, {PureComponent} from 'react';
import './styles/App.css';
import List from './components/List'

class App extends PureComponent {
    render() {
        return (
            <div id="App">
                <List/>
            </div>
        );
    }
}

export default App;
