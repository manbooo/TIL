import axios from 'axios'

export const createMemo = ({ title, body }) => axios.post('/memo', { title, body })

