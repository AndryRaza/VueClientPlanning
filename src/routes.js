import Planning from './components/Planning.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'

const routes = [
    {path : '*',component: Home},
    {path : '/planning/:id', component : Planning},
    {path: '/', component: Login}
];

export default routes;