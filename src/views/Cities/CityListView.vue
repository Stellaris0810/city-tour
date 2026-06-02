<script setup>
import { ref } from 'vue';
// 【資料層】定義北海道四大分區以及各自包含的城市與縮圖
const regions = [
  {
    id: 'dao-yang',
    name: '道央地區',
    cities: [
      { id: 'sapporo', name: '札幌市', image: 'https://www.visit-hokkaido.jp/lsc/upfile/spot/0001/0011/10011_3_l.jpg' },
      { id: 'otaru', name: '小樽市', image: 'https://www.authent.co.jp/wp/wp-content/uploads/2024/06/d6c9e417567e879111b39c43177d1575-1024x683.webp' }
    ]
  },
  {
    id: 'dao-nan',
    name: '道南地區',
    cities: [
      { id: 'hakodate', name: '函館市', image: 'https://hokkaido-labo.com/wp-content/uploads/2014/06/31.jpg' },
      { id: 'noboribetsu', name: '登別市', image: 'https://noboribetsu-spa.jp/tw/wp-content/uploads/sites/4/2021/12/about_1600x900.jpg' }
    ]
  },
  {
    id: 'dao-bei',
    name: '道北地區',
    cities: [
      { id: 'asahikawa', name: '旭川市', image: 'https://d2r4787i3zn8dn.cloudfront.net/7vfx8q982zbu022sm3d7jtkkptag' },
      { id: 'furano', name: '富良野市', image: 'https://www.visit-hokkaido.jp/lsc/upfile/spot/0001/0174/10174_1_l.jpg' }
    ]
  },
  {
    id: 'dao-dong',
    name: '道東地區',
    cities: [
      { id: 'abashiri', name: '網走市', image: 'https://www.visit-hokkaido.jp/lsc/upfile/spot/0001/0045/10045_6_l.jpg' },
      { id: 'kushiro', name: '釧路市', image: 'https://www.visit-hokkaido.jp/lsc/upfile/spot/0001/0244/10244_8_l.jpg' }
    ]
  }
];

// 【狀態管理】記錄當前使用者點選的大分區物件，預設為 null（未選擇）
const selectedRegion = ref(null);

// 【方法】點擊大分區按鈕時觸發，切換選中的分區狀態
const selectRegion = (region) => {
  selectedRegion.value = region; // 更新 ref 的值，畫面會自動重新渲染
};
</script>

<template>
  <div class="page-wrapper">
    <div class="container">
      
      <header class="header">
        <h1>北海道城市旅遊網站</h1>
        <p class="subtitle">歡迎來到北海道</p>
      </header>

      <div class="section-box">
        <h3>請選擇旅遊大分區</h3>
        <div class="region-buttons">
          <button v-for="region in regions" :key="region.id" :class="{ active: selectedRegion?.id === region.id }"  @click="selectRegion(region)">
            {{ region.name }}
          </button>
        </div>
      </div>

      <div v-if="selectedRegion" class="section-box fade-in">
        <h3>請選擇 【{{ selectedRegion.name }}】 的城市</h3>
        <div class="city-list">
          <RouterLink 
            v-for="city in selectedRegion.cities" 
            :key="city.id" 
            :to="'/cities/' + city.id" 
            class="city-item"
          >
            <div class="city-info-block">
              <img :src="city.image" :alt="city.name" class="city-thumb" />
              <span class="city-name">📍 {{ city.name }}</span>
            </div>
            <span class="arrow">探索景點 ➔</span>
          </RouterLink>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* 全螢幕滿版大背景（已修正 body 邊距後可完美貼邊） */
.page-wrapper {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 40px 20px;
  box-sizing: border-box; /* 確保內邊距 padding 不會撐大外殼寬度 */
  background-image: url(@/assets/Img/北海道背景.webp);
  background-size: cover; /* 背景圖等比例縮放至完全覆蓋容器 */
  background-position: center; /* 背景置中對齊 */
  background-attachment: fixed; /* 滾動網頁時，背景圖固定不動（視差效果） */
}

/* 統一寬度容器 */
.container { 
  max-width: 550px; 
  margin: 0 auto; /* 左右自動外邊距，達成水平置中 */
  font-family: 'Helvetica Neue', Arial, sans-serif; 
  color: #2c3e50; 
}

/* 頂部標題毛玻璃特效框 */
.header { 
  text-align: center; 
  margin-bottom: 25px; 
  background-color: rgba(255, 255, 255, 0.85); /* 半透明白底 */
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); /* 微弱陰影增加層次感 */
}
.header h1 { 
  font-size: 36px; 
  color: #2c3e50; 
  margin: 10px 0; 
}
.subtitle { 
  font-size: 18px; 
  color: #7f8c8d; 
}

/* 操作面板卡片外框 */
.section-box {
  background-color: rgba(255, 255, 255, 0.95); 
  border: 1px solid rgba(224, 224, 224, 0.7);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}
.section-box h3 { 
  margin-top: 0; 
  font-size: 16px; 
  color: #34495e; 
  border-bottom: 2px solid #ecf0f1; /* 標題下方的裝飾細線 */
  padding-bottom: 8px; 
}

/* 橫排彈性盒模型 (Flexbox) 佈局 */
.region-buttons { 
  display: flex; 
  gap: 12px; /* 按鈕與按鈕之間的間距 */
  margin-top: 15px; 
}
.region-buttons button {
  flex: 1; /* 讓四個按鈕平均分配、寬度完全相等 */
  padding: 12px; 
  border: 1px solid #bdc3c7; 
  background: #fff; 
  border-radius: 6px; 
  cursor: pointer; 
  font-size: 14px; 
  font-weight: bold; 
  color: #555;
  transition: all 0.2s ease; /* 讓顏色切換時擁有絲滑的過渡動畫 */
}
.region-buttons button:hover { 
  background: #f8f9fa; 
  color: #3498db; 
  border-color: #3498db; 
}
/* 按鈕被選中時的樣式 */
.region-buttons button.active { 
  background: #3498db; 
  color: white; 
  border-color: #3498db; 
}

/* 城市直排選單佈局 */
.city-list { 
  display: flex; 
  flex-direction: column; /* 彈性盒方向改為垂直由上至下排列 */
  gap: 12px; 
  margin-top: 15px; 
}
.city-item {
  display: flex; 
  justify-content: space-between; /* 內容左右對齊（左邊資訊、右邊箭頭） */
  align-items: center; /* 垂直置中對齊 */
  padding: 12px 16px; 
  background: #f8f9fa; 
  text-decoration: none; /* 移除超連結預設底線 */
  color: #2c3e50; 
  border-radius: 8px; 
  border: 1px solid #e2e8f0; 
  transition: all 0.2s ease;
}
.city-item:hover { 
  background: #edf2f7; 
  border-color: #cbd5e0; 
  transform: translateX(4px); /* 滑鼠懸停時，往右微微飄移 4px 的高級感特效 */
}
.city-info-block {
  display: flex;
  align-items: center;
  gap: 15px;
}
/* 城市精緻縮圖 */
.city-thumb {
  width: 60px;
  height: 60px;
  object-fit: cover; /* 關鍵：確保圖片在固定的正方形內裁剪填滿、不壓縮變形 */
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.city-name { 
  font-weight: bold; 
  font-size: 16px; 
}
.arrow { 
  font-size: 13px; 
  color: #3498db; 
  font-weight: 500; 
}

/* 漸顯動畫特效 */
.fade-in { 
  animation: fadeIn 0.3s ease-in-out; 
}
@keyframes fadeIn { 
  from { opacity: 0; transform: translateY(5px); } /* 從透明、偏下 5px 的位置開始 */
  to { opacity: 1; transform: translateY(0); } 
}
</style>