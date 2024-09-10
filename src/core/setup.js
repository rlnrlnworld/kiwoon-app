////! Component
export class Component {
    constructor(payload = {}) {
        const { tagName = 'div', state={}, props={} } = payload
        this.el = document.createElement(tagName)
        this.state = state
        this.props = props
        this.render()
    }
    render() {
    }
}

////! Router
function routeRender(routes) {
    if (!location.hash) {
        // *히스토리 내역에 기록을 남기지 않으면서 페이지 이동
        history.replaceState(null, '', '/#/')
    }

    const routerView = document.querySelector('router-view')
    const [hash, queryString = ''] = location.hash.split('?')

    //? 1. 쿼리 스트링을 객체로 변환하여 히스토리의 상태에 저장 
    const query = queryString
    .split('&')
    .reduce((acc, cur) => {
        const [key, value] = cur.split('=')
        acc[key] = value
        return acc
    },{})
    history.replaceState(query, '')

    //? 2. 현재 라우트 정보를 찾아서 렌더링
    const currentRoute = routes.find(route => new RegExp(`${route.path}/?$`).test(hash))
    routerView.innerHTML = ''
    routerView.append(new currentRoute.component().el)

    //? 3. 화면 출력 후 스크롤 위치 복구
    window.scrollTo(0,0)
}
export function createRouter(routes){
    return function () {
        window.addEventListener('popstate', () => {
            routeRender(routes)
        })
        routeRender(routes)
    }
}

////! Store
export class Store {
    constructor(state) {
        this.state = {}
        this.observers = {}

        for (const key in state) {
            // *객체 데이터의 속성을 정의하는 메소드
            Object.defineProperty(this.state, key, {
                get: () => state[key],
                set: val => {
                    state[key] = val
                    // 배열 데이터로 되어있는 콜백 함수들을 차례대로 실행
                    // this.observers[key].forEach(observer => observer(val))
                    if (Array.isArray(this.observers[key])) {
                        this.observers[key].forEach(observer => observer(val));
                    }
                }
            })
        }
    }
    //* 상태를 감시하는 메소드
    subscribe(key, cb) {
        // 배열 데이터를 이용하여 실행 함수를 한 개 이상 등록할 수 있도록 구현
        // 배열 데이터이면 push 메소드 사용
        // this.observers ==> { key: [cb1, cb2, cb3] } 의 형식을 가진다.
        Array.isArray(this.observers[key])
        ? this.observers[key].push(cb)
        : this.observers[key] = [cb]
        // if (!Array.isArray(this.observers[key])) {
        //     this.observers[key] = []; // 초기화
        // }
        // this.observers[key].push(cb);
    }
}