import { Component } from '../core/setup'

export default class NotFound extends Component {
    render() {
        this.el.classList.add('container','not-found')
        this.el.innerHTML = `
            <img src="../img/404_notfound.png">
            <h2>
                <span>404</span><br>
                Page Not Found ;(
            </h2>
        `
    }
}