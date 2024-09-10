import { Component } from '../core/setup'
import store, { fetchMatingCandidates } from '../store/lizard'

export default class Mating extends Component {
    constructor() {
        super()
        this.state = {
            selectedLizard: null,
            matingCandidates: []
        }
    }

    async render() {
        const { lizards } = store.state
        const morphs = [...new Set(lizards.map(lizard => lizard.morph))].sort()

        this.el.classList.add('container')
        this.el.innerHTML = `
            <div class="morphList">
                ${ morphs.map(morph => `
                    <div class="morph" data-morph="${morph}">
                        <img src="../img/morph_${morph}.png" alt="${morph}" />
                        <b class="morph_name">${morph}</b>
                    </div>
                `).join('') }
            </div>
            <div class="candidate-list">
                <div class="loading">Loading...</div>
                <div class="candidates" style="display: none;"></div>
            </div>
            <div class="selected-lizard" style="display: none;">
                <h2>선택된 도마뱀</h2>
                <div class="details"></div>
                <button class="mating-request" style="display: none;">메이팅 신청하기</button>
            </div>
        `

        this.el.querySelectorAll('.morph').forEach(morph => {
            morph.addEventListener('click', () => this.handleMorphSelection(morph.getAttribute('data-morph')))
        })

        this.el.querySelector('.mating-request').addEventListener('click', () => {
            this.requestMating()
        })
    }

    async handleMorphSelection(morph) {
        this.el.querySelector('.candidates').style.display = 'none'
        this.el.querySelector('.loading').style.display = 'block'

        // 필요 모프 계산 및 후보자 목록 로드
        try {
            await fetchMatingCandidates() // 필요한 모프에 맞는 도마뱀 목록 로드
            const candidates = store.state.matingCandidates.filter(c => c.morph === morph)
            this.state.matingCandidates = candidates

            const candidatesList = this.el.querySelector('.candidates')
            candidatesList.innerHTML = candidates.map(candidate => `
                <div class="candidate" data-id="${candidate.id}">
                    <img src="${candidate.image}" alt="${candidate.name}" />
                    <span>${candidate.name}</span>
                    <p>거리: ${candidate.distance} km</p>
                </div>
            `).join('')

            this.el.querySelector('.loading').style.display = 'none'
            candidatesList.style.display = 'block'

            this.el.querySelectorAll('.candidate').forEach(candidate => {
                candidate.addEventListener('click', () => this.selectLizard(candidate))
            })

        } catch (error) {
            console.error('Failed to load candidates', error)
            this.el.querySelector('.loading').textContent = 'Failed to load candidates'
        }
    }

    selectLizard(candidateElement) {
        const candidateId = candidateElement.getAttribute('data-id')
        const selectedLizard = this.state.matingCandidates.find(lizard => lizard.id === candidateId)

        if (selectedLizard) {
            this.state.selectedLizard = selectedLizard
            this.displayLizardDetails(selectedLizard)
            this.el.querySelector('.candidates').style.display = 'none'
        }
    }

    displayLizardDetails(lizard) {
        const detailsSection = this.el.querySelector('.selected-lizard')
        detailsSection.style.display = 'block'

        detailsSection.querySelector('.details').innerHTML = `
            <p>Name: ${lizard.name}</p>
            <img src="${lizard.image}" alt="${lizard.name}" />
            <p>나이: ${lizard.age}살</p>
            <p>모프: ${lizard.morph}</p>
        `

        detailsSection.querySelector('.mating-request').style.display = 'block'
    }

    requestMating() {
        console.log('Mating request sent for:', this.state.selectedLizard.name)
        // API 호출로 메이팅 요청 구현
    }
}

