import { createRouter } from "../core/setup";
import Home from './Home'
import Lizard from './Lizard'
import Mating from './Mating'
import NotFound from './NotFound'
import FindMate from './FindMate'

export default createRouter([
    { path: '#/', component: Home },
    { path: '#/lizard', component: Lizard},
    { path: '#/mating', component: Mating },
    { path: '.*', component: NotFound }
])