<template>
  <div>
     <div v-if="loading" class="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <b-table v-if="leaderboard" striped hover :items="leaderboard"></b-table>
  </div>
</template>

<script>
import {TOKEN_LOCALSTORAGE_NAME, API_ADDRESS} from '../config.js'

const REQUEST_PATH = 'leaderboard';


export default {
  name: "Rating",
  components: {},
  data() {
          return {
            error: null, 
            loading:true, 
            leaderboard:null
          };
        },
  created() {
    localStorage.setItem(TOKEN_LOCALSTORAGE_NAME, 'de95db4f6bd32774ad32a4d56a85321cd1a0c573')
    this.fetchData()
    
  },
  methods: {
    fetchData(){
      this.error = this.liderboard = null
      this.loading = true
      fetch(API_ADDRESS+REQUEST_PATH +'?token=' + localStorage.getItem(TOKEN_LOCALSTORAGE_NAME))
        .then((response)=>{
          if (response.ok) {
            return response.json();
          } else {
            this.error = 'Error!' + response.status+ ': ' +response.statusText;
          }
        })
        .then((data = null)=> {
          console.log(data?.leaderboard);
          this.leaderboard = data?.leaderboard;
        });
    }
  }
};
</script>
