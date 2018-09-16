import axios from 'axios'

export const getInitialMemo = () => axios.get('/memo/?_sort=id&_order=DESC&_limit=20')

export const createMemo = ({ title, body }) => axios.post('/memo', { title, body })

export const getRecentMemo = (cursor) => axios.get(`/memo/?id_gte=${cursor+1}&_sort=id&_order=DESC&`)
