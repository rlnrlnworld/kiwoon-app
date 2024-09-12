import { Component } from '../core/setup'
import lizardStore from '../store/lizard'
import { fetchLizards } from '../api/lizard'
import LizardItem from './LizardItem'
import PlusLizard from './PlusLizard'

export default class LizardList extends Component {
    constructor(lizards) {
        super()
        
        lizardStore.subscribe('lizards', this.render.bind(this))
        lizardStore.subscribe('loading', this.render.bind(this))
        lizardStore.subscribe('message', this.render.bind(this))
        this.fetchLizards()
    }
    async fetchLizards() {
        try {
            const memberId = localStorage.getItem('memberId');  // 예시: 로그인 시 저장된 memberId 사용
            lizardStore.state.loading = true;
            await lizardStore.loadLizards(memberId);
            lizardStore.state.loading = false;
        } catch (error) {
            lizardStore.state.message = '도마뱀 목록을 불러오는데 실패했습니다.';
            lizardStore.state.loading = false;
        }
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

        // 도마뱀 목록을 렌더링
        lizardStore.state.lizards.forEach(lizard => {
            const lizardItem = new LizardItem({ lizard }).el
            lizardEl?.appendChild(lizardItem)
        })

        // 플러스 버튼을 렌더링
        const plusLizard = new PlusLizard().el
        lizardEl?.appendChild(plusLizard)
        

        const loaderEl = this.el.querySelector('.the-loader')
        lizardStore.state.loading
        ? loaderEl.classList.add('hide')
        : loaderEl.classList.remove('hide')
    }
}