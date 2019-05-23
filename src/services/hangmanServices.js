import { http } from './config'

export default {

    findAllWordsByCategory: (id) => {
        return http.get('word/findAllByCategoryId/' + id)
    }, 

    findCategoryById: (id) => {
        return http.get('category/findCategoryById/' + id)
    }, 

    findAllCategory: () => {
        return http.get('category/findAll')
    }

}