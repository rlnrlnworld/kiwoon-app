import { Component } from '../core/setup'

export default class LizardItem extends Component {
    constructor(props){
        super({
            props,
            tagName: 'a'
        })
    }
    render() {
        const { lizard } = this.props

        this.el.setAttribute('href', `#/lizard?id=${lizard.lizardId}` )
        this.el.classList.add('lizard')
        this.el.innerHTML = `
            <div class="info">
                <img src="https://i.imgur.com/4WRoTb0.png">
                <h3>${lizard.lizardName}</h3>
            </div>
        `
        this.el.addEventListener('click', (event) => {
            event.preventDefault(); // 기본 링크 동작 방지
            const id = lizard.lizardId;
            window.location.hash = `#/lizard?id=${id}`; // 해시 변경
        });
    }
}