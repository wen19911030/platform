<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {};
	},
	created() {}
};
</script>

<style lang="scss">
@import './assets/css/base.css';
@import './assets/css/reset.element.css';

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.login-wrapper {
	$bg: #2d3a4b;
	$dark_gray: #889aa4;
	$light_gray: #eee;
	position: fixed;
	height: 100%;
	width: 100%;
	background-color: $bg;
	.el-input {
		display: inline-block;
		height: 52px;
		width: 85%;
		input {
			background: transparent;
			border: 0px;
			-webkit-appearance: none;
			border-radius: 0px;
			padding: 12px 5px 12px 0;
			color: $light_gray;
			height: 100%;
			&:-webkit-autofill {
				box-shadow: 0 0 0px 1000px $bg inset !important;
				-webkit-text-fill-color: #fff !important;
			}
		}
	}
	.el-form-item {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		color: #454545;
	}
	.login-form {
		position: absolute;
		left: 0;
		right: 0;
		width: 520px;
		padding: 35px 35px 15px 35px;
		margin: 120px auto;
		box-sizing: border-box;
	}
	.tips {
		font-size: 14px;
		color: #fff;
		margin-bottom: 10px;
		display: flex;
		justify-content: space-between;
		a {
			color: #fff;
		}
	}
	.svg-container {
		padding: 6px 5px 6px 15px;
		color: $dark_gray;
		vertical-align: middle;
		width: 30px;
		display: inline-block;
		font-size: 20px;
	}
	.title {
		font-size: 26px;
		font-weight: 400;
		color: $light_gray;
		margin: 0px auto 40px auto;
		text-align: center;
		font-weight: bold;
	}
	.show-pwd {
		position: absolute;
		right: 10px;
		top: 7px;
		font-size: 16px;
		color: $dark_gray;
		cursor: pointer;
		user-select: none;
	}
}
</style>
