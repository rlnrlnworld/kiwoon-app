import { Component } from '../core/setup'
import lizardStore from '../store/lizard'

export default class Enclosure extends Component {
    render() {
        const { lizard } = lizardStore.state
        this.el.innerHTML = `
            <div class="tempRemote">
                <div>온도</div>
                <img class="remoteBtn" src="../img/Btn_remote.png">
                <div>
                    <img class="up" src="../img/Btn_up.png">
                    <div class="currentTempValue">${lizard.optTemperature}°C</div>
                    <img class="down" src="../img/Btn_down.png">
                </div>
            </div>
            <div class="humidRemote">
                <div>습도</div>
                <img class="remoteBtn" src="../img/Btn_remote.png">
                <div>
                    <img class="up" src="../img/Btn_up.png">
                    <div class="currentHumidValue">${lizard.optHumidity}%</div>
                    <img class="down" src="../img/Btn_down.png">
                </div>
            </div>
        `
    }
}