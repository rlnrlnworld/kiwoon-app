import { Component } from '../core/setup'
import lizardStore, { fetchLizards } from '../store/lizard'
import LizardItem from './LizardItem'

export default class LizardList extends Component {
    constructor(lizards) {
        super()
        
        lizardStore.subscribe('lizards', this.render.bind(this))
        lizardStore.subscribe('loading', this.render.bind(this))
        lizardStore.subscribe('message', this.render.bind(this))
        this.fetchLizards()
    }
    async fetchLizards() {
        await fetchLizards()
    }
    render() {
        this.el.classList.add('lizard-list')
        this.el.innerHTML = `
            ${lizardStore.state.message
            ? `<div class="message">${lizardStore.state.message}</div>`
            : `<div class="lizards"></div>`}
            <div class="the-loader hide"></div>
        `

        const lizardEl = this.el.querySelector('.lizards')
        lizardEl?.append(
            ...lizardStore.state.lizards.map(lizard => new LizardItem({
                lizard
            }).el)
        )

        const loaderEl = this.el.querySelector('.the-loader')
        lizardStore.state.loading
        ? loaderEl.classList.add('hide')
        : loaderEl.classList.remove('hide')
    }
}