import { Component } from './core/setup'
import Nav from './components/Nav'

export default class App extends Component {
    render() {
        const routerView = document.createElement('router-view')
        this.el.append(
            routerView
        )

        
    }
}