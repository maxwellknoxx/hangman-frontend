<template>
  <div id="app">
    <div class="game">
    <h1>{{ category.categoryName }}</h1>
    <h2>{{ computedHiddeWord }}</h2>
    
        <input type="text" v-model="typedLetter" required>
        <button class="waves-effect waves-light btn-small">
          Check
          <i class="material-icons left">check</i>
        </button>
    </div>
  </div>
</template>


<script>
import Services from "../services/hangmanServices";

export default {
  data() {
    return {
      id: this.$route.params.data,
      category: "",
      hiddenWord: " ",
      words: []
    };
  },

  mounted() {
    this.findAllWordsByCategory();
    this.findCategoryById();
  },

  methods: {
    findAllWordsByCategory() {
      Services.findAllWordsByCategory(this.id).then(response => {
        this.words = response.data.listData;
        console.log(this.words[0].word)
      });
    },

    findCategoryById() {
      Services.findCategoryById(this.id).then(response => {
        this.category = response.data.data;
      });
    }
  },

  computed: {
    // a computed getter
    computedHiddeWord: function() {
      var i;
      var hidden = " ";
      for (i = 1; i <= this.words[0].word.length; i++) {
        this.hiddenWord += "-";
      }
      return this.hiddenWord;
    }
  }
};
</script>

<style>

.game {
  margin: auto;
  width: 50%;
  border: 3px solid blue;
  padding: 10px;
}

</style>
