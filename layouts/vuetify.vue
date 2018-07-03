<template>
  <v-app>
    <v-navigation-drawer
    v-if="$store.state.userInfo.level < 3"
    persistent
    :mini-variant="miniVariant"
    :clipped="clipped"
    v-model="drawer" 
    enable-resize-watcher
    fixed
    app
    >
      <v-card>
        <v-card-media src="https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0"> {{user.username}}</h3>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
          <v-btn flat color="orange" @click="logout">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
      class="green darken-1"
    >
      <v-toolbar-side-icon v-if="$store.state.userInfo.level > 3" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <!-- <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer> -->
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        title: 'RMS Mobile System',
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
        ],
        miniVariant: false,
        user: {
          username : '',
          level: 2,
        },
        errorMsg: ''
      }
    },
    methods: {
      clickNav (event) {
        console.log('clicked nav menu')
        this.drawer = false
      },
      logout() {
        this.$store.dispatch('LOGOUT')
      }
    },
    created () {
      console.log('App.vue create')
    }
  }
</script>
