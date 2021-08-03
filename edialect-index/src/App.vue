<template>
  <div id="app">
    <v-app>
      <v-app-bar app color="#5F8361">
        <v-row class="align-center justify-start " flex>
          <v-col cols="2">
            <v-img
                alt="E方言图标"
                contain
                height="64px"
                src="@/assets/elogo.png"
            >
            </v-img>
          </v-col>
          <v-col cols="6">
            <v-tabs
                v-model="tab"
                align-with-title
                background-color="transparent"
                color="white"
            >
              <v-tabs-slider color="yellow"></v-tabs-slider>
              <v-tab
                  v-for="item in list"
                  :key="item.name"
                  @click="$router.push(item.link)"
              >
                <!--点太快会出现一些奇怪的错误-->
                {{ item.name }}
              </v-tab>
            </v-tabs>
          </v-col>
        </v-row>
      </v-app-bar>


      <!-- 根据应用组件来调整你的内容 -->
      <v-main>
        <!-- 给应用提供合适的间距 -->
        <v-container fluid>
          <!-- 如果使用 vue-router -->
          <router-view></router-view>
        </v-container>
      </v-main>

      <v-footer app color="#2E2E2E" padless>
        <v-container>
          <v-row justify="space-around" type="flex">
            <v-col cols="3">
              <v-img contain max-width="240" src="@/assets/elogo.png"></v-img>
            </v-col>
            <v-col class="align-center justify-center" cols="7" style="color: white">
              <h4> 相关网站：
                <a href="https://www.ydict.net/" style="color: white">榕典</a> &#8194;|
                <a href="https://www.moedict.tw/" style="color: white">萌典</a>&#8194;|
                <a href="https://fangyan.xunfei.cn/#/" style="color: white">讯飞方言保护计划</a>&#8194;|
                <a href="https://zhongguoyuyan.cn/" style="color: white">中国语言保护工程采录展示平台</a>
              </h4>
              <h4> 关于我们：
                <router-link style="color: white" to="/about">团队介绍</router-link>&#8194;|
                <router-link style="color: white" to="/contact">联系我们</router-link>&#8194;|
                <a href="" style="color: white">Github</a>
              </h4>
              <h4>Copyrights © {{ new Date().getFullYear() }} Easy Dialect. All Rights Reserved.</h4>
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
    </v-app>
  </div>

</template>


<script>
export default {
  data: () => ({
    list: [
      {name: "首页", link: "/"},
      {name: "介绍", link: "/introduction"},
      {name: "关于", link: "/about"},
    ],
  }),
  computed: {
    tab: {
      get: function () {
        return this.$store.getters.tab
      },
      set: function (value) {
        return this.$store.commit('changeTab', value)
      }
    }
  },
  watch: {}
}
</script>
