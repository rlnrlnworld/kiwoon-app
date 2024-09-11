import { Component } from "../core/setup";

// 더미 데이터
const dummyLizard = {
    id: 1,
    name: "Example Lizard",
    optTemperature: 23,
    optHumidity: 50,
    weight: 8
};

const getStatusIcon = status => {
    const iconPath = status === 'high' || status === 'low' 
                    ? 'https://i.imgur.com/3vKcIV9.png' 
                    : 'https://i.imgur.com/ZriEjdj.png';
    const iconImg = `<img src="${iconPath}" alt="${status} icon" />`;
    return iconImg;
}

const getStatusText = status => {
    if (status === 'high') return `높음`;
    if (status === 'low') return `낮음`;
    return `적정`;
}

// 케이지 관리 페이지
export default class Lizard extends Component {
    async render() {
        this.el.classList.add('container', 'the-lizard');

        // URL에서 ID를 추출
        const id = this.getIdFromURL();
        if (!id) {
            this.el.innerHTML = '<p>No lizard found</p>';
            return;
        }

        // 더미 데이터 사용
        const lizard = dummyLizard;

        if (!lizard) {
            this.el.innerHTML = '<p>Lizard details not found.</p>';
            return;
        }

        // 임계치 범위 설정
        const tempMin = lizard.optTemperature - 2;
        const tempMax = lizard.optTemperature + 2;
        const humidityMin = lizard.optHumidity - 5;
        const humidityMax = lizard.optHumidity + 5;

        // 온습도 현재 값 (더미 데이터로 설정)
        const currentTemp = 22; // 이 값은 실제 데이터로 교체되어야 함
        const currentHumidity = 13; // 이 값도 실제 데이터로 교체되어야 함

        // 온도 상태 결정
        const tempStatus = currentTemp < tempMin ? 'low' :
                           currentTemp > tempMax ? 'high' : 'normal';

        // 습도 상태 결정
        const humidityStatus = currentHumidity < humidityMin ? 'low' :
                              currentHumidity > humidityMax ? 'high' : 'normal';

        this.el.innerHTML = `
            <div class="enclosure">
                <img class="iconEnclosure" src="https://i.imgur.com/1dAwK1I.png">
                <div class="envStat">
                    <div class="temp ${tempStatus}">
                        ${getStatusIcon(tempStatus)}
                        <div class="tempText">
                            <div class="status">
                                <span>온도</span> ${getStatusText(tempStatus)}
                            </div>
                            <div class="current">
                                현재 ${currentTemp}°C
                            </div>
                        </div>
                    </div>
                    <div class="humidity ${humidityStatus}">
                        ${getStatusIcon(humidityStatus)}
                        <div class="humidityText">
                            <div class="status">
                                <span>습도</span> ${getStatusText(humidityStatus)}
                            </div>
                            <div class="current">
                                현재 ${currentHumidity}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buttons">
                <div class="remoteTemp">
                    <img class="iconTemp" src="https://i.imgur.com/kHPO2Ga.png">
                    <div class="remoteText">
                        <div class="down ellipse-parent">
                            <div class="down group-child">
                            </div>
                            <div class="down group-item">
                            </div>
                        </div>
                        <span> 온도 </span>
                        <div class="up ellipse-parent">
                            <div class="up group-child">
                            </div>
                            <div class="up group-item">
                            </div>
                            <div class="up group-inner">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="watering">
                    <img src="https://i.imgur.com/bUaK1z8.png">
                    <div class="wateringText">
                        <span>물 분사</span>
                    </div>
                </div>
            </div>
            <div class = "growthComp">
                <img class="btnCmp" src ="https://i.imgur.com/2WvRZRt.png">
                <div class="cmpText">
                    <b>성장 비교 서비스</b>
                    <span>내 도마뱀이 잘 크고 있는지 확인해요</span>
                </div>
            </div>
            <div class = "mating">
                <img class="btnMating" src ="https://i.imgur.com/mxmVvu6.png">
                <div class="matingText">
                    <b>메이팅해 듀오</b>
                    <span>내 도마뱀의 짝을 찾아봐요</span>
                </div>
            </div>
        `;

        // 이벤트 핸들러
        this.el.querySelector('.growthComp').addEventListener('click',() => {
            window.location.hash = `#/growth?id=${id}`
        })
        this.el.querySelector('.mating').addEventListener('click',() => {
            window.location.hash = `#/mating?id=${id}`
        })
    }

    // URL에서 ID를 추출하는 함수
    getIdFromURL() {
        const hash = window.location.hash;
        const match = hash.match(/#\/lizard\?id=(\d+)/);
        return match ? match[1] : null;
    }

    // 기능 구현 (API와 연동 예정)
    provideWater() {
        alert('물을 제공했습니다.');
        // API 호출
    }

    checkCam() {
        alert('펫캠을 확인했습니다.');
        // API 호출
    }
}


// import { Component } from '../core/setup'
// import lizardStore, { getLizardDetails, fetchLizardById } from '../store/lizard'

// // 온도와 습도에 따른 적절한 아이콘 반환
// const getStatusIcon = status => {
//     const iconPath = status === 'high' || status === 'low' 
//                     ? '../img/Component_warning.png' 
//                     : '../img/Component_normal.png'
//     const iconImg = `<img src="${iconPath}" alt="${status} icon" />`
//     return iconImg
// }

// // 상태에 따른 텍스트 반환
// const getStatusText = status => {
//     if (status === 'high') return `높음`
//     if (status === 'low') return `낮음`
//     return `적정`
// }

// // svg 반환
// const getSvgIcon = type => {
//     const btn = {
//         enclosure: `<img src="../img/Union.png">`,
//         watering: `<img src="../img/Union2.png">`,
//         cam: `<img src="../img/Union3.png">`,
//         mating: `<img src="../img/Union4.png">`,
//         morphDict: `<img src="../img/Union5.png">`
//     }
// }

// // 케이지 관리 페이지
// export default class Lizard extends Component {
//     async render() {
//         this.el.classList.add('container','the-lizard')
//         this.el.innerHTML = `
//             <div class="enclosure skeleton"></div>
//             <div class="buttons">
//                 <div class="watering"></div>
//                 <div class="checkCam"></div>
//             </div>
//             <div class="mating skeleton"></div>
//         `

//         await getLizardDetails(this.state.lizard.id)
//         const { lizard } = lizardStore.state

//         // 임계치 범위 설정
//         const tempMin = lizard.optTemperature - 2
//         const tempMax = lizard.optTemperature + 2
//         const humidityMin = lizard.optHumidity - 5
//         const humidityMax = lizard.optHumidity + 5

//         //온습도 현재 값
//         const currentTemp = 22 // 이 값은 실제 데이터로 교체되어야 함
//         const currentHumidity = 13 // 이 값도 실제 데이터로 교체되어야 함

//         // 온도 상태 결정 (low, normal, high)
//         let tempStatus = 'normal'
//         if (currentTemp < tempMin) tempStatus = 'low'
//         else if (currentTemp > tempMax) tempStatus = 'high'

//         // 습도 상태 결정 (low, normal, high)
//         let humidityStatus = 'normal'
//         if (currentHumidity < humidityMin) humidityStatus = 'low'
//         else if (currentHumidity > humidityMax) humidityStatus = 'high'

//         this.el.innerHTML = `
//             <div class="enclosure">
//                 ${getSvgIcon('enclosure')}
//                 <img style="width: 100%; height: 100%; box-shadow: 5px 5px 16px rgba(0, 0, 0, 0.10)" src="https://via.placeholder.com/218x134" />
//                 <div class="envStat">
//                     <div class="temp ${tempStatus}">
//                         ${getStatusIcon(tempStatus)}
//                         <div class="tempText">
//                             <div class="status">
//                                 <span>온도</span> ${getStatusText(tempStatus)}
//                             </div>
//                             <div class="current">
//                                 현재 ${currentTemperature}°C
//                             </div>
//                         </div>
//                     </div>
//                     <div class="humidity ${humidityStatus}">
//                         ${getStatusIcon(humidityStatus)}
//                         <div class="humidityText">
//                             <div class="status">
//                                 <span>습도</span> ${getStatusText(humidityStatus)}
//                             </div>
//                             <div class="current">
//                                 현재 ${currentHumidity}%
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div class="buttons">
//                 <div class="watering">
//                     ${getSvgIcon('watering')}
//                     <div>
//                         <img src="../img/Union_watering.png">
//                         <span>물 분사하기</span>
//                     </div>
//                 </div>
//                 <div class="checkCam">
//                     ${getSvgIcon('cam')}
//                     <div>
//                         <img src="../img/Union_cam.png">
//                         <span>캠 확인하기</span>
//                     </div>
//                 </div>
//             </div>
//             <div class="mating">${getSvgIcon('mating')}</div>
//         `

//         //이벤트 핸들러
//         this.el.querySelector('.enclosure').addEventListener('click', () => {
//             window.location.hash = `#/enclosure?id=${this.state.lizard.id}`
//         })
//         this.el.querySelector('.watering').addEventListener('click',() => {
//             this.provideWater()
//         })
//         this.el.querySelector('.checkCam').addEventListener('click',() => {
//             this.checkCam()
//         })
//         this.el.querySelector('.mating').addEventListener('click', () => {
//             window.location.hash = `#/mating?id=${this.state.lizard.id}`
//         })
//     }
//     //기능 구현 (API와 연동 예정)
//     provideWater() {
//         console.alert('물을 제공했습니다.')
//         // API 호출
//     }
//     checkCam() {
//         console.alert('펫캠을 확인했습니다.')
//         // API 호출
//     }
// }