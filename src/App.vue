<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo center">Hangman</a>
        <ul ul id="nav-mobile" class="left hide-on-med-and-down"></ul>
      </div>
    </nav>
    <ul>
      <li v-for="category in categories" :key="category.id">
        <router-link :to=" '/hangman/' + category.id ">{{ category.categoryName }}</router-link>
      </li>
    </ul>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
import Service from "./services/hangmanServices";

export default {
  data() {
    return {
      categories: []
    };
  },

  created() {
    Service.findAllCategory().then(response => {
      this.categories = response.data.listData;
    });
  }
};
</script>

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333333;
}

li {
  float: left;
  text-align: center;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #111111;
}
</style>
