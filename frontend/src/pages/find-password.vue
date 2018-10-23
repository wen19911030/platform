<template>
  <div class="wrapper login-wrapper password-wrapper">
    <el-form class="password-form" autoComplete="off" :model="passwordForm" :rules="loginRules" ref="passwordForm" label-position="left">
      <h3 class="title">找回密码</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
            <svg-icon icon-class="user" />
          </span>
        <el-input name="username" type="text" v-model="passwordForm.username" autoComplete="off" placeholder="username" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleFunc">
          确 定
        </el-button>
      </el-form-item>
      <div class="tips">
        <router-link to="/login" style="margin-right:20px;">返回登录</router-link>
        <router-link to="/register">注册新用户</router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import { findPassword } from '@/api/user';
export default {
	name: 'find-password',
	data() {
		const validateUsername = function() {};
		return {
			passwordForm: {
				username: 'admin'
			},
			loginRules: {
				username: [
					{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					},
					{
						min: 4,
						max: 12,
						message: '长度在 4 到 12 个字符',
						trigger: 'blur'
					}
				]
			},
			loading: false
		};
	},
	methods: {
		handleFunc() {
			this.loading = true;
			this.$refs.passwordForm.validate(valid => {
				console.log(valid);
				if (valid) {
					findPassword(this.passwordForm.username)
						.then(result => {
							this.loading = false;
							this.$message({
								type: 'success',
								message: result.message,
								duration: 3 * 1000
							});
							console.log(result);
						})
						.catch(err => {
							this.loading = false;
							console.log(err);
						});
				} else {
					console.log('error submit!!');
					this.loading = false;
					return false;
				}
			});
		}
	}
};
</script>

<style lang="scss">
.password-wrapper {
	.password-form {
		position: absolute;
		left: 0;
		right: 0;
		width: 520px;
		padding: 35px 35px 15px 35px;
		margin: 120px auto;
		box-sizing: border-box;
	}
}
</style>
