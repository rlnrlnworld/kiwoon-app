import { Component } from '../core/setup'

export default class Register extends Component {
    render() {
        this.el.classList.add('container', 'register-lizard');
        this.el.innerHTML = `
            <nav>
                <a><span class="material-symbols-outlined">
                menu
                </span></a>
                <div class=title>도마뱀 등록</div>
                <a><span class="material-symbols-outlined">
                settings
                </span></a>
            </nav>
            <div class="btnBox">
                <img src="https://i.imgur.com/4WRoTb0.png">
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
                    <input type="number" class="lizardWeight" placeholder="도마뱀 몸무게(g)를 입력하세요" min="0" step="0.1">
                </div>
                <div class="infoKind">
                    <span>종</span>
                    <buttons class="speciesButtons">
                        <button class="speciesButton" data-species="LEOPARD_GECKO">레오파드 게코</button>
                        <button class="speciesButton" data-species="CRESTED_GECKO">크레스티드 게코</button>
                    </buttons>
                </div>
                <div class="infoMorph">
                    <span>모프</span>
                    <select class="lizardMorph">
                        <option value="">모프를 선택하세요</option>
                    </select>
                </div>
                <div class="matingYN">
                    <span>메이팅 희망 여부</span>
                    <input type="checkbox" id="matingYNCheckbox" class="matingYNCheckbox">
                    <label for="matingYNCheckbox" class="toggle-switch"></label>
                </div>

            </div>
            <button class="registerBtn">도마뱀 등록</button>

        `

        // 종별 모프 옵션
        const morphOptions = {
            LEOPARD_GECKO: [
                { value: "NORMAL", text: "노멀" },
                { value: "ALBINO", text: "알비노" },
                { value: "TANGERINE", text: "탠저린" },
                { value: "HYPOMELANISTIC", text: "하이포멜라니스틱" },
                { value: "SUPER_HYPO", text: "슈퍼 하이포" },
                { value: "MACK_SNOW", text: "맥 스노우" },
                { value: "BELL_ALBINO", text: "벨 알비노" },
                { value: "RAINWATER_ALBINO", text: "레인워터 알비노" },
                { value: "TREMPER_ALBINO", text: "트렘퍼 알비노" },
                { value: "BLACK_NIGHT", text: "블랙 나이트" },
                { value: "DIABLO_BLANCO", text: "디아블로 블랑코" },
                { value: "RAPTOR", text: "랩터" }
            ],
            CRESTED_GECKO: [
                { value: "FLAME", text: "플레임" },
                { value: "HARLEQUIN", text: "할리퀸" },
                { value: "PINSTRIPE", text: "핀스트라이프" },
                { value: "DALMATIAN", text: "달마시안" },
                { value: "TIGER", text: "타이거" },
                { value: "PHANTOM", text: "팬텀" },
                { value: "MOON_GLOW", text: "문 글로우" },
                { value: "TRICOLOR", text: "트라이컬러" },
                { value: "RED_PATTERNLESS", text: "레드 패턴리스" },
                { value: "YELLOW_PATTERNLESS", text: "옐로우 패턴리스" },
                { value: "LILLY_WHITE", text: "릴리 화이트" },
                { value: "AXANTHIC", text: "아잔틱" }
            ]
        };


        const birthDateInput = this.el.querySelector('.lizardBirthDate')
        const adoptDateInput = this.el.querySelector('.lizardAdoptDate')
        const nameInput = this.el.querySelector('.lizardName')
        const weightInput = this.el.querySelector('.lizardWeight')
        const kindButtons = this.el.querySelectorAll('.speciesButton')
        const morphSelect = this.el.querySelector('.lizardMorph')
        const matingCheckbox = this.el.querySelector('.matingYNCheckbox')
        const registerBtn = this.el.querySelector('.registerBtn')

        let selectedSpecies = '';
        // kindButtons.forEach(button => {
        //     button.addEventListener('click', () => {
        //         selectedSpecies = button.dataset.species;
        //         kindButtons.forEach(btn => btn.classList.remove('selected'));
        //         button.classList.add('selected');
        //     });
        // });

        kindButtons.forEach(button => {
            button.addEventListener('click', () => {
                selectedSpecies = button.dataset.species;
                kindButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                updateMorphOptions(selectedSpecies);
            });
        });

        function updateMorphOptions(species) {
            morphSelect.innerHTML = '<option value="">선택하세요</option>'; // 기존 모프 초기화
            morphOptions[species].forEach(morph => {
                const option = document.createElement('option');
                option.value = morph.value;
                option.textContent = morph.text;
                morphSelect.appendChild(option);
            });
        }



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

            const memberId = 1

            const data = {
                memberId,
                lizardName: nameInput.value,
                adoptDate: adoptDateInput.value.replace(/\//g, ''),
                birthDate: birthDateInput.value.replace(/\//g, ''),
                currentWeight: parseFloat(weightInput.value),
                species: selectedSpecies,
                morph: morphSelect.value.toUpperCase(),
                wantsMate: matingCheckbox.checked,
                optTemperature: 26,  // 임의의 값
                optHumidity: 55,  // 임의의 값
                hausNumber: "550e8400-e29b" // 임의의 UUID 값
            }


            try {
                console.log("데이터 저장==============================");
                console.log(data) 

                const response = await fetch('http://localhost:8888/api/lizards', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
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