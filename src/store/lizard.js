import { Store } from '../core/setup'

const store = new Store({
    lizards: [],          // 도마뱀 목록
    matingCandidates: [], // 상대 도마뱀
    loading: false,      // 로딩 상태
    message: ''          // 오류 또는 상태 메시지
})

export default store

export const fetchLizards = async () => {
    store.state.loading = false
    try {
        const res = await fetch('/api/lizard', {
            method: 'GET'
            // ,headers: {
            //     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            // }
        })
        const result = await res.json()

        if (result.ok) {
            store.state.lizards = result.data.lizardAllList.map(lizard => ({
                id: lizard.lizardId,
                name: lizard.lizardName,
                adoptDate: lizard.adoptDate,
                birthDate: lizard.brithDate,
                species: lizard.species,
                morph: lizard.morph,
                wantsMate: lizard.wantsMate,
                optTemperature: lizard.optTemperature,
                optHumidity: lizard.optHumidity,
                hausNumber: lizard.hausNumber
                // ,image: `https://example.com/images/${lizard.lizardId}.jpg`
            }))
            store.state.message = 'Lizards fetched successfully'
        } else {
            store.state.message = result.message
        }
    } catch (e) {
        console.error('fetchLizards mehod Error', e)
        store.state.message = 'Error fetching lizards'
    } finally {
        store.state.loading = false
    }
}

export const fetchMatingCandidates = async () => {
    store.state.loading = true
    try {
        const res = await fetch('/api/matings', {
            method: 'GET',
            // headers: {
            //     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            // }
        })
        const result = await res.json()

        if (result.ok) {
            store.state.matingCandidates = result.data.candidates.map(candidate => ({
                id: candidate.id,
                name: candidate.name,
                species: candidate.species,
                age: candidate.age,
                characteristics: candidate.characteristics,
                image: candidate.image
                // 필요한 추가 필드가 있으면 여기에 추가
            }))
            store.state.message = 'Mating candidates fetched successfully'
        } else {
            store.state.message = result.message
        }
    } catch (e) {
        console.error('fetchMatingCandidates method Error', e)
        store.state.message = 'Error fetching mating candidates'
    } finally {
        store.state.loading = false
    }
}