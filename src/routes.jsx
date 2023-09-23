import {
    Home,
    Movie,
    Login,
    NowShowing,
    Contact
} from './pages'





const publicRoutes = [
    { path: '/', component: Home },
    { path: '/movie', component: Movie },
    { path: '/login', component: Login },
    { path: '/now-showing', component: NowShowing },
    { path: '/contact', component: Contact },

]

const privateRoutes = [

]


export { publicRoutes, privateRoutes }