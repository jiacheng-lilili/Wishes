import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

const service = axios.create({
    baseURL: 'http://localhost:3000', // url = base url + request url
    timeout: 5000 // request timeout
})

export default service;
