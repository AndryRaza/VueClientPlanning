import Planning from './components/Planning.vue'
import Home from './components/Home.vue'

const routes = [
    {path : '*',component: Home},
    {path : '/planning/:id', component : Planning}
];

export default routes;