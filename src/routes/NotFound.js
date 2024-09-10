import { Component } from '../core/setup'

export default class NotFound extends Component {
    render() {
        this.el.classList.add('container','not-found')
        this.el.innerHTML = `
            <img src="https://i.imgur.com/kz3Yma3.png">
            <h1>
                <span>404</span><br>
                Page Not Found ;(
            </h1>
        `
    }
}