<template>
	<div class="app">
		This is App
	</div>
</template>

<script>
export default {
	created() {
		this.$axios.get('/open/index').then(res => {
			console.log('adsasd', res.data)
		})
	}
}
</script>

<style lang="scss">
.app {
	color: #cccccc;
}
</style>
