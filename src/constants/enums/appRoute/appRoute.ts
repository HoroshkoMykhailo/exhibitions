const AppRoute = {
    ANY: '*',
    STRIPE: '/',
    HOME: '/home',
    LOGIN: '/login',
    REGISTER: '/register',
    NEW_POST: '/new-post',
} as const;

export { AppRoute };