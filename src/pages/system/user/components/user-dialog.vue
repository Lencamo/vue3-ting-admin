<template>
  <div class="user-dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewDialog ? '新增用户' : '编辑用户'"
      width="350px"
      align-center
    >
      <el-form
        :model="dialogData"
        :rules="formRules"
        ref="dialogFormRef"
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="dialogData.name" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="dialogData.realname" />
        </el-form-item>
        <el-form-item label="电话号码" prop="cellphone">
          <el-input v-model="dialogData.cellphone" />
        </el-form-item>
        <el-form-item v-if="!isNewDialog" label="用户状态">
          <el-switch
            v-model="dialogData.enable"
            inline-prompt
            :active-value="1"
            :inactive-value="0"
            active-text="开启"
            inactive-text="禁用"
          />
        </el-form-item>
        <el-form-item label="选择角色">
          <el-select v-model="dialogData.roleId" placeholder="请选择角色">
            <template v-for="role in roleList" :key="role.id">
              <el-option :label="role.name" :value="role.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门">
          <el-select v-model="dialogData.departmentId" placeholder="请选择部门">
            <template v-for="department in departmentList" :key="department.id">
              <el-option :label="department.name" :value="department.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item v-if="isNewDialog" label="密码" prop="password">
          <el-input type="password" show-password v-model="dialogData.password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmBtn">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormRules, FormInstance } from 'element-plus'
import useMainStore from '@/stores/main/entires/main.ts'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/stores/main/system'
// import type { IUserList } from '@/types/main/system'

const dialogVisible = ref(false)
const dialogFormRef = ref<FormInstance>()

// 弹窗数据
const dialogData = reactive<any>({
  name: '',
  realname: '',
  cellphone: '',
  roleId: '',
  departmentId: '',
  password: '',
  enable: ''
})

// 显示弹窗
const isNewDialog = ref(true)
const editUserId = ref()

const setUserDialogVisible = (isNew: boolean, user?: any) => {
  dialogVisible.value = true

  isNewDialog.value = isNew

  // 移除校验结果
  dialogFormRef.value?.resetFields()

  // 初始化Dialog数据
  if (!isNew && user) {
    // 编辑
    for (const key in dialogData) {
      dialogData[key] = user[key]
    }
    editUserId.value = user.id
  } else {
    // 新增
    for (const key in dialogData) {
      dialogData[key] = ''
    }
    editUserId.value = null
  }
}
defineExpose({ setUserDialogVisible })

// 角色和部门数据
const mainStore = useMainStore()
const { roleList, departmentList } = storeToRefs(mainStore)

// 表单校验
const formRules = reactive<FormRules>({
  name: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 2, max: 12, message: '用户名长度范围应在 2 - 12 之间', trigger: 'blur' }
  ],
  realname: [
    { required: true, message: '真实姓名不能为空', trigger: 'blur' },
    { min: 2, max: 12, message: '真实姓名长度范围应在 2 - 12 之间', trigger: 'blur' }
  ],
  cellphone: [
    { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      message: '密码需要由数字和英文字母组成',
      trigger: 'blur'
    },
    { min: 6, max: 12, message: '密码长度范围为：6-12', trigger: 'change' }
  ]
})

// Dialog确认按钮
const systemStore = useSystemStore()

const handlePassVerify = () => {
  dialogVisible.value = false

  if (!isNewDialog.value && editUserId.value) {
    // 编辑
    systemStore.editUserAction(editUserId.value, dialogData)
  } else {
    // 新增
    systemStore.addUserAction(dialogData)
  }
}

const handleConfirmBtn = () => {
  dialogFormRef.value?.validate((valid, fields) => {
    if (valid) {
      handlePassVerify()
    } else {
      ElMessage.error('表单校验失败.')
    }
  })
}
</script>

<style lang="scss" scoped>
.user-dialog {
  //
}
</style>
