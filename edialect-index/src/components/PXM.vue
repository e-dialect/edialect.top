<template>
  <v-container>
    <v-row>
      <v-btn
          depressed
          @click="goToNewWebsite('https://pxm.edialect.top')"
      >
        点击访问莆仙方言公共服务包：兴化语记
        <v-icon>
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <div>
        莆仙方言，又称兴化语、兴化话、兴化方言、莆仙语，当地人又称之为本地话，莆田讲的本地话称为莆田话，仙游县讲的本地话也称为仙游话，是分布于福建沿海中东部的地方语言。莆仙话分布于莆田市辖区（荔城区、涵江区、城厢区、秀屿区、乌丘屿）、仙游县以及泉州市泉港区、福清市的部分地区，在莆仙地区和旁边的使用人口约500万，因历史上该地区属于兴化军、兴安州、兴化府，故莆仙话又称为兴化话。以莆仙话为载体的非物质文化遗产有莆仙戏和莆仙木偶戏等。
      </div>
    </v-row>
    <v-row>
      <v-img :src="fenbu" alt="莆仙方言分布图"/>
    </v-row>

  </v-container>
</template>

<script>
const cdn = 'https://hinghwadict-1259415432.cos.ap-shanghai.myqcloud.com/website/'

export default {
  name: "PXM",
  data() {
    return {}
  },
  computed: {
    fenbu() {
      return cdn + '莆仙方言分布图.png'
    }
  },
  methods: {
    goToNewWebsite(url) {
      window.open(url)
    }
  }
}
</script>

<style scoped>

</style>
