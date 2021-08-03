<template>
  <div>
    <v-container>
      <v-card>
        <v-row>
          <v-col cols="4">
            <v-card-title class="white--text text-h5" style="background-color:#93B372">
              汉语方言分类
            </v-card-title>
            <v-sheet class="pa-4" style="background-color:#93B372">
              <v-text-field
                  v-model="search"
                  clear-icon="mdi-close-circle-outline"
                  clearable
                  dark
                  flat
                  hide-details
                  label="检索你想查看的方言"
                  solo-inverted
              ></v-text-field>
            </v-sheet>
            <v-card-text>
              <v-treeview
                  :active.sync="active"
                  :filter="filter"
                  :items="dialectList"
                  :search="search"
                  activatable
                  hoverable
                  open-all
                  open-on-click
                  rounded
              >
              </v-treeview>
            </v-card-text>
          </v-col>
          <v-col cols="8">
            <v-card>
              <v-card-title>
                {{ getDialectName }}
              </v-card-title>
              <v-card-text v-if="dialect&&dialect!=='pxm'">
                敬请期待
              </v-card-text>
              <v-card-text v-if="dialect&&dialect==='pxm'">

                <v-divider class="pa-3"></v-divider>
                <p>
                  &#8194;&#8194;&#8194;&#8194;莆田话，是汉藏语系汉语族闽语支莆仙语（莆仙话）的一种方言。莆仙语，又称兴化语、兴化话，当地人又称之为本地话，莆田讲的本地话称为莆田话，仙游县讲的本地话也称为仙游话，是分布于福建沿海中东部的地方语言。莆仙话分布于莆田市辖区（荔城区、涵江区、城厢区、秀屿区、乌丘屿）、仙游县以及泉州市泉港区、福清市的部分地区，在莆仙地区和旁边的使用人口约500万，因历史上该地区属于兴化军、兴安州、兴化府，故莆仙话又称为兴化话。以莆仙话为载体的非物质文化遗产有莆仙戏和莆仙木偶戏等。
                </p>
                <v-btn depressed @click="goToNewWebsite('https://'+dialect+'.edialect.top')">
                  开始访问
                  <v-icon>
                    mdi-arrow-right
                  </v-icon>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>

    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      active: ['pxm'],
      dialectList: [
        {id: 1, name: '官话方言'},
        {id: 2, name: "晋方言"},
        {id: 3, name: "吴方言"},
        {id: 4, name: "徽方言"},
        {
          id: 'min',
          name: "闽方言",
          children: [
            {id: 5001, name: "闽东方言"},
            {id: 5002, name: "闽南方言"},
            {id: 5003, name: "闽北方言"},
            {id: 5004, name: "闽中方言"},
            {
              id: 'pxm',
              name: "莆仙方言",
            },
          ]
        },
        {id: 6, name: "粤方言"},
        {id: 7, name: "客家方言"},
        {id: 8, name: "赣方言"},
        {id: 9, name: "湘方言"},
        {id: 10, name: "平话土话"},
      ],
      search: null,
    }
  },
  computed: {

    filter() {
      return (item, search, textKey) => item[textKey].indexOf(search) > -1
    },

    dialect() {
      if (this.active) {
        return this.active[0]
      } else {
        return undefined
      }
    },

    getDialectName() {
      let result = "请选择"
      if (this.dialect) {
        this.dialectList.forEach(item => {
          if (item.id === this.dialect) return result = item.name
          if (item.children) {
            item.children.forEach(jtem => {
              if (jtem.id === this.dialect) return result = jtem.name
            })
          }
        })
      }
      return result
    }
  },
  methods: {
    goToNewWebsite(url) {
      window.open(url)
    }
  }
}
</script>
