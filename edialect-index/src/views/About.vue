<template>
  <v-container>
    <v-card>
      <v-card-title class="white--text text-h5" style="background-color:#93B372">
        关于我们
      </v-card-title>
      <v-card-text class="pa-3" style="font-size:large">
        这是关于我们的页面，内容有空再写
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "About",
  data() {
    return {}
  },
  created() {
    this.$store.commit("changeTab", 2)
  }

}
</script>
