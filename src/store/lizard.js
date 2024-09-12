import { fetchLizards, fetchMatingCandidates } from '../api/lizard'

export default {
    
    state: {
        lizards: [],
        matingCandidates: [],
        loading: false,
        message: ''
    },
    _callbacks: {
        lizards: [],
        loading: [],
        message: []
    },
    subscribe(key, callback) {
        if (this._callbacks[key]) {
            this._callbacks[key].push(callback);
        }
    },
    setState(newState) {
        Object.keys(newState).forEach(key => {
            if (this.state[key] !== newState[key]) {
                this.state[key] = newState[key];
                if (this._callbacks[key]) {
                    this._callbacks[key].forEach(callback => callback(this.state));
                }
            }
        });
    },
    async loadLizards() {
        try {
            this.setState({ loading: true });
            const lizards = await fetchLizards();
            this.setState({ lizards, loading: false });
        } catch (e) {
            this.setState({ message: '도마뱀 목록을 불러오는데 실패했습니다.', loading: false });
            console.error(e);
        }
    },
    async loadMatingCandidates(morph) {
        try {
            const candidates = await fetchMatingCandidates(morph);
            this.setState({ matingCandidates: candidates });
        } catch (e) {
            console.error(e);
        }
    }
}
