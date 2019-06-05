import { http } from './config'

export default {

    play: (id) => {
        return http.get('word/play/' + id)
    },

    findAllWordsByCategory: (id) => {
        return http.get('word/findAllByCategoryId/' + id)
    }, 

    findCategoryById: (id) => {
        return http.get('category/findCategoryById/' + id)
    }, 

    findAllCategory: () => {
        return http.get('category/findAll')
    },

    verifyLetter: (playingWord) => {
        return http.post('word/verifyLetter', playingWord)
    },

    guessWord: (playingWord) => {
        return http.post('word/guessWord', playingWord)
    }

}