<template>
  <el-container class="page-vbs">
    <el-aside class="wrap-nav" width="200px;">
      <h3 class="logo">VBS工作台</h3>
      <el-menu
        router
        class="el-menu-vertical"
        background-color="#26354b"
        text-color="#fff"
        :default-active="defaultActive"
        active-text-color="#ffd04b">
        <el-menu-item index="/">
          <svg-icon icon-class="home"></svg-icon>
          <span slot="title">主页</span>
        </el-menu-item>
        <el-submenu index="/user">
          <template slot="title">
            <svg-icon icon-class="icon-user"></svg-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/user/change-password">修改密码</el-menu-item>
        </el-submenu>
        <el-submenu index="/order">
          <template slot="title">
            <svg-icon icon-class="icon-order"></svg-icon>
            <span>点餐管理</span>
          </template>
          <el-menu-item index="/order/menu">菜单管理</el-menu-item>
          <el-menu-item index="/order/tables">桌台管理</el-menu-item>
          <el-menu-item index="/order/shop">门店管理</el-menu-item>
          <el-menu-item index="/order/orders">订单管理</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container class="con">
      <el-header class="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item, index) in crumbs" :key="index" :to="{name: item.name}" :class="{'can-click': item.name && index !== crumbs.length - 1}">{{item.value}}</el-breadcrumb-item>
        </el-breadcrumb>
        <ul class="pull-right">
          <li>用户信息</li>
          <li><router-link :to="{path: '/user/change-password'}" class="el-button el-button--text">修改密码</router-link></li>
          <li><el-button type="text" @click.stop.prevent="whiteOff">注销</el-button></li>
          <li><el-button type="text" @click.stop.prevent="singout">退出账号</el-button></li>
        </ul>
      </el-header>
      <el-main class="main">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { writeOff } from '@/api/user';
export default {
	name: 'layout',
	data() {
		return {
			crumbs: []
		};
	},
	watch: {
		$route: {
			handler: function(to, from) {
				console.log(to);
				this.defaultActive = to.path;
				this.crumbs = to.name !== 'pagenotfind' ? to.meta.crumbs : [];
			},
			immediate: true
		}
	},
	computed: {},
	created() {},
	methods: {
		singout() {
			this.$store
				.dispatch('LOGOUT')
				.then(result => {
					this.$router.push({ path: '/login' });
				})
				.catch(err => {
					console.log(err);
				});
		},
		whiteOff() {
			this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					writeOff()
						.then(result => {
							this.$message.success('账号注销成功');
							this.$store.commit('USERINFO', {});
							this.$router.push({ path: '/login' });
						})
						.catch(err => {
							console.log(err);
						});
				})
				.catch(err => console.log(err));
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap-nav {
	color: #fff;
	.logo {
		margin: 15px 0 25px 20px;
		padding: 5px 0 5px 30px;
		font-size: 20px;
		color: #ffffff;
		background: url(../assets/images/logo.png) no-repeat left center;
	}
	svg {
		margin-right: 5px;
	}
}
.header {
	color: #fff;
	.el-breadcrumb {
		float: left;
		line-height: 60px;
	}
	ul > li {
		float: left;
		color: #fff;
		padding-right: 20px;
		line-height: 60px;
	}
}
</style>
