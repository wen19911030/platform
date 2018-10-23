<template>
  <div class="wrapper">
    主页
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'home',
	computed: {
		...mapGetters(['user'])
	},
	data() {
		return {};
	},
	created() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
</style>

