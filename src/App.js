import { Component } from './core/setup'
import Nav from './components/Nav'

export default class App extends Component {
    render() {
        const nav = new Nav().el
        const routerView = document.createElement('router-view')
        this.el.append(
            nav,
            routerView
        )
    }
}