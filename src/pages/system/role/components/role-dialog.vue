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
        <el-form-item label="菜单权限">
          <el-tree
            ref="treeNodeRef"
            :props="{ label: 'name', children: 'children' }"
            :data="globalMenuList"
            node-key="id"
            show-checkbox
            @check="handleTreeNodeCheck"
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
import type { FormRules, FormInstance, ElTree } from 'element-plus'
import useMainStore from '@/stores/main/entires/main.ts'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/stores/main/system'
import { mapMenuToIds } from '@/utils/main/map-menus'

const dialogVisible = ref(false)
const dialogFormRef = ref<FormInstance>()

// Tree控件
const treeNodeRef = ref<InstanceType<typeof ElTree>>()
const roleMenusIds = ref()

// 监听节点选择
const handleTreeNodeCheck = (arg1, arg2) => {
  roleMenusIds.value = [...arg2.checkedKeys, ...arg2.halfCheckedKeys]
  // console.log(roleMenusIds.value)
}

// 菜单数据
const mainStore = useMainStore()
const { globalMenuList } = storeToRefs(mainStore)

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

    // -角色数据
    for (const key in dialogData) {
      dialogData[key] = role[key]
    }
    editRoleId.value = role.id

    // - 菜单数据
    nextTick(() => {
      const { deepestMenuIds, allMenuIds } = mapMenuToIds(role.menuList)

      roleMenusIds.value = allMenuIds // 初始化roleMenusIds值
      treeNodeRef.value!.setCheckedKeys(deepestMenuIds, false) // node节点回显
    })
  } else {
    // 新增

    // -角色数据
    for (const key in dialogData) {
      dialogData[key] = ''
    }
    editRoleId.value = null

    // - 菜单数据
    nextTick(() => {
      treeNodeRef.value!.setCheckedKeys([], false)
    })
  }
}
defineExpose({ setRoleDialogVisible })

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

  const payload = { ...dialogData, roleMenusIds: roleMenusIds.value }
  // console.log(payload)

  if (!isNewDialog.value && editRoleId.value) {
    // 编辑
    systemStore.editRoleAction(editRoleId.value, payload)
  } else {
    // 新增
    systemStore.addRoleAction(payload)
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
