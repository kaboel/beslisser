<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>

    <v-overlay :value="loadingState"
                opacity="0.1">
      <div class="lds-ripple"><div></div><div></div></div>
    </v-overlay>
  </v-app>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'App',

    watch: {
      $route: {
        immediate: true,
        handler (to, from) {
          document.title =
            `Beslisser - ${to.meta.title}`
            || 'Beslisser'
        }
      },
    },

    computed: {
      ...mapGetters({
        loadingState: 'getLoadingState',
        isAuthenticated: 'getAuthState'
      }),
    },

    created() {
      this.checkAuth()
    },

    methods: {
      ...mapActions({
        checkAuth: 'checkAuth',
      })
    }
  };
</script>

<style lang="css">
  * {
    font-family: 'Ubuntu', sans-serif !important;
  }
  .lds-ripple {
    display: inline-block;
    position: relative;
    width: 160px;
    height: 160px;
  }
  .lds-ripple div {
    position: absolute;
    border: 4px solid #7cc5fa;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 72px;
      left: 72px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 144px;
      height: 144px;
      opacity: 0;
    }
  }
</style>
