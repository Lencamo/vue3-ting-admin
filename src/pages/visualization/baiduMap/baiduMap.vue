<template>
  <div class="baiduMap">
    <div class="top-box">
      <div class="search-box">
        <el-input
          v-model="searchVal"
          style="width: 240px"
          placeholder="经纬度坐标"
          clearable
        ></el-input>
        <div style="margin-left: 12px">
          <el-button type="primary" @click="searchCoordinate">搜索</el-button>
          <el-button @click="resetCoordinate">重置</el-button>
        </div>
      </div>
      <el-link href="https://api.map.baidu.com/lbsapi/getpoint/" target="_blank" type="primary">
        百度地图拾取坐标系统
      </el-link>
    </div>
    <div id="container"></div>
  </div>
</template>

<script setup lang="ts">
const center = {
  lng: 104.150934,
  lat: 30.743252
}

const map = ref()
const point = ref()
const marker = ref()

onMounted(() => {
  initMap(center.lng, center.lat)
})

onUnmounted(() => {
  map.value = null
  point.value = null
  marker.value = null
})

// 初始化地图
const initMap = (lngVal, latVal) => {
  // @ts-ignore
  var BMapGL = window.BMapGL
  map.value = new BMapGL.Map('container')

  // 设置中心点和缩放级别
  point.value = new BMapGL.Point(lngVal, latVal)
  map.value.centerAndZoom(point.value, 15)
  // 设置点标记
  marker.value = new BMapGL.Marker(point.value)
  map.value.addOverlay(marker.value)
  // 其他设置
  map.value.setTilt(65) //设置地图的倾斜角度
  map.value.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
}

// ========= methods =========

const searchVal = ref('')

// 搜索按钮
const searchCoordinate = () => {
  if (searchVal.value) {
    const lng = searchVal.value.split(',')[0]
    const lat = searchVal.value.split(',')[1]
    initMap(lng, lat)
  }
}

// 重置按钮
const resetCoordinate = () => {
  searchVal.value = ''
  initMap(center.lng, center.lat)
}
</script>

<style lang="scss" scoped>
.baiduMap {
  background: var(--mainBoxBgColor);
  padding: 18px;

  #container {
    height: 70vh;
    width: 100%;
  }

  .top-box {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 10px;

    .search-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
