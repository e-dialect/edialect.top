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
								{{ dialect.name }}
							</v-card-title>

							<v-card-text v-if="dialect.name!=='请选择'">

								<v-divider class="pa-3"></v-divider>
								<p>
									{{ dialect.content }}
								</p>
								<v-btn
									v-if="dialect.link"
									depressed
									@click="goToNewWebsite(dialect.link)"
								>
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
import { dialects } from '@/assets/content.js'

export default {
	name: 'Home',
	data() {
		return {
			active: ['莆仙方言'],
			search: null,
		}
	},
	computed: {
		filter() {
			return (item, search) => {

				for (let i in item)
					if (item[i].indexOf(search) > -1){
						return true
					}
				return false
			}
		},

		dialect() {
			let dialect = undefined
			if (this.active)
				dialect = this.active[0]
			let result = { name: '请选择' }
			if (dialect) {
				this.dialectList.forEach(item => {
					if (item.id === dialect) return result = item
					if (item.children) {
						item.children.forEach(jtem => {
							if (jtem.id === dialect) return result = jtem
						})
					}
				})
			}
			return result
		},
		dialectList() {
			return dialects
		}

	},
	methods: {
		goToNewWebsite(url) {
			window.open(url)
		}
	}
}
</script>
