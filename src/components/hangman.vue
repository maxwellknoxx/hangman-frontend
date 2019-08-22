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
        />
        <button
          class="waves-effect waves-light btn-small"
          :disabled="!this.counter"
          v-if="!this.isGameOver"
        >
          Check
          <i class="material-icons left">check</i>
        </button>
        <BR />
        <BR />
      </form>
      <button
        class="waves-effect waves-light btn-small"
        @click="guessWord()"
        :disabled="!this.counter"
        v-if="!this.isGameOver"
      >
        Try to guess word
        <i class="material-icons left">check</i>
      </button>
      <button class="waves-effect waves-light btn-small" @click="play()" v-if="this.isGameOver">
        New game
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
      counter: 5,
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
        if (response !== false) {
          this.start();
          this.playingWord = response.data.data;
        } else {
          this.showMessage("Please, try again");
        }
      });
    },

    start() {
      this.isGameOver = false;
      this.counter = 5;
      this.message = "";
      this.playingWord.letter = "";
    },

    verifyLetter() {
      Services.verifyLetter(this.playingWord).then(response => {
        this.playingWord = response.data.data;
        var msg = response.data.message;
        if (
          this.isWordCompleted(msg) === false &&
          this.isValidLetter(response) === false
        ) {
          if (this.counter === 0) {
            this.gameOver("You lose");
          }
        }
      });
    },

    isWordCompleted(msg) {
      if (this.playingWord.wordCompleted === true) {
        this.gameOver(msg);
        return true;
      }
      return false;
    },

    isValidLetter(response) {
      if (this.playingWord.status === true) {
        this.playingWord.letter = "";
        return true;
      }
      this.counter = this.counter - 1;
      this.playingWord.letter = "";
      return false;
    },

    guessWord() {
      this.playingWord.guessWord = prompt("What is the word?");
      Services.guessWord(this.playingWord).then(response => {
        this.playingWord = response.data.data;
        if (this.playingWord.wordCompleted === true) {
          this.playingWord.currentWord = this.playingWord.playingWord;
        }
        this.gameOver(response.data.message);
      });
    },

    gameOver(messageToShow) {
      this.showMessage(messageToShow);
      this.playingWord.currentWord = "";
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
