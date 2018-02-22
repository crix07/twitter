import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import App from './App.vue';
import createPublication from './components/createPublication.vue';
import Home from './components/Home.vue';
import editPublication from './components/editPublication.vue';

const routes = [{
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'Create',
        path: '/create/publication',
        component: createPublication
    },
    {
        name: 'Update',
        path: '/edit/:id',
        component: editPublication
    }
];

const router = new VueRouter({ mode: 'history', routes: routes });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');