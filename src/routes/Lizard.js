import { Component } from "../core/setup"
import { fetchLizards, fetchLizardById } from '../api/lizard'
import lizardStore from '../store/lizard'


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

        try {
            const lizards = await fetchLizards()
            const lizard = getLizardById(id, lizards)

            if (!lizard) {
                this.el.innerHTML = '<p>Lizard details not found.</p>'
                return
            }

            lizardStore.state.lizards = [lizard]

            // 임계치 범위 설정
            const tempMin = lizard.optTemperature - 2
            const tempMax = lizard.optTemperature + 2
            const humidityMin = lizard.optHumidity - 5
            const humidityMax = lizard.optHumidity + 5

            const currentTemp = 22
            const currentHumidity = 45

            // 온도 상태 결정
            const tempStatus = currentTemp < tempMin ? 'low' :
                            currentTemp > tempMax ? 'high' : 'normal'

            // 습도 상태 결정
            const humidityStatus = currentHumidity < humidityMin ? 'low' :
                                currentHumidity > humidityMax ? 'high' : 'normal'

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
                <div class="growthComp">
                    <img class="btnCmp" src ="https://i.imgur.com/2WvRZRt.png">
                    <div class="cmpText">
                        <b>성장 비교 서비스</b>
                        <span>내 도마뱀이 잘 크고 있는지 확인해요</span>
                    </div>
                </div>
                <div class="mating">
                    <img class="btnMating" src ="https://i.imgur.com/mxmVvu6.png">
                    <div class="matingText">
                        <b>메이팅해 듀오</b>
                        <span>내 도마뱀의 짝을 찾아봐요</span>
                    </div>
                </div>
            `

            // 이벤트 핸들러
            this.el.querySelector('.growthComp').addEventListener('click',() => {
                window.location.hash = `#/growth?id=${id}`
            })
            this.el.querySelector('.mating').addEventListener('click',() => {
                window.location.hash = `#/mating?id=${id}`
            })
        } catch (e) {
            this.el.innerHTML = `<p>Error loading lizard details.</p>`
        }

    }

    // URL에서 ID를 추출하는 함수
    getIdFromURL() {
        const hash = window.location.hash
        const match = hash.match(/#\/lizard\?id=(\d+)/)
        return match ? match[1] : null
    }

    // 기능 구현 (API와 연동 예정)
    provideWater() {
        alert('물을 제공했습니다.')
        // API 호출
    }

    checkCam() {
        alert('펫캠을 확인했습니다.')
        // API 호출
    }
}
