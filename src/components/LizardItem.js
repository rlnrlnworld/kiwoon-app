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
    }
}