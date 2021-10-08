<template>
	<v-container>
		<v-card>
			<v-card-title class="white--text text-h5" style="background-color:#93B372">
				项目介绍
			</v-card-title>
			<v-card-text class="pa-3" style="font-size:large">
				<p>
				E方言是一款针对于年轻群体的方言信息整合工具，为用户提供交流平台的同时，满足了社会各界对于方言及地方文化互通的需求。E方言通过贯通“查（询）、识（别）、（翻）译、（收）集、学（习）”的五大功能模块，营造“引得进、留得住、学得来”的方言环境。
				</p>
				<p>或许需要一些补充.jpg</p>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
export default {
	name: 'Introduction',
	created() {
		this.$store.commit('changeTab', 1)
	}
}
</script>

<style scoped>

</style>
