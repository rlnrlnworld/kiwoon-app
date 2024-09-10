import { Component } from '../core/setup'
import lizardStore, { getLizardDetails } from '../store/lizard'

// 온도와 습도에 따른 적절한 아이콘 반환
const getStatusIcon = status => {
    const iconPath = status === 'high' || status === 'low' 
                    ? '../img/Component_warning.png' 
                    : '../img/Component_normal.png'
    const iconImg = `<img src="${iconPath}" alt="${status} icon" />`
    return iconImg
}

// 상태에 따른 텍스트 반환
const getStatusText = status => {
    if (status === 'high') return `높음`
    if (status === 'low') return `낮음`
    return `적정`
}

// svg 반환
const getSvgIcon = type => {
    const btn = {
        enclosure: `<img src="../img/Union.png">`,
        watering: `<img src="../img/Union2.png">`,
        cam: `<img src="../img/Union3.png">`,
        mating: `<img src="../img/Union4.png">`,
        morphDict: `<img src="../img/Union5.png">`
    }
}

// 케이지 관리 페이지
export default class Lizard extends Component {
    async render() {
        this.el.classList.add('container','the-lizard')
        this.el.innerHTML = `
            <div class="enclosure skeleton"></div>
            <div class="buttons">
                <div class="watering"></div>
                <div class="checkCam"></div>
            </div>
            <div class="mating skeleton"></div>
        `

        await getLizardDetails(this.state.lizard.id)
        const { lizard } = lizardStore.state

        // 임계치 범위 설정
        const tempMin = lizard.optTemperature - 2
        const tempMax = lizard.optTemperature + 2
        const humidityMin = lizard.optHumidity - 5
        const humidityMax = lizard.optHumidity + 5

        //온습도 현재 값
        const currentTemp = 22 // 이 값은 실제 데이터로 교체되어야 함
        const currentHumidity = 13 // 이 값도 실제 데이터로 교체되어야 함

        // 온도 상태 결정 (low, normal, high)
        let tempStatus = 'normal'
        if (currentTemp < tempMin) tempStatus = 'low'
        else if (currentTemp > tempMax) tempStatus = 'high'

        // 습도 상태 결정 (low, normal, high)
        let humidityStatus = 'normal'
        if (currentHumidity < humidityMin) humidityStatus = 'low'
        else if (currentHumidity > humidityMax) humidityStatus = 'high'

        this.el.innerHTML = `
            <div class="enclosure">
                ${getSvgIcon('enclosure')}
                <img style="width: 100%; height: 100%; box-shadow: 5px 5px 16px rgba(0, 0, 0, 0.10)" src="https://via.placeholder.com/218x134" />
                <div class="envStat">
                    <div class="temp ${tempStatus}">
                        ${getStatusIcon(tempStatus)}
                        <div class="tempText">
                            <div class="status">
                                <span>온도</span> ${getStatusText(tempStatus)}
                            </div>
                            <div class="current">
                                현재 ${currentTemperature}°C
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
                <div class="watering">
                    ${getSvgIcon('watering')}
                    <div>
                        <img src="../img/Union_watering.png">
                        <span>물 분사하기</span>
                    </div>
                </div>
                <div class="checkCam">
                    ${getSvgIcon('cam')}
                    <div>
                        <img src="../img/Union_cam.png">
                        <span>캠 확인하기</span>
                    </div>
                </div>
            </div>
            <div class="mating">${getSvgIcon('mating')}</div>
        `

        //이벤트 핸들러
        this.el.querySelector('.enclosure').addEventListener('click', () => {
            window.location.hash = `#/enclosure?id=${this.state.lizard.id}`
        })
        this.el.querySelector('.watering').addEventListener('click',() => {
            this.provideWater()
        })
        this.el.querySelector('.checkCam').addEventListener('click',() => {
            this.checkCam()
        })
        this.el.querySelector('.mating').addEventListener('click', () => {
            window.location.hash = `#/mating?id=${this.state.lizard.id}`
        })
    }
    //기능 구현 (API와 연동 예정)
    provideWater() {
        console.alert('물을 제공했습니다.')
        // API 호출
    }
    checkCam() {
        console.alert('펫캠을 확인했습니다.')
        // API 호출
    }
}