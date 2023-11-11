<template>
  <div class="role-dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewDialog ? '新增角色' : '编辑角色'"
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
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="dialogData.name" />
        </el-form-item>
        <el-form-item label="角色描述" prop="intro">
          <el-input
            v-model="dialogData.intro"
            type="textarea"
            maxlength="50"
            show-word-limit
            :autosize="{ minRows: 2, maxRows: 4 }"
          />
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

const dialogVisible = ref(false)
const dialogFormRef = ref<FormInstance>()

// 弹窗数据
const dialogData = reactive<any>({
  name: '',
  intro: ''
})

// 显示弹窗
const isNewDialog = ref(true)
const editRoleId = ref()

const setRoleDialogVisible = (isNew: boolean, role?: any) => {
  dialogVisible.value = true

  isNewDialog.value = isNew

  // 移除校验结果
  dialogFormRef.value?.resetFields()

  // 初始化Dialog数据
  if (!isNew && role) {
    // 编辑
    for (const key in dialogData) {
      dialogData[key] = role[key]
    }
    editRoleId.value = role.id
  } else {
    // 新增
    for (const key in dialogData) {
      dialogData[key] = ''
    }
    editRoleId.value = null
  }
}
defineExpose({ setRoleDialogVisible })

// 角色、部门数据
const mainStore = useMainStore()
const { roleList, departmentList } = storeToRefs(mainStore)

// 表单校验
const formRules = reactive<FormRules>({
  name: [
    { required: true, message: '角色名称不能为空', trigger: 'blur' },
    { min: 2, max: 12, message: '角色名长度范围应在 2 - 12 之间', trigger: 'blur' }
  ],
  intro: [{ required: true, message: '角色介绍不能为空', trigger: 'blur' }]
})

// Dialog确认按钮
const systemStore = useSystemStore()

const handlePassVerify = () => {
  dialogVisible.value = false

  if (!isNewDialog.value && editRoleId.value) {
    // 编辑
    systemStore.editRoleAction(editRoleId.value, dialogData)
  } else {
    // 新增
    systemStore.addRoleAction(dialogData)
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
.role-dialog {
  //
}
</style>
