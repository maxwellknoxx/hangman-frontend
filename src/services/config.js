import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://hangman-knoxx.herokuapp.com/api/'
})