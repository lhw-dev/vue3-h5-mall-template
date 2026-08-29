<template>
  <div class="search-page">
    <form action="/" class="search-bar">
      <van-search
        v-model="keyword"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
      />
    </form>

    <!-- 搜索历史 -->
    <div v-if="!keyword && appStore.searchHistory.length" class="search-section">
      <div class="section-header">
        <span class="title">搜索历史</span>
        <van-icon name="delete-o" @click="appStore.clearSearchHistory()" />
      </div>
      <div class="tag-list">
        <van-tag
          v-for="word in appStore.searchHistory"
          :key="word"
          round
          class="history-tag"
          @click="((keyword = word), onSearch())"
        >
          {{ word }}
        </van-tag>
      </div>
    </div>

    <!-- 热门搜索 -->
    <div v-if="!keyword" class="search-section">
      <div class="section-header">
        <span class="title">热门搜索</span>
      </div>
      <div class="tag-list">
        <van-tag
          v-for="word in hotWords"
          :key="word"
          round
          type="danger"
          class="hot-tag"
          @click="((keyword = word), onSearch())"
        >
          {{ word }}
        </van-tag>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div v-if="searched" class="result-list">
      <van-card
        v-for="item in resultList"
        :key="item.id"
        :title="item.name"
        :desc="`¥${item.price}`"
        :thumb="item.cover"
        @click="$router.push(`/goods/${item.id}`)"
      />
      <van-empty v-if="!resultList.length" description="暂无搜索结果" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/store/app.store'
import { getGoodsListApi } from '@/api/goods'
import type { GoodsItem } from '@/types/goods'

const appStore = useAppStore()

const keyword = ref('')
const searched = ref(false)
const resultList = ref<GoodsItem[]>([])
const hotWords = ['T恤', '手机', '零食', '运动鞋', '护肤']

const onSearch = async () => {
  if (!keyword.value.trim()) return
  appStore.addSearchHistory(keyword.value)
  searched.value = true
  const res = await getGoodsListApi({ page: 1, pageSize: 20 })
  // 前端简单过滤
  resultList.value = res.data.list.filter(item => item.name.includes(keyword.value))
}
</script>

<style lang="scss" scoped>
.search-page {
  min-height: 100vh;
  background: #f7f8fa;
}

.search-section {
  padding: 12px 16px;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .title {
      font-size: 14px;
      font-weight: bold;
      color: #333;
    }
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .history-tag,
    .hot-tag {
      padding: 4px 10px;
      font-size: 12px;
    }
  }
}

.result-list {
  padding: 0 12px;
}
</style>
