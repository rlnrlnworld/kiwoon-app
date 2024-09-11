import { Component } from '../core/setup';

export default class PlusLizard extends Component {
    render () {
        this.el.innerHTML = `
            <img class="btn_plus" src = "https://i.imgur.com/OKPJzUf.png">
        `

        this.el.querySelector('.btn_plus').addEventListener('click', () => {
            window.location.hash = '#/register'
        })
    }
}