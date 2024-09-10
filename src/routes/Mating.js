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
                ${ morphs.map(morph => {
                    return `
                        <div class="morph" data-morph="${morph}">
                            <img src="../img/Union5.png" alt="${morph}" />
                            <b class="morph_name">${morph}</b>
                        </div>
                    `
                }).join('') }
            </div>
            <div class="candidate-list">
                <div class="loading">Loading...</div>
                <div class="candidates"></div>
            </div>
            <div class="selected-lizard" style="display: none;">
                <h2>선택된 도마뱀</h2>
                <div class="details"></div>
                <button class="mating-request" style="display: none;">메이팅 신청하기</button>
            </div>
        `

        // Event listeners for morph selection
        this.el.querySelectorAll('.morph').forEach(morph => {
            morph.addEventListener('click', () => this.handleMorphSelection(morph.getAttribute('data-morph')))
        })

        // Fetch mating candidates
        await this.loadCandidates()

        // Event listener for mating request
        this.el.querySelector('.mating-request').addEventListener('click', () => {
            this.requestMating()
        })
    }

    async loadCandidates() {
        this.el.querySelector('.loading').style.display = 'block'

        try {
            await fetchMatingCandidates() // Fetching mating candidates
            const candidates = store.state.matingCandidates
            this.state.matingCandidates = candidates

            const candidatesList = this.el.querySelector('.candidates')
            candidatesList.innerHTML = candidates.map(candidate => `
                <div class="candidate" data-id="${candidate.id}">
                    <img src="${candidate.image}" alt="${candidate.name}" />
                    <span>${candidate.name}</span>
                </div>
            `).join('')

            this.el.querySelector('.loading').style.display = 'none'
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
        }
    }

    displayLizardDetails(lizard) {
        const detailsSection = this.el.querySelector('.selected-lizard')
        detailsSection.style.display = 'block'

        detailsSection.querySelector('.details').innerHTML = `
            <img src="${lizard.image}" alt="${lizard.name}" />
            <p>Name: ${lizard.name}</p>
            <p>Species: ${lizard.species}</p>
            <p>Age: ${lizard.age}</p>
            <p>Characteristics: ${lizard.characteristics}</p>
        `

        detailsSection.querySelector('.mating-request').style.display = 'block'
    }

    requestMating() {
        console.log('Mating request sent for:', this.state.selectedLizard.name)
        // Implement API call to request mating
    }

    handleMorphSelection(morphId) {
        // 모프 선택 시, 다른 페이지로 이동
        window.location.hash = `#/findmate?morphId=${morphId}`
    }
}
