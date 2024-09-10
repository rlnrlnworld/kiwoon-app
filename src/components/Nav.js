import { Component } from "../core/setup";

export default class Nav extends Component {
    constructor() {
        super({
            tagName: 'nav',
            state: {
                title: 'Home'
            }
        })
    }
    render() {
        this.el.innerHTML = `
            <a><span class="material-symbols-outlined">
            menu
            </span></a>
            <div class=title>${this.state.title}</div>
            <a><span class="material-symbols-outlined">
            settings
            </span></a>
        `
    }
}