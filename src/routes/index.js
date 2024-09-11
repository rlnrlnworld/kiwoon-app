import { createRouter } from "../core/setup";
import Home from './Home'
import Lizard from './Lizard'
import Mating from './Mating'
import Enclosure from "./Enclosure"
import Register from './Register'
import NotFound from './NotFound'
import GrowthCmp from './GrowthCmp'

export default createRouter([
    { path: '#/', component: Home },
    { path: '#/lizard', component: Lizard},
    { path: '#/mating', component: Mating },
    { path: '#/enclosure', component: Enclosure },
    { path: '#/register', component: Register },
    { path: '#/growth', component: GrowthCmp },
    { path: '.*', component: NotFound }
])