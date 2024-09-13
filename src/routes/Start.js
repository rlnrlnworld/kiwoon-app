import { Component } from '../core/setup'

export default class Start extends Component {
    render() {
        this.el.classList.add('container','start')
        this.el.innerHTML = `
            <div>
                <img src="https://s3-alpha-sig.figma.com/img/9bb9/0767/08eb01b495796ef64d331b2c7ed4bae2?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OtIz5CVHWRlu8U7UE5iu42xSBX-TH-OdWk78kN6qvkoqzSrbyleKbWNxODyZKO-6iB-ojqQJxrM3d3yoAdkElkqGX19TtOE7tVvXgFzi3p3tJQ-WTu3Q9JKMrDwi0PBNrrpypHtU1hYCsK2EVoF38~hU0H8ER8MEex~ek-8HBWJdsBBUA9mRpkrJOtSKx2lyH2s98uzKiTH0Ml2Jjv5atfn7WHGGn0eP3QqK2E~T4T7vKh74cxQ-vybrKauWb3bWaNZOJPUSPeIupuUDF0M70KwWHf9tSpw~LHO8z5eMSW-UK-aRtgX4sgLNMr3vMKYVb-~7ioLoZh-6-IF5TOG4IQ__">
                <h1 class="titleEng">kiiun</h1>
                <h1>키운</h1>
            </div>
        `
        
        this.el.addEventListener('click', () => {
            
            window.location.hash = '#/home'
        })
    }
}