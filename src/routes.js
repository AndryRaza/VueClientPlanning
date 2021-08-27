import Planning from './components/Planning.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Examiner from './components/Examiner.vue'

const routes = [
    {path : '*',component: Home},
    {path : '/planning/:id', component : Planning},
    {path: '/', component: Login},
    {path: '/examiner', component: Examiner}
];

export default routes;