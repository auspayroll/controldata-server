import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)

const baseUrl = 'http://localhost:8087'
const remoteUrl = 'http://localhost:3000'
const errorTimeout = 5000;

export default new Vuex.Store({
	state: {
		token: null,
		devices: [], 
		deviceModels: [],
		wsConnection: null,
		ports: [],
		expiry: null,
		error: '',
		connections: {}
	},
	getters: {
		token(state){
			if(state.token !== null){
				return state.token
			}
			const token = localStorage.getItem('token')
			if(!token){
			  return
			}
			const tokenSet = localStorage.getItem('tokenSet')
			if(Date.now() > tokenSet){ 
			  return //expired
			}
			state.token = token
			return token		
		},
		isAuthenticated(state){
			return state.token !== null
		},
		devices: state => {
			return state.devices
		},
		deviceModels: state => {
			return state.deviceModels
		},
		ports: state => {
			return state.ports
		},
		wsConnection: state => {
			return state.wsConnection
		},
		expiry: state => {
			return 3
		},
		error: state => {
			return state.error
		},
		connections: (state) => {
			return state.connections
		}
	},
	mutations: {
		setToken(state, token){ 
			//set token expiry
			localStorage.setItem('token', token)
			localStorage.setItem('tokenSet', Date.now())
			state.token = token
		}, 
		setDevices(state, devices){ state.devices = devices },
		setDeviceModels(state, deviceModels){ state.deviceModels = deviceModels },
		setPorts(state, ports){ state.ports = ports },
		setWsConnection(state, connection){ state.wsConnection = connection },
		clearAuthData(state){ 
			state.token = null
			localStorage.removeItem('token')
			localStorage.removeItem('tokenSet')
		},
		setError(state, errorMessage){
			state.error = errorMessage
			setTimeout(() => state.error = '', 3000)
		},
		setConnection(state, port){
			console.log('connect device')
			if(!state.token || state.connections.port){
				return 
			}
			var connection = new WebSocket("ws://localhost:8087/connect?token="+state.token+"&port="+port)
			if(connection){
				state.connections[port] = connection
				connection.onclose = (event) => {
					delete state.connections[port]
					console.log("connection " + port + " closed")
				}
			} 
		},
		deleteConnection(state, port){
			delete state.connections[port]
		}
	},
	actions: { 
		register: ({ commit, dispatch }, payload) => { 
			console.log(payload)
			axios.post(baseUrl + '/register', 
				{ username: payload.username, password: payload.password, register_url: payload.register_url })
			.then(result => {
				commit('setToken', result.data.token) 
				console.log('registered')
				//dispatch('setLogoutTimer')
				router.replace('/devices')
			})
			.catch(error => {
				console.log("error")
				commit('setError', error.response.data.message)
			})
		},
		login: ({ commit, dispatch }, payload) => { 
			axios.post(remoteUrl + '/login', 
			{ username: payload.username, password: payload.password})
			.then(result => {
				commit('setToken', result.data.localToken) 
				//dispatch('setLogoutTimer')
				router.replace('/devices')
			})
			.catch(error => commit('setError', error.response.data.message))
		},
		logout({commit}){
			commit('clearAuthData')
		},
		registerDevice: ({ commit }, payload) => { 
			console.log(payload)
			axios.post(remoteUrl + '/devices', 
				{ serial: payload.serial, description: payload.description, model: payload.model })
			.then(result => {
				console.log('registered')
				//dispatch('setLogoutTimer')
				router.replace('/devices')
			})
			.catch(error => {
				console.log("error")
				commit('setError', error.response.data.message)
			})
		},
		setLogoutTimer({commit, state}){
			var expireAfter = state.expiry
			setTimeout(() => {
				commit('clearAuthData')
			}, expireAfter * 1000)
		},
		setDevices: ({commit, state}) => {
			console.log('setting devices')
			if(!state.token){
				console.log('no token')
				return 
			} 
			axios.get(remoteUrl + '/devices?token=' + state.token)
			.then(result => {
				commit('setDevices', result.data.devices)
			})
			.catch(error => commit('setError', error.response.data.message))
		}, 
		setDeviceModels: ({commit, state}) => {
			if(!state.token){
				console.log('no token!')
				return 
			} 
			axios.get(remoteUrl + '/deviceModels?token=' + state.token)
			.then(result => {
				console.log(result)
				commit('setDeviceModels', result.data.deviceModels)
			})
			.catch(error => commit('setError', error.response.data.message))
		}, 
		setPorts: ({commit, state}) => {
			if(!state.token){
				console.log('no token')
				return 
			} 
			axios.get('baseUrl' + '/ports?token=' + state.token)
			.then(result => {
				commit('setPorts', result.data.ports)
			})
			.catch(error => commit('setError', error.response.data.message))
		}
	} 
})
