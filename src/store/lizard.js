// import { Store } from '../core/setup'

// const store = new Store({
//     lizards: [],          // 도마뱀 목록
//     matingCandidates: [], // 상대 도마뱀
//     loading: false,      // 로딩 상태
//     message: ''          // 오류 또는 상태 메시지
// })

// export default store

// export const fetchLizards = async () => {
//     store.state.loading = false
//     try {
//         const res = await fetch('/api/lizard', {
//             method: 'GET'
//             // ,headers: {
//             //     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
//             // }
//         })
//         const result = await res.json()

//         if (result.ok) {
//             store.state.lizards = result.data.lizardAllList.map(lizard => ({
//                 id: lizard.lizardId,
//                 name: lizard.lizardName,
//                 adoptDate: lizard.adoptDate,
//                 birthDate: lizard.brithDate,
//                 species: lizard.species,
//                 morph: lizard.morph,
//                 wantsMate: lizard.wantsMate,
//                 optTemperature: lizard.optTemperature,
//                 optHumidity: lizard.optHumidity,
//                 hausNumber: lizard.hausNumber
//                 // ,image: `https://example.com/images/${lizard.lizardId}.jpg`
//             }))
//             store.state.message = 'Lizards fetched successfully'
//         } else {
//             store.state.message = result.message
//         }
//     } catch (e) {
//         console.error('fetchLizards mehod Error', e)
//         store.state.message = 'Error fetching lizards'
//     } finally {
//         store.state.loading = false
//     }
// }

// export const fetchMatingCandidates = async () => {
//     store.state.loading = true
//     try {
//         const res = await fetch('/api/matings', {
//             method: 'GET',
//             // headers: {
//             //     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
//             // }
//         })
//         const result = await res.json()

//         if (result.ok) {
//             store.state.matingCandidates = result.data.candidates.map(candidate => ({
//                 id: candidate.id,
//                 name: candidate.name,
//                 species: candidate.species,
//                 age: candidate.age,
//                 characteristics: candidate.characteristics,
//                 image: candidate.image
//                 // 필요한 추가 필드가 있으면 여기에 추가
//             }))
//             store.state.message = 'Mating candidates fetched successfully'
//         } else {
//             store.state.message = result.message
//         }
//     } catch (e) {
//         console.error('fetchMatingCandidates method Error', e)
//         store.state.message = 'Error fetching mating candidates'
//     } finally {
//         store.state.loading = false
//     }
// }

const lizardStore = {
    state: {
        lizards: [
            { id: 1, name: '사막이', morph: 'Morph1', age: 2, image: '../img/lizard_a.png', optTemperature: 25, optHumidity: 60 },
            { id: 2, name: 'Lizard B', morph: 'Morph2', age: 3, image: '../img/lizard_b.png', optTemperature: 26, optHumidity: 55 },
            { id: 3, name: 'Lizard C', morph: 'Morph1', age: 1, image: '../img/lizard_c.png', optTemperature: 24, optHumidity: 65 },
            { id: 4, name: 'Lizard D', morph: 'Morph3', age: 4, image: '../img/lizard_d.png', optTemperature: 27, optHumidity: 50 },
        ],
        matingCandidates: [
            { id: 1, name: 'Lizard X', morph: 'Morph1', age: 5, image: '../img/lizard_x.png', distance: 2 },
            { id: 2, name: 'Lizard Y', morph: 'Morph1', age: 6, image: '../img/lizard_y.png', distance: 5 },
            { id: 3, name: 'Lizard Z', morph: 'Morph2', age: 7, image: '../img/lizard_z.png', distance: 10 },
        ]
    },
    subscribe(callback) {
        // 상태 변경 시 콜백 호출
        this._callbacks.push(callback);
    },
    _callbacks: [],
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this._callbacks.forEach(callback => callback(this.state));
    },
    fetchLizards() {
        // 여기에 실제 API 호출을 할 수 있습니다.
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.state.lizards);
            }, 1000); // 1초 지연
        });
    },
    getLizardDetails(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const lizard = this.state.lizards.find(lizard => lizard.id === id);
                resolve(lizard);
            }, 1000); // 1초 지연
        });
    },
    fetchMatingCandidates() {
        // 여기에 실제 API 호출을 할 수 있습니다.
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.state.matingCandidates);
            }, 1000); // 1초 지연
        });
    }
};

export async function fetchLizardById(id) {
    try {
        const response = await fetch(`/api/lizards/${id}`);
        const lizard = await response.json();
        lizardStore.setState({ currentLizard: lizard });
    } catch (error) {
        console.error('Error fetching lizard:', error);
    }
}

export default lizardStore;
export const { fetchLizards, fetchMatingCandidates, getLizardDetails } = lizardStore;
