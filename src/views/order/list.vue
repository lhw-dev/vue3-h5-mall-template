<template>
  <div class="order-list-page">
    <van-nav-bar title="我的订单" fixed placeholder left-arrow @click-left="$router.back()" />
    <van-tabs v-model:active="activeTab" sticky offset-top="46" @change="onTabChange">
      <van-tab v-for="tab in tabs" :key="tab.value" :title="tab.label" :name="tab.value">
        <div class="order-list">
          <div v-for="order in orderList" :key="order.id" class="order-card">
            <div class="order-header">
              <span class="order-no">订单号: {{ order.orderNo }}</span
              ><span class="status">{{ statusText(order.status) }}</span>
            </div>
            <div class="goods-list">
              <div v-for="g in order.goodsList" :key="g.skuId" class="goods-item">
                <img :src="g.cover" class="goods-img" />
                <div class="goods-info">
                  <div class="name">{{ g.name }}</div>
                  <div class="specs">{{ g.specs.join('，') }} x{{ g.quantity }}</div>
                </div>
                <div class="goods-price">¥{{ g.price }}</div>
              </div>
            </div>
            <div class="order-footer">
              <span
                >共{{
                  order.goodsList.reduce((sum: number, g: any) => sum + g.quantity, 0)
                }}件</span
              >
              <span class="total"
                >合计: <strong>¥{{ order.payAmount.toFixed(2) }}</strong></span
              >
            </div>
            <div class="order-actions">
              <van-button
                v-if="order.status === 'pending'"
                size="small"
                round
                type="danger"
                @click="onPay(order)"
                >去支付</van-button
              >
              <van-button
                v-if="order.status === 'pending'"
                size="small"
                round
                @click="onCancel(order)"
                >取消订单</van-button
              >
              <van-button
                v-if="order.status === 'shipped'"
                size="small"
                round
                type="primary"
                @click="onConfirmReceive(order)"
                >确认收货</van-button
              >
            </div>
          </div>
          <van-empty v-if="!orderList.length" description="暂无订单" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getOrderListApi, payOrderApi, cancelOrderApi, confirmReceiveApi } from '@/api/order'
import type { OrderItem, OrderStatus } from '@/types/order'

const route = useRoute()
const tabs = [
  { label: '全部', value: '' },
  { label: '待付款', value: 'pending' },
  { label: '待发货', value: 'paid' },
  { label: '待收货', value: 'shipped' },
  { label: '已完成', value: 'completed' },
]
const activeTab = ref((route.query.status as string) || '')
const orderList = ref<OrderItem[]>([])

const statusText = (status: OrderStatus) => {
  const map: Record<string, string> = {
    pending: '待付款',
    paid: '待发货',
    shipped: '待收货',
    received: '待评价',
    completed: '已完成',
    cancelled: '已取消',
  }
  return map[status] || status
}

const loadOrders = async () => {
  const res = await getOrderListApi({ status: activeTab.value || undefined, page: 1, pageSize: 20 })
  orderList.value = res.data.list
}

const onTabChange = () => {
  loadOrders()
}
const onPay = async (order: OrderItem) => {
  await payOrderApi({ orderId: order.id, payType: 'wechat' })
  showToast('支付成功')
  loadOrders()
}
const onCancel = async (order: OrderItem) => {
  await cancelOrderApi(order.id)
  showToast('已取消')
  loadOrders()
}
const onConfirmReceive = async (order: OrderItem) => {
  await confirmReceiveApi(order.id)
  showToast('已确认收货')
  loadOrders()
}

onMounted(loadOrders)
</script>

<style lang="scss" scoped>
.order-list-page {
  min-height: 100vh;
  background: #f7f8fa;
}
.order-list {
  padding: 12px;
}
.order-card {
  background: #fff;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 10px;
  .order-header {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
    .status {
      color: #ee0a24;
    }
  }
  .goods-list {
    .goods-item {
      display: flex;
      margin-bottom: 8px;
      .goods-img {
        width: 60px;
        height: 60px;
        border-radius: 4px;
        object-fit: cover;
        margin-right: 10px;
      }
      .goods-info {
        flex: 1;
        .name {
          font-size: 13px;
          color: #333;
        }
        .specs {
          font-size: 11px;
          color: #999;
          margin-top: 2px;
        }
      }
      .goods-price {
        font-size: 13px;
        color: #333;
      }
    }
  }
  .order-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 12px;
    color: #666;
    margin-top: 8px;
    .total {
      margin-left: 8px;
      strong {
        color: #ee0a24;
        font-size: 14px;
      }
    }
  }
  .order-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 10px;
  }
}
</style>
