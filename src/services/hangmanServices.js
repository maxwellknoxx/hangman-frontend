import { http } from './config'
//import { http } from './config.local'

export default {

    play: (id) => {
        return http.get('v1/word/play/' + id)
    },

    findAllWordsByCategory: (id) => {
        return http.get('v1/word/wordsByCategoryId/' + id)
    }, 

    findCategoryById: (id) => {
        return http.get('v1/category/categoriesById/' + id)
    }, 

    findAllCategory: () => {
        return http.get('v1/category/categories')
    },

    verifyLetter: (playingWord) => {
        return http.post('v1/word/verifyLetter', playingWord)
    },

    guessWord: (playingWord) => {
        return http.post('v1/word/guessWord', playingWord)
    }

}