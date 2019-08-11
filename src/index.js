import Vue from 'vue'
import axios from 'axios'
import App from './App'

import '../mock'

Vue.prototype.$axios = axios

new Vue({
	render: h => h(App)
}).$mount('#root')
