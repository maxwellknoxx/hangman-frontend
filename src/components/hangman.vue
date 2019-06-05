<template>
  <div id="app">
    <div class="game">
      <form @submit.prevent="verifyLetter">
    <h1>{{ category.categoryName }}</h1>
    <h2>{{ playingWord.currentWord }}</h2>
    <h3> {{ message }} </h3>
    
        <input type="text" name="playing" v-model="playingWord.letter" required>
        <button class="waves-effect waves-light btn-small">
          Check
          <i class="material-icons left">check</i>
        </button>
        <BR/>
        <BR/>
        <button class="waves-effect waves-light btn-small" @click="guessWord()">
          Guess word
          <i class="material-icons left">check</i>
        </button>
      </form>
    </div>
  </div>
</template>


<script>
import Services from "../services/hangmanServices";

export default {
  data() {
    return {
      playingWord: {
        playingWord: "",
        letter: "",
        currentWord: "",
        guessWord: "",
        status: ""
      },
      id: this.$route.params.data,
      category: "",
      message: ""
    };
  },

  mounted() {
    this.findCategoryById();
    this.play();
  },

  methods: {

    play() {
      Services.play(this.id).then(response => {
        this.playingWord = response.data.data;
      })
    },

    verifyLetter() {
      Services.verifyLetter(this.playingWord).then(response => {
        this.playingWord = response.data.data;
        this.playingWord.letter = "";
      })
    },

    guessWord() {
      this.playingWord.guessWord = this.playingWord.letter;
      Services.guessWord(this.playingWord).then(response => {
        this.playingWord = response.data.data;
        if (this.playingWord.status) {
          this.playingWord.currentWord = this.playingWord.playingWord;
          this.message = response.data.message;
        }
      })
    },

    findCategoryById() {
      Services.findCategoryById(this.id).then(response => {
        this.category = response.data.data;
      });
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
