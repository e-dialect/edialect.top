<template>
  <v-container>
    <v-card>
      <v-card-title class="white--text text-h5" style="background-color:#93B372">
        项目介绍
      </v-card-title>
      <v-card-text class="pa-3" style="font-size:large">
        这是项目介绍的页面，内容有空再写
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Introduction",
  created() {
    this.$store.commit("changeTab", 1)
  }
}
</script>

<style scoped>

</style>
