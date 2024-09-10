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

        this.el.setAttribute('href', `#/lizards?id=${lizard.id}` )
        this.el.classList.add('lizard')
        this.el.innerHTML = `
            <div class="info">
                <img src="${lizard.image}" alt="${lizard.name}">
                <h3>${lizard.name}</h3>
            </div>
        `
    }
}