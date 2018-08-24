<template>
  <div class="wraper login-wraper register-wraper">
    <el-form class="register-form" autoComplete="off" :model="registerForm" :rules="registerRules" ref="registerForm" label-position="left">
      <h3 class="title">注册</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_register">
            <svg-icon icon-class="user" />
          </span>
        <el-input name="username" type="text" v-model="registerForm.username" autoComplete="off" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
            <svg-icon icon-class="password"></svg-icon>
          </span>
        <input type="password" tabindex="-1" style="position: absolute; top: -999px">
        <el-input name="password" :type="pwdType" v-model="registerForm.password" autoComplete="off" placeholder="password"></el-input>
        <span class="show-pwd" @click="showPwd"><svg-icon v-if="pwdType=='password'" icon-class="eye-open" /><svg-icon v-else icon-class="eye-close" /></span>
      </el-form-item>
      <el-form-item prop="email">
        <span class="svg-container">
            <svg-icon icon-class="email"></svg-icon>
          </span>
        <el-input name="email" type="text" @keyup.enter.native="handleRegister" v-model="registerForm.email" autoComplete="off" placeholder="email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleRegister">
          确定
        </el-button>
      </el-form-item>
      <div class="tips">
        <router-link to="/login" style="margin-right:20px;">已有密码，登录</router-link>
        <!-- <router-link to="/forgetpassword">忘记密码</router-link> -->
      </div>
    </el-form>
  </div>
</template>

<script>
import nodeRSA from 'node-rsa';
import { pubKey } from '../assets/pub.key.js';

const rsakey = new nodeRSA(pubKey);
rsakey.setOptions({ encryptionScheme: 'pkcs1' });
export default {
	name: 'register',
	data() {
		return {
			registerForm: {
				username: '',
				password: '',
				email: ''
			},
			registerRules: {
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
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					},
					{
						min: 6,
						max: 15,
						message: '长度在 8 到 15 个字符',
						trigger: 'blur'
					}
				],
				email: [
					{
						required: true,
						message: '请输入邮箱地址',
						trigger: 'blur'
					}
				]
			},
			pwdType: 'password',

			loading: false
		};
	},
	methods: {
		showPwd() {
			if (this.pwdType === 'text') {
				this.pwdType = 'password';
			} else {
				this.pwdType = 'text';
			}
		},
		handleRegister() {
			this.loading = true;
			this.$refs.registerForm.validate(valid => {
				if (valid) {
					this.registerForm.userpwd = rsakey.encrypt(this.registerForm.password, 'base64');
					this.$store
						.dispatch('REGISTER', this.registerForm)
						.then(result => {
							this.loading = false;
							this.$message({
								type: 'success',
								message: '注册成功'
							});
						})
						.catch(err => {
							console.log(err);
							this.loading = false;
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
.register-wraper {
	.register-form {
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
