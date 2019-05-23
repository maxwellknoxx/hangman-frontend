<template>
    <div id="app">
        <h1>hangman - {{ category.categoryName }}</h1>
    </div>    
</template>


<script>

import Services from "../services/hangmanServices"

export default {

    data() {
        return {
            id: this.$route.params.data,
            category: "",
            words: []
        }
    },

    mounted() {
        this.findAllWordsByCategory();
        this.findCategoryById();
    },

    methods: {

        findAllWordsByCategory() {
            Services.findAllWordsByCategory(this.id).then(response => {
                this.words = response.data.listData;
            })
        },

        findCategoryById() {
            Services.findCategoryById(this.id).then(response => {
                this.category = response.data.data;
            })
        }

    }
    
}
</script>

<style>

</style>
