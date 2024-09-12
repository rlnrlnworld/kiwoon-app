import { Component } from '../core/setup'
import lizardStore from '../store/lizard'

//평균 체중 값
const averageWeights = {
    "crested_gecko": {
        "1": 2,
        "2": 3,
        "3": 4,
        "4": 5,
        "5": 7,
        "6": 9,
        "7": 11,
        "8": 13,
        "9": 17,
        "10": 21,
        "11": 25,
        "12": 29,
        "13": 31,
        "14": 32,
        "15": 33,
        "16": 35,
        "17": 37,
        "18+": { min: 40, max: 60 }
    },
    "leopard_gecko": {
        "1": 10,
        "2": 12,
        "3": 14,
        "4": 16,
        "5": 18,
        "6": 20,
        "7": 22,
        "8": 24,
        "9": 26,
        "10": 28,
        "11": 30,
        "12": 32,
        "13": 34,
        "14": 36,
        "15": 38,
        "16": 40,
        "17": 42,
        "18+": { min: 45, max: 60 }
    }
}

export default class GrowthCmp extends Component {
    async render() {
        this.el.classList.add('container', 'growth-cmp');

        // URL에서 ID를 추출
        const id = this.getIdFromURL();
        if (!id) {
            this.el.innerHTML = '<p>No lizard found</p>';
            return;
        }

        // Store에서 도마뱀 데이터 가져오기
        const lizard = lizardStore.state.lizards.find(lizard => lizard.lizardId === parseInt(id));

        if (!lizard) {
            this.el.innerHTML = '<p>Lizard details not found.</p>';
            return;
        }


        // 도마뱀의 생일로부터 개월 수 계산
        const birthDate = new Date(lizard.birthDate)
        const today = new Date()
        const ageInMonths = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24 * 30))


         // 도마뱀 체중 비교
        const species = lizard.species.toLowerCase()
        const averageWeight = this.getAverageWeight(species, ageInMonths)
        const tolerance = 0.9
        const weightComparison = 
            currentWeight < averageWeight - tolerance ? '평균 이하예요' 
            :currentWeight > averageWeight + tolerance ? '평균 이상이에요' 
            :'평균이에요'

        
        
        this.el.innerHTML = `
            <nav>
                <a><span class="material-symbols-outlined">
                menu
                </span></a>
                <div class=title>성장 비교 서비스</div>
                <a><span class="material-symbols-outlined">
                settings
                </span></a>
            </nav>
            <img src="https://i.imgur.com/4WRoTb0.png">
            <h1><span>${lizard.lizardName}</span>는 <span>${lizard.currentWeight}g</span>이에요.</h1>
            <h1><span>${ageInMonths}개월</span> 도마뱀 체중의 <br><span>${weightComparison}</span></h1>

            <div class="superFood">
                <h1 class="superFoodTitle">사료 구독 ></h1>
                <span>${lizard.lizardName}의 성장을 위한 사료를 구독해요</span>
                <div class="taste">
                    <div>
                        <h3>무화과맛</h3>
                        <img src="https://s3-alpha-sig.figma.com/img/26c8/8aa1/83249aa3620c0c92f5846ab0eadd6057?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OBqe8UP8YeDXbwm~j7FFSaZ7eXJBtwwrsHeN0CWRmgAHrLjoHqSl2UHAE9gZIeumS0L34p099~z4lWrENE0Bia4oDo0-LDtqZN2bEybrJ3~G54LQ3TPwJgOs3DrTrngSphSLrvFp7YwCd0v0hN9q58IXjbE~E0z274Nm20yXcyZK0AZ7gyenvM3D7KrNZ6hI0uZ3afQDCOn2KEfOcM3OH0UaUMCNTDj-L31JpRaF1y1lH5bU3yUo5vRv0PpQY2zB3WpJn85cJ4aoCTCU7ADl6GjAUi8sI~5NvSXjDOBhzqVjql7clrFlqmpowiy6kf9-Mmjnq4g12ia3c7GOwcxBpA__">
                    </div>
                    <div>
                        <h3>곤충맛</h3>
                        <img src="https://s3-alpha-sig.figma.com/img/5082/d581/8e3aeb320bbd839298e3b1bc275121a0?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QOmZP2czO4MFT~8wKVuZO7gx9ee6Kze6YCqcS1HlonJVgtubNC1If3yCZ-5bNX7SersUVJC8YCXW9euKVhVnPS3JnfhPoSnv2gTD4GXYMoA~og3iLMUxdmpisepwCf2VsEwdfrPa6~ZllUaabXYfS~kQU8qbrrDLj27L-TX69~UJoPbf5qW67RE0TEHoWjjXNYTPA~q1enfVPT872Ia99DaXDOrsgqzrja2HsQZHjmbC4iddSkpbKGTruDmwFTnTECUqUEtzGAsK~3lOMFrwBebD093k8vNX3Ez7GTqliB9WvpXB-zNsp2bNVbjwmEnyCLbtWTYSnzKbBBpjL7D~wg__">
                    </div>
                    <div>
                        <h3>베리맛</h3>
                        <img src="https://s3-alpha-sig.figma.com/img/101a/eb13/6272e576b14de4d4c0085a917454e9f8?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qWtd1JCapC8DH7Hyzsw5CrucW5bCOvhFxiVaqwIw4zNhJz5mrIyg0vlHZVXBsaZX6Hve9-LaI6skOpL8as~~s3~N1pVG7ykoCu3qzaWhqrjYu0HP4G5m-00W1PHiUrq0CNBjKGuAIL6oa6OLbWYLNrLTokNlO~b272ESnf9~5WhR8fhnTP5xypUDUelt2mRzzxpqAFX4Gzv37GyFgf4nd5fisQt0exxn8Z2y-UVwutOjhuAuhiDauOdi-v1~mWJkD7LpxIu6ahN1u7AcZO55ug7Uc7K60xxY6hI4cALIMq7-O9pULkIHZnmaH8WZSL6pF1tEs~mOgYLi~ciM1wvY7w__">
                    </div>
                    <div>
                        <h3>살구맛</h3>
                        <img src="https://s3-alpha-sig.figma.com/img/d4dc/c29c/d13a040c9f42242f0cb454ec5f326bc8?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qEnuZfMpKl6m7JCDO-By-FTt4JFv6UdaEYzN2F~9SAEqbnwCKASVd26NKljB~19wDAv6HGkuyNpcmj~k9KO0GY-fnJhMpqneaawi-TY3IokqtGTsHzdb6N2UhNvLXYv7JwLtj-KM7wjT9d52f1L9ynLhVnEDI7~V8fluRGLAvf9t0c-TAjGRiG00C-Fnvb-NoVarmbpuL4HsDZGjqSeNtWVeP5P2wf2WfSmaqIDO1XAWKxINNoiPCffNavy-9HsAr3AV8GpDDdETyVE2BAYE5o5r2M-pOU7v-dEzpnJBguHg7f6vDms5nmfQBFlf5UFlvCiJuHrxXTqY3bQIDFCmFA__">
                    </div>
                </div>
            </div>
        `
    }

    // URL에서 ID를 추출하는 함수
    getIdFromURL() {
        const hash = window.location.hash;
        const match = hash.match(/#\/growth\?id=(\d+)/);
        return match ? parseInt(match[1], 10) : null;
    }

    getAverageWeight(species, ageInMonths) {
        const speciesWeights = averageWeights[species];
        if (!speciesWeights) return null;
    
        if (ageInMonths >= 18) {
            const range = speciesWeights["18+"];
            if (range) return (range.min + range.max) / 2; // 범위의 중간값 반환
            return null;
        }
    
        return speciesWeights[ageInMonths] || null;
    }
}
