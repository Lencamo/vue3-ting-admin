<template>
  <div class="user-dialog">
    <el-dialog v-model="dialogVisible" title="用户信息" width="350px" align-center>
      <el-form :model="dialogData" :rules="formRules" label-position="right" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="dialogData.name" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="dialogData.realname" />
        </el-form-item>
        <el-form-item label="电话号码" prop="cellphone">
          <el-input v-model="dialogData.cellphone" />
        </el-form-item>
        <el-form-item label="选择角色" prop="pass">
          <el-select v-model="dialogData.roleId" placeholder="请选择角色">
            <template v-for="role in roleList" :key="role.id">
              <el-option :label="role.name" :value="role.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="pass">
          <el-select v-model="dialogData.departmentId" placeholder="请选择角色">
            <template v-for="role in departmentList" :key="role.id">
              <el-option :label="role.name" :value="role.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" show-password v-model="dialogData.pwd" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormRules } from 'element-plus'
import useMainStore from '@/stores/main/entires/main.ts'
import { storeToRefs } from 'pinia'

const dialogVisible = ref(true)

// 弹窗数据
const dialogData = reactive({
  name: '',
  realname: '',
  cellphone: '',
  roleId: '',
  departmentId: '',
  pwd: ''
})

// 角色和部门数据
const mainStore = useMainStore()
const { roleList, departmentList } = storeToRefs(mainStore)

// 表单校验
const formRules = reactive<FormRules>({
  name: [{ min: 2, max: 12, message: '用户名长度范围应在 2 - 12 之间', trigger: 'blur' }],
  realname: [{ min: 2, max: 12, message: '真实姓名长度范围应在 2 - 12 之间', trigger: 'blur' }],
  cellphone: [
    { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
  ],
  pwd: [
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      message: '密码需要由数字和英文字母组成',
      trigger: 'blur'
    },
    { min: 6, max: 12, message: '密码长度范围为：6-12', trigger: 'change' }
  ]
})
</script>

<style lang="scss" scoped>
.user-dialog {
  //
}
</style>
