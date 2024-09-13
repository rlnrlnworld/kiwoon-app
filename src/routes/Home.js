import { Component } from "../core/setup"
import LizardList from "../components/Lizardlist"
import Nav from '../components/Nav'

// 도마뱀 선택 페이지
export default class Home extends Component {
    render() {
        const lizardList = new LizardList().el
        const nav = new Nav().el

        this.el.classList.add('container')
        this.el.append(
            nav,
            lizardList
        )
    }
}