<template>
  <div class="address-page">
    <van-nav-bar title="收货地址" fixed placeholder left-arrow @click-left="$router.back()" />

    <div v-if="addressList.length" class="address-list">
      <van-address-list
        v-model="chosenAddressId"
        :list="formattedList"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
    </div>

    <van-empty v-else description="暂无收货地址" />

    <!-- 编辑弹窗 -->
    <van-popup v-model:show="showEdit" position="bottom" round :style="{ height: '80%' }">
      <van-address-edit
        :area-list="areaList"
        :address-info="editingAddress"
        :show-delete="!!editingAddress.id"
        show-set-default
        :area-columns-placeholder="['请选择省', '请选择市', '请选择区']"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { areaList } from '@vant/area-data'
import { getAddressListApi, saveAddressApi, deleteAddressApi } from '@/api/user'
import type { AddressItem } from '@/types/user'

const props = defineProps<{
  select?: boolean
}>()

const emit = defineEmits<{
  select: [address: AddressItem]
}>()

const addressList = ref<AddressItem[]>([])
const chosenAddressId = ref('')
const showEdit = ref(false)
const editingAddress = ref<any>({})

const formattedList = computed(() =>
  addressList.value.map(a => ({
    id: String(a.id),
    name: a.name,
    tel: a.phone,
    address: `${a.province}${a.city}${a.district}${a.detail}`,
    isDefault: a.isDefault,
  }))
)

const loadList = async () => {
  const res = await getAddressListApi()
  addressList.value = res.data.list
  const defaultAddr = addressList.value.find(a => a.isDefault)
  if (defaultAddr) chosenAddressId.value = String(defaultAddr.id)
}

const onAdd = () => {
  editingAddress.value = {}
  showEdit.value = true
}

const onEdit = (item: any) => {
  const addr = addressList.value.find(a => String(a.id) === item.id)
  if (addr) {
    editingAddress.value = {
      id: addr.id,
      name: addr.name,
      tel: addr.phone,
      province: addr.province,
      city: addr.city,
      county: addr.district,
      addressDetail: addr.detail,
      isDefault: addr.isDefault,
    }
    showEdit.value = true
  }
}

const onSave = async (content: any) => {
  await saveAddressApi({
    id: editingAddress.value.id,
    name: content.name,
    phone: content.tel,
    province: content.province,
    city: content.city,
    district: content.county,
    detail: content.addressDetail,
    isDefault: content.isDefault,
  })
  showToast('保存成功')
  showEdit.value = false
  await loadList()
}

const onDelete = async () => {
  if (editingAddress.value.id) {
    await deleteAddressApi(editingAddress.value.id)
    showToast('删除成功')
    showEdit.value = false
    await loadList()
  }
}

const onSelect = (item: any) => {
  const addr = addressList.value.find(a => String(a.id) === item.id)
  if (addr) emit('select', addr)

  if (addr && props.select) {
    emit('select', addr)
    // 如果是选择模式，返回上一页
    history.back()
  }
}

onMounted(loadList)
</script>

<style lang="scss" scoped>
.address-page {
  min-height: 100vh;
  background: #f7f8fa;
  padding-bottom: 80px;
}
</style>
