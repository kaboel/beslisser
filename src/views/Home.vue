<template>
  <div>
    <v-app-bar src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
               color="primary"
               dark>
      <v-img class="mx-2"
             src="../assets/logo-dark.png"
             max-width="150"
             contain
      ></v-img>

      <v-spacer/>

      <v-menu v-model="menu"
              :close-on-content-click="false"
              nudge-width="200"
              offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text
                 fab
                 v-on="on"
                 color="blue-lighten-5">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-icon>mdi-account</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list dense
                  nav>
            <v-list-item link
                         @click="logoutDialog=true">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Sign out</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-dialog v-model="logoutDialog"
              max-width="400">
      <v-card>
        <v-card-title class="headline blue--text">
          You want to logout?
        </v-card-title>
        <v-card-text>
          Are you sure? If you made some changes that you have not saved, all of them will be discarded.
          There's no going back from this.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red lighten-1"
                 text
                 @click="logoutDialog = false">
            Stay
          </v-btn>
          <v-btn color="green darken-1"
                 text
                 @click="userLogout">
            Yes, I'm sure.
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import service from "../helpers/service";

  export default {
    name: 'Home',

    components: {
    },

    data: () => ({
      nav: false,
      menu: false,
      logoutDialog: false,
    }),

    computed: {
      ...mapGetters({
        user: 'getActiveUser'
      })
    },

    methods: {
      ...mapActions({
        userLogout: 'userLogout'
      })
    }
  }
</script>

<style>

</style>
