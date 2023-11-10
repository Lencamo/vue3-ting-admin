<template>
  <div class="menu-dialog">
    <el-dialog v-model="dialogVisible" :title="'编辑菜单'" width="350px" align-center>
      <el-form
        :model="dialogData"
        :rules="formRules"
        ref="dialogFormRef"
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="dialogData.name" />
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-select v-model="dialogData.icon" placeholder="请选择菜单图标">
            <template v-for="item in elementIcons" :key="item">
              <el-option :label="item" :value="item">
                <el-icon size="16" color="#323435">
                  <component :is="item"></component>
                </el-icon>
                <span>&emsp;{{ item }}</span>
              </el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="相对位置">
          <el-input-number v-model="dialogData.sort" :min="1" :max="10" />
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
import useSystemStore from '@/stores/main/system'
import { elementIcons } from '@/global/element-icons-list'

const dialogVisible = ref(false)
const dialogFormRef = ref<FormInstance>()

// 弹窗数据
const dialogData = reactive<any>({
  name: '',
  icon: '',
  sort: ''
})

// 显示弹窗
const editMenuId = ref()

const setMenuDialogVisible = (menu: any) => {
  dialogVisible.value = true

  // 移除校验结果
  dialogFormRef.value?.resetFields()

  // 初始化Dialog数据
  for (const key in dialogData) {
    dialogData[key] = menu[key]
  }
  editMenuId.value = menu.id
}
defineExpose({ setMenuDialogVisible })

// 表单校验
const formRules = reactive<FormRules>({
  name: [
    { required: true, message: '菜单名称不能为空', trigger: 'blur' },
    { min: 2, max: 12, message: '菜单名称长度范围应在 2 - 6 之间', trigger: 'blur' }
  ]
})

// Dialog确认按钮
const systemStore = useSystemStore()

const handlePassVerify = () => {
  dialogVisible.value = false

  // 编辑
  // console.log(dialogData)
  systemStore.editMenuAction(editMenuId.value, dialogData)
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
.el-icon {
  vertical-align: middle;
}
.menu-dialog {
}
</style>
