<template>
<div class="dashboard-container">
    <div class="dashboard-text">name:{{user.username}}</div>
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
.dashboard {
	&-container {
		padding: 30px;
	}
	&-text {
		font-size: 30px;
		line-height: 46px;
	}
}
</style>

