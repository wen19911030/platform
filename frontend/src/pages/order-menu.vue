<template>
  <div class="wrapper wrapper-order-menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <el-form class="password-form" status-icon auto-complete="off" :model="passwordForm" :rules="passwordRules" ref="passwordForm" label-position="right" label-width="100px">
        <el-form-item label="旧密码" prop="pass">
          <el-input type="password" v-model="passwordForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input type="password" v-model="passwordForm.newPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="passwordForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleFunc('passwordForm')">
            确 定
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>

<script>
export default {
	name: 'order-menu',
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
</style>
