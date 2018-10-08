<template>
    <el-container id="wrapper">
        <el-aside width="220px" id="nav">
            <nav-item></nav-item>
        </el-aside>
  	    <el-container>
        	<el-header id="header">Header</el-header>
        	<el-main id="main">
	    		  <router-view/>
	    	</el-main>
  	    </el-container>
    </el-container>
</template>

<script>
import navItem from '../components/nav-item';
export default {
  name: 'content',
  components: {
    navItem
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
#wrapper {
  width: 100%;
  height: 100%;
}
#nav {
  background: #2d3a4b;
  color: #fff;
}
#main {
  background: #f7f7f7;
}
</style>
