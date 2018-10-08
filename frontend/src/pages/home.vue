<template>
  <el-container id="page-container">
  	<el-aside width="200px" id="nav">Aside</el-aside>
  	<el-container>
    	<el-header id="header">Header</el-header>
    	<el-main id="main">
			  <router-view/>
		</el-main>
  	</el-container>
</el-container>
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

