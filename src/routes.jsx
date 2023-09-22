import {
    Home,
    Movie,
    Login,
    NowShowing
} from './pages'





const publicRoutes = [
    { path: '/', component: Home },
    { path: '/movie', component: Movie },
    { path: '/login', component: Login },
    { path: '/now-showing', component: NowShowing },

]

const privateRoutes = [

]


export { publicRoutes, privateRoutes }