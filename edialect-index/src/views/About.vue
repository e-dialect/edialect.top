<template>
  <v-container>
    <v-card>
      <v-card-title class="white--text text-h5" style="background-color:#93B372">
        关于我们
      </v-card-title>
      <v-card-text class="pa-3">
        <h2>团队成员</h2>
        <p>
          团队成员皆来自北京邮电大学，累计共有十余人参与到E方言项目中，现已进行一轮成员更替。
          <br>
          团队成员包括19级及20级本科生，课内成绩优异的同时拥有扎实的编码能力与丰富的项目经历。
          <br>
          团队成员历获国家奖学金、北京邮电大学一等奖学金、北京邮电大学三好学生等奖学金及荣誉称号，综合素质评价位居专业前列。
          <br>
          团队成员广泛参与美国大学生数学建模竞赛，全国大学生数学竞赛，CCF大学生计算机系统与程序设计竞赛等国家级学科、双创竞赛，所获奖项颇丰。
        </p>

        <h2>语言顾问</h2>
        <p>
          于此同时我们针对不同方言服务包联络不同的语言顾问，力求用更多的努力，换取更专业的知识。
          <br>
          仅莆仙方言的语言顾问团队便达到15人，覆盖哲、法、文、史、工等五个学科门类，就读或毕业于中国、英国、马来西亚等国的诸多高等院校。
        </p>

        <h2>联系我们</h2>
        <div>
          如果您有任何建议或意见，可以发送邮件至 edialect@edialect.top，也可以
          <a
              target="_blank"
              href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=ocTFyMDNxMLV4cTFyMDNxMLVj9XO0Q"
              style="text-decoration:none;">
            点击此处
          </a>快捷反馈
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
