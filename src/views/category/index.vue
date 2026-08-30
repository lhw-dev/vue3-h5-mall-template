<template>
  <div class="category-page">
    <!-- 左侧分类菜单 -->
    <div class="category-left">
      <div
        v-for="item in categoryList"
        :key="item.id"
        class="category-item"
        :class="{ active: activeCategoryId === item.id }"
        @click="onSelectCategory(item.id)"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- 右侧商品 -->
    <div class="category-right">
      <div class="goods-list">
        <div
          class="goods-card"
          v-for="goods in goodsList"
          :key="goods.id"
          @click="goGoodsDetail(goods.id)"
        >
          <div class="goods-img">
            <img :src="goods.pic" alt="" />
          </div>
          <div class="goods-name">{{ goods.title }}</div>
          <div class="goods-price">¥{{ goods.price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { CategoryItem, CategoryGoodsItem } from '@/types/category'
import { getCategoryApi, getCategoryGoodsApi } from '@/api/category'
import { useRouter } from 'vue-router'
const router = useRouter()

const activeCategoryId = ref(0)
const categoryList = ref<CategoryItem[]>([])
const goodsList = ref<CategoryGoodsItem[]>([])

// 选中分类
const onSelectCategory = async (catId: number) => {
  activeCategoryId.value = catId
  const res = await getCategoryGoodsApi(catId)
  goodsList.value = res.data
}

// 跳转到商品详情
const goGoodsDetail = (goodsId: number) => {
  router.push(`/goods/${goodsId}`)
}

onMounted(async () => {
  const res = await getCategoryApi()
  console.log('分类,', res)
  categoryList.value = res.data
  if (categoryList.value.length > 0) {
    await onSelectCategory(categoryList.value[0].id)
  }
})
</script>

<style lang="scss" scoped>
.category-page {
  display: flex;
  // 减去底部tabbar高度，防止内容被遮挡
  height: calc(100vh - 50px);
  background-color: #f7f8fa;
}

.category-left {
  width: 100px;
  background: var(--color-block-background);
  overflow-y: auto;
  // 滚动平滑
  scroll-behavior: smooth;

  .category-item {
    padding: 16px 8px;
    text-align: center;
    font-size: 13px;
    color: #666;
    cursor: pointer;
    // 移动端点击反馈
    transition: background-color 0.2s;

    &.active {
      background-color: #f7f8fa;
      color: #ee0a24;
      font-weight: bold;
    }

    &:active {
      background-color: #f2f3f5;
    }
  }
}

.category-right {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.goods-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.goods-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  // 移动端按压反馈
  transition: transform 0.15s;

  &:active {
    transform: scale(0.98);
  }

  .goods-img {
    width: 100%;
    aspect-ratio: 1 / 1;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      // 防止图片未加载布局抖动
      background-color: #f5f5f5;
    }
  }

  .goods-name {
    font-size: 13px;
    padding: 6px 8px;
    line-height: 1.4;
    // 两行文本省略
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #333;
  }

  .goods-price {
    color: #ee0a24;
    font-size: 14px;
    font-weight: bold;
    padding: 0 8px 8px;
  }
}
</style>
