<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = `Beslisser - ${to.meta.title}` || 'Beslisser'
        // this.$router.push('/authentication')
      }
    }
  }
};
</script>

<style lang="css">
  * {
    font-family: 'Ubuntu', sans-serif !important;
  }
</style>
