<template>
  <div class="user-page">
    <!-- 用户信息卡片 -->
    <div class="user-header">
      <img
        :src="userStore.userInfo.avatar || 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'"
        class="avatar"
      />
      <div class="user-meta">
        <div class="nickname">{{ userStore.isLogin ? userStore.userInfo.nickname : '未登录' }}</div>
        <div class="phone" v-if="userStore.isLogin">{{ userStore.userInfo.phone }}</div>
        <van-button v-else size="small" type="danger" round @click="$router.push('/login')"
          >去登录</van-button
        >
      </div>
    </div>

    <!-- 订单入口 -->
    <div class="order-card">
      <div class="card-title" @click="$router.push('/order/list')">
        <span class="label">我的订单</span>
        <span class="arrow">查看全部 ></span>
      </div>
      <van-grid :column-num="4" :border="false">
        <van-grid-item
          icon="balance-pay"
          text="待付款"
          :badge="orderCount.pending || ''"
          @click="goOrderList('pending')"
        />
        <van-grid-item
          icon="send-gift-o"
          text="待发货"
          :badge="orderCount.paid || ''"
          @click="goOrderList('paid')"
        />
        <van-grid-item
          icon="logistics"
          text="待收货"
          :badge="orderCount.shipped || ''"
          @click="goOrderList('shipped')"
        />
        <van-grid-item icon="comment-o" text="已完成" @click="goOrderList('completed')" />
      </van-grid>
    </div>

    <!-- 功能菜单 -->
    <van-cell-group class="menu-group">
      <van-cell title="收货地址" icon="location-o" is-link to="/address" />
      <van-cell title="优惠券" icon="coupon-o" is-link to="/coupon" />
      <van-cell title="联系客服" icon="service-o" is-link @click="showToast('等你来开发!')" />
      <van-cell v-if="userStore.isLogin" title="退出登录" icon="close" is-link @click="onLogout" />
      <van-cell :title="$t('mine.setting')" icon="setting-o" is-link to="/settings" />
    </van-cell-group>

    <div class="page-footer-tip">
      <div class="tip-title">Vue3-H5-Mall-Template</div>
      <div class="tip-desc">Vite6 + Vue3.5 + TS5.7 + Vant4 + Pinia + Ofetch</div>
      <div class="tip-version">MIT License · Hellen❧</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { showToast, showConfirmDialog } from 'vant'
import { useUserStore } from '@/store/user.store'
import { getOrderStatusCountApi } from '@/api/order'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const orderCount = ref({ pending: 0, paid: 0, shipped: 0, received: 0 })

const goOrderList = (status: string) => {
  router.push({ path: '/order/list', query: { status } })
}

const onLogout = () => {
  showConfirmDialog({ title: '确认退出登录？' })
    .then(() => {
      userStore.logoutAction()
      showToast('已退出登录')
      router.replace('/')
    })
    .catch(() => {})
}

onMounted(async () => {
  if (userStore.isLogin) {
    try {
      const res = await getOrderStatusCountApi()
      orderCount.value = res.data
    } catch {}
  }
})
</script>

<style lang="scss" scoped>
.user-page {
  min-height: calc(100vh - 50px);
}

.user-header {
  background: linear-gradient(135deg, #ff5050, #ff7849);
  padding: 40px 20px 30px;
  display: flex;
  align-items: center;
  color: #fff;

  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.4);
    margin-right: 16px;
  }

  .user-meta {
    .nickname {
      font-size: 18px;
      font-weight: bold;
    }
    .phone {
      font-size: 13px;
      opacity: 0.9;
      margin-top: 4px;
    }
  }
}

.order-card {
  background: var(--color-block-background);
  margin: 12px;
  border-radius: 10px;
  padding: 12px;

  .card-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
    .arrow {
      font-size: 12px;
      color: #999;
      font-weight: normal;
    }
  }
}

.menu-group {
  margin: 12px;
  border-radius: 10px;
  overflow: hidden;
}

.page-footer-tip {
  padding: 16px;
  text-align: center;
  .tip-title {
    font-size: 14px;
    font-weight: 500;
    color: var(--van-text-color);
  }
  .tip-desc {
    font-size: 12px;
    color: var(--van-text-color-2);
    margin-top: 4px;
  }
  .tip-version {
    font-size: 11px;
    color: var(--van-text-color-3);
    margin-top: 4px;
  }
}
</style>
