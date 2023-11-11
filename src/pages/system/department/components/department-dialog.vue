<template>
  <div class="department-dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewDialog ? '新增部门' : '编辑部门'"
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
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="dialogData.name" />
        </el-form-item>
        <el-form-item label="部门领导" prop="leader">
          <el-input v-model="dialogData.leader" />
        </el-form-item>
        <el-form-item v-if="!isNewDialog" label="部门状态">
          <el-switch
            v-model="dialogData.enable"
            inline-prompt
            :active-value="1"
            :inactive-value="0"
            active-text="开启"
            inactive-text="禁用"
          />
        </el-form-item>
        <el-form-item label="上级部门">
          <el-tree-select
            placeholder="请选择部门"
            v-model="dialogData.parentId"
            :data="globalDepartmentList"
            :props="{ children: 'children', label: 'name', value: 'id' }"
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
  leader: '',
  parentId: '',
  enable: ''
})

// 显示弹窗
const isNewDialog = ref(true)
const editDepartmentId = ref()

const setDepartmentDialogVisible = (isNew: boolean, department?: any) => {
  dialogVisible.value = true

  isNewDialog.value = isNew

  // 移除校验结果
  dialogFormRef.value?.resetFields()

  // 初始化Dialog数据
  if (!isNew && department) {
    // 编辑
    for (const key in dialogData) {
      dialogData[key] = department[key]
    }
    editDepartmentId.value = department.id
  } else {
    // 新增
    for (const key in dialogData) {
      dialogData[key] = ''
    }
    editDepartmentId.value = null
  }
}
defineExpose({ setDepartmentDialogVisible })

// 角色和部门数据
const mainStore = useMainStore()
const { globalRoleList, globalDepartmentList } = storeToRefs(mainStore)

// 表单校验
const formRules = reactive<FormRules>({
  name: [
    { required: true, message: '部门名称不能为空', trigger: 'blur' },
    { min: 2, max: 12, message: '部门名称长度范围应在 2 - 12 之间', trigger: 'blur' }
  ],
  leader: [
    { required: true, message: '部门领导不能为空', trigger: 'blur' },
    { min: 2, max: 12, message: '领导姓名长度范围应在 2 - 12 之间', trigger: 'blur' }
  ]
})

// Dialog确认按钮
const systemStore = useSystemStore()

const handlePassVerify = () => {
  dialogVisible.value = false

  if (!isNewDialog.value && editDepartmentId.value) {
    // 编辑
    systemStore.editDepartmentAction(editDepartmentId.value, dialogData)
  } else {
    // 新增
    systemStore.addDepartmentAction(dialogData)
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
.department-dialog {
  //
}
</style>
