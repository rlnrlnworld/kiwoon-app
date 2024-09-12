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

        // App 인스턴스를 통해 Nav의 타이틀을 업데이트
        if (this.parent && this.parent.updateTitle) {
            this.parent.updateTitle('Home');
        }
    }
}