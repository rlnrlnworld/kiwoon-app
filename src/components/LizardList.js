import { Component } from '../core/setup'
import lizardStore from '../store/lizard'
import { fetchLizards } from '../api/lizard'
import LizardItem from './LizardItem'
import PlusLizard from './PlusLizard'

export default class LizardList extends Component {
    constructor(lizards) {
        super()

        this.lizards = lizards || []
        
        lizardStore.subscribe('lizards', this.render.bind(this))
        lizardStore.subscribe('loading', this.render.bind(this))
        lizardStore.subscribe('message', this.render.bind(this))
        this.fetchLizards()
    }
    async fetchLizards() {
        try {
            lizardStore.setState({ loading: true });
            await lizardStore.loadLizards();
            lizardStore.setState({ loading: false });
        } catch (error) {
            lizardStore.setState({ message: '도마뱀 목록을 불러오는데 실패했습니다.', loading: false });
        }
    }
    render() {
        this.el.classList.add('lizard-list')
        this.el.innerHTML = `
            <div class="the-loader hide"></div>
            ${lizardStore.state.message
            ? `<div class="message">${lizardStore.state.message}</div>`
            : `<div class="lizards"></div>`}
        `
        const lizardEl = this.el.querySelector('.lizards')

        // 도마뱀 목록을 렌더링
        if (Array.isArray(lizardStore.state.lizards)) {
            lizardStore.state.lizards.forEach(lizard => {
                const lizardItem = new LizardItem({ lizard }).el;
                lizardEl?.appendChild(lizardItem);
            });
        }

        // 플러스 버튼을 렌더링
        const plusLizard = new PlusLizard().el
        lizardEl?.appendChild(plusLizard)
        

        const loaderEl = this.el.querySelector('.the-loader')
        lizardStore.state.loading
        ? loaderEl.classList.add('hide')
        : loaderEl.classList.remove('hide')
    }
}