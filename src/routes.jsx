import {
    Home,
    Login,
    NowShowing,
    ComingSoon,
    Booking,
    Movie,
    Ticket
} from './pages'



const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/now-showing', component: NowShowing },
    { path: '/coming-soon', component: ComingSoon },
    { path: '/movie/:movieId', component: Movie },
    
]

const privateRoutes = [
    { path: '/booking/:showTimeId', component: Booking },
    { path: '/ticket/', component: Ticket },
]


export { publicRoutes, privateRoutes }