import { Component } from '../core/setup'

export default class Register extends Component {
    render() {
        this.el.classList.add('container', 'register-lizard');
        this.el.innerHTML = `
            <div class="btnBox">
                <img src="https://i.imgur.com/OKPJzUf.png">
            </div>
            <div class="lizardInfo">
                <div class="infoName">
                    <span>이름</span>
                    <input type="text" class="lizardName" placeholder="도마뱀 이름을 입력하세요">
                </div>
                <div class="infoBirthDate">
                    <span>생일</span>
                    <input type="text" pattern="\d{4}/\d{2}/\d{2}" class="lizardBirthDate" placeholder="도마뱀 생일을 입력하세요">
                </div>
                <div class="infoAdopt">
                    <span>입양일</span>
                    <input type="text" pattern="\d{4}/\d{2}/\d{2}" class="lizardAdoptDate" placeholder="입양일을 입력하세요">
                </div>
            </div>
            <div class="lizardInfoPlus">
                <div class="infoWeight">
                    <span>몸무게</span>
                    <input type="number" class="lizardWeight" placeholder="도마뱀 몸무게(g)를 입력하세요">
                </div>
                <div class="infoKind">
                    <span>종</span>
                    <input type="text" class="lizardKind" placeholder="도마뱀의 종을 입력하세요">
                </div>
                <div class="infoMorph">
                    <span>모프</span>
                    <input type="text" class="lizardMorph" placeholder="도마뱀의 모프를 입력하세요">
                </div>
                <div class="matingYN">
                    <span>메이팅 희망 여부</span>
                    <input type="checkbox" id="matingYNCheckbox" class="matingYNCheckbox">
                    <label for="matingYNCheckbox" class="toggle-switch"></label>
                </div>

            </div>
            <button class="registerBtn">도마뱀 등록</button>
        `

        const birthDateInput = this.el.querySelector('.lizardBirthDate')
        const adoptDateInput = this.el.querySelector('.lizardAdoptDate')
        const nameInput = this.el.querySelector('.lizardName')
        const weightInput = this.el.querySelector('.lizardWeight')
        const kindInput = this.el.querySelector('.lizardKind')
        const morphInput = this.el.querySelector('.lizardMorph')
        const matingCheckbox = this.el.querySelector('.matingYNCheckbox')
        const registerBtn = this.el.querySelector('.registerBtn')

        const autoFormatDate = (input) => {
            input.addEventListener('input', function (event) {
                let value = event.target.value.replace(/\D/g, '')
                if (value.length > 4) value = value.slice(0, 4) + '/' + value.slice(4)
                if (value.length > 7) value = value.slice(0, 7) + '/' + value.slice(7)
                event.target.value = value
            })
        }

        autoFormatDate(birthDateInput)
        autoFormatDate(adoptDateInput)

        registerBtn.addEventListener('click', async () => {
            const data = {
                lizardName: nameInput.value,
                adoptDate: adoptDateInput.value,
                brithDate: birthDateInput.value,
                currentWeight: parseFloat(weightInput.value),
                species: kindInput.value.toUpperCase(),
                morph: morphInput.value.toUpperCase(),
                wantsMate: matingCheckbox.checked,
                optTemperature: 23,  // 임의의 값
                optHumidity: 15,  // 임의의 값
                hausNumber: "550e8400-e29b" // 임의의 값
            }

            try {
                const response = await fetch('/api/lizard', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}` // accessToken을 동적으로 받아와야 함
                    },
                    body: JSON.stringify(data)
                })

                const result = await response.json()
                if (response.ok) {
                    console.log('도마뱀 저장 성공:', result.message)
                } else {
                    console.error('도마뱀 저장 실패:', result.message)
                }
            } catch (error) {
                console.error('API 요청 오류:', error)
            } finally {
                // 다시 홈페이지로 이동
                window.location.hash = '#/'
            }
        })
    }
}