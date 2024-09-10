import { Component } from '../core/setup'
import lizardStore from '../store/lizard'

export default class FindMate extends Component {
    async render() {
        const params = new URLSearchParams(window.location.hash.split('?')[1])
        const morphId = params.get('morphId')

        this.el.classList.add('container', 'find-mate')

        // API 호출하여 도마뱀 목록 가져오기
        try {
            const res = await fetch(`/api/matings?morphId=${morphId}`)
            const result = await res.json()

            if (result.ok) {
                const lizards = result.data.lizardList.map(lizard => `
                    <div class="lizard">
                        <img src="${lizard.image}" alt="${lizard.name}" />
                        <div class="lizard-info">
                            <h3>${lizard.name}</h3>
                            <p>모프: ${lizard.morph}</p>
                            <p>거리: ${lizard.distance} km</p>
                        </div>
                    </div>
                `).join('')

                this.el.innerHTML = `
                    <h1>상대 도마뱀 추천 리스트</h1>
                    <div class="lizard-list">
                        ${lizards}
                    </div>
                `
            } else {
                this.el.innerHTML = `<p>${result.message}</p>`
            }
        } catch (e) {
            this.el.innerHTML = `
                <img src="../img/404_notfound.png">
                <p>
                조건에 맞는 <br>
                결과가 업습니다
                </p>
            `
        }
    }
}