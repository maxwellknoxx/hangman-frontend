<template>
  <div id="app">
    <div class="game">
      <form @submit.prevent="verifyLetter">
        <h2>{{ category.categoryName }}</h2>
        <h2>Counter: {{ counter }}</h2>
        <h2>{{ playingWord.currentWord }}</h2>
        <h2>{{ message }}</h2>

        <input
          type="text"
          maxlength="1"
          name="playing"
          v-model="playingWord.letter"
          required
          :disabled="!this.counter"
          v-if="!this.isGameOver"
        >
        <button
          class="waves-effect waves-light btn-small"
          :disabled="!this.counter"
          v-if="!this.isGameOver"
        >
          Check
          <i class="material-icons left">check</i>
        </button>
        <BR/>
        <BR/>
        <button
          class="waves-effect waves-light btn-small"
          @click="guessWord()"
          :disabled="!this.counter"
          v-if="!this.isGameOver"
        >
          Guess word
          <i class="material-icons left">check</i>
        </button>
        <button class="waves-effect waves-light btn-small" @click="play()" v-if="this.isGameOver">
          New game
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
      message: "",
      counter: 2,
      isGameOver: false
    };
  },

  created() {
    this.findCategoryById();
    this.play();
  },

  mounted() {},

  methods: {
    play() {
      Services.play(this.id).then(response => {
        this.start();
        this.playingWord = response.data.data;
        console.log(this.playingWord);
      });
    },

    start() {
      this.isGameOver = false;
      this.counter = 2;
      this.message = "";
      this.playingWord.letter = "";
    },

    verifyLetter() {
      Services.verifyLetter(this.playingWord).then(response => {
        if (!response.data.status) {
          this.counter = this.counter - 1;
          if (this.counter == 0) {
            this.gameOver("You lose");
          }
        } else {
          this.playingWord = response.data.data;
          this.playingWord.letter = "";
        }
      });
    },

    guessWord() {
      this.playingWord.guessWord = prompt("What is the word?");
      console.log(this.playingWord.guessWord);
      Services.guessWord(this.playingWord).then(response => {
        this.playingWord = response.data.data;
        if (this.playingWord.status) {
          this.playingWord.currentWord = this.playingWord.playingWord;
          this.gameOver(response.data.message);
        } else {
          this.showMessage(response.data.message);
        }
      });
    },

    gameOver(messageToShow) {
      this.showMessage(messageToShow);
      this.isGameOver = true;
    },

    findCategoryById() {
      Services.findCategoryById(this.id).then(response => {
        this.category = response.data.data;
      });
    },

    showMessage(messageToShow) {
      this.message = messageToShow;
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
