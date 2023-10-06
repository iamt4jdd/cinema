import {
    Home,
    Login,
    NowShowing,
    ComingSoon,
    Booking,
    Movie
} from './pages'





const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/now-showing', component: NowShowing },
    { path: '/coming-soon', component: ComingSoon },
    { path: '/booking', component: Booking },
    { path: '/movie/:movieId', component: Movie },

]

const privateRoutes = [
    
]


export { publicRoutes, privateRoutes }