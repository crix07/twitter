import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import vueResource from 'vue-resource';
Vue.use(vueResource)
import App from './App.vue';
import Home from './components/Home.vue';
import editPublication from './components/editPublication.vue';
import Register from './components/register.vue';
import Login from './components/login.vue';
import User from './components/User.vue';

const routes = [{
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'Register',
        path: '/register',
        component: Register
    },
    {
        name: 'Login',
        path: '/login',
        component: Login
    },
    {
        name: 'Update',
        path: '/edit/:id',
        component: editPublication
    },
    {
        name: 'User',
        path: '/user',
        component: User
    }
];

const router = new VueRouter({ mode: 'history', routes: routes });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');