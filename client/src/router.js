import Vue from 'vue'
import VueRouter from 'vue-router';
import Devices from './components/Devices.vue'
import DeviceRegister from './components/DeviceRegister.vue'
import DeviceUpdate from './components/DeviceUpdate.vue'
import Locations from './components/Locations.vue'
import LocationUpdate from './components/LocationUpdate.vue'
import Chart from './components/Chart.vue'
import Settings from './components/Settings.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import store  from './store'

Vue.use(VueRouter);

function beforeEnter(to, from, next){
	if(store.getters.isAuthenticated){
		next()
	} else {
		next('/login')
	}
}

export const routes = [
	{ path: '/devices', component: Devices, beforeEnter },
	{ path: '/devices/register', component: DeviceRegister },
	{ path: '/devices/update', component: DeviceRegister, beforeEnter },
	{ path: '/locations', component: Locations, beforeEnter },
	{ path: '/locations/update', component: LocationUpdate, beforeEnter },
	{ path: '/devices/chart', component: Chart, beforeEnter },
	{ path: '/settings', component: Settings, beforeEnter },
	{ path: '/login', component: Login },
	{ path: '/register', component: Register }
]

export default new VueRouter({routes})