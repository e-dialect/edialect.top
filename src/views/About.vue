<template>
  <v-container>
    <v-card>
      <v-card-title class="white--text text-h5" style="background-color:#93B372">
        关于我们
      </v-card-title>
      <v-card-text class="pa-3">
        <h2>团队成员</h2>
        <p>
          团队成员皆来自北京邮电大学，自E方言2020年10月正式立项至今，已累计有十余人参与到E方言的建设团队中，现已进行一轮成员更替。
          <br>
          我们接受来自北京邮电大学的科研导师、实验室以及资金的支持，具有强有力的技术支撑。
          <br>
          在各方面支持下，团队成员分工明确，先后完成了网站搭建、数据库设计、小程序设计、功能维护等技术工作。
          <br>
          我们专业知识扎实，能运用Vue，Django，Docker，Traefik等技术对E方言进行开发和运维。
          <br>
          并在美国大学生数学建模竞赛，全国大学生数学竞赛，CCF大学生计算机系统与程序设计竞赛等国家级学科、双创竞赛上斩获多奖。
        </p>

        <h2>语言顾问</h2>
        <p>
          于此同时我们针对不同方言服务包联络不同的语言顾问，力求用更多的努力，换取更专业的知识。
          <br>
          仅莆仙方言的语言顾问团队便达到15人，覆盖哲、法、文、史、工等五个学科门类，就读或毕业于中国、英国、马来西亚等国的诸多高等院校。
          <br>
          团队与“三莆团队”、“莆仙乡音社”达成顾问协议，E方言团队提出平台的构想并与顾问团队交流改进，共同优化 E 方言平台，双方了友好的交流合作。
        </p>

        <h2>联系我们</h2>
        <div>
          如果您有任何建议或意见，可以发送邮件至 edialect@edialect.top，或
          <a
              target="_blank"
              href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=ocTFyMDNxMLV4cTFyMDNxMLVj9XO0Q"
              style="text-decoration:none;">
            点击此处
          </a>快捷反馈
        </div>
        <div>
          此外，欢迎您参观E方言的
          <a
              target="_blank"
              href="https://github.com/e-dialect"
              style="text-decoration:none;">
            代码社区
          </a>，向我们提出您的宝贵意见或帮助我们解决问题
        </div>
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
