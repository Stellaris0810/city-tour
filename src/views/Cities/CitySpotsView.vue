<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 【對照表】用於將網址的英文代碼(如 sapporo) 動態映射為網頁畫面的中文大標題
const cityNamesMap = {
  sapporo: '札幌市', otaru: '小樽市', hakodate: '函館市', noboribetsu: '登別市',
  asahikawa: '旭川市', furano: '富良野市', abashiri: '網走市', kushiro: '釧路市'
};

// 【主要資料庫】包含所有城市的旅遊景點、分類、圖片及描述
const spots = [
  // ==================== 道央地區 ====================
  { id: 1, city: 'sapporo', name: '札幌湯咖哩 Suage+', type: 'food', image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAE6VCxM7fXjr7YsZ-dTZow1SVOOGG_BL6qCVl-L6TYZ0emXLZe0qwKAPg1aDN1-YZm5_J9rgfEZtEKBb5oGcZTfV-ZsmbglUsbuBmSAciu-yCDv1MvOU1_obwyakg-1PcB7lEISlNqLLuhP=s1360-w1360-h1020-rw', description: '北海道必吃的代表性美食！濃郁辛香的湯底搭配外皮酥脆的知床雞肉與在地鮮甜蔬菜。' },
  { id: 2, city: 'sapporo', name: '大通公園', type: 'spot', image: 'https://www.visit-hokkaido.jp/lsc/upfile/spot/0001/0004/10004_10_l.jpg', description: '橫跨札幌市中心的巨大綠地公園，是市民休憩的綠洲，也是每年冬季舉辦享譽國際的「札幌雪祭」主會場。' },
  { id: 3, city: 'sapporo', name: '北海道神宮', type: 'culture', image: 'https://image.cdn-eztravel.com.tw/EMsnUiSeuLF8ye6Tl8lZcdqrLm-ymkgYLiit8zSGNjY/g:ce/aHR0cHM6Ly92YWNhdGlvbi5jZG4tZXp0cmF2ZWwuY29tLnR3L2ltZy9WRFIvSlBfMTQ0ODY2MTI2OS5qcGc.jpg', description: '北海道總鎮守，環境清幽且古木參天。這裡供奉著開拓北海道的神明，是體驗日本傳統神道教文化的聖地。' },
  { id: 4, city: 'otaru', name: '小樽洋菓子舖 LeTAO', type: 'food', image: 'https://www.visit-hokkaido.jp/lsc/upfile/spot/0001/0018/10018_1_l.jpg', description: '紅遍海內外的甜點名店，其招牌「雙層乳酪蛋糕」口感綿密如雪，入口即化，是小樽不可錯過的美食。' },
  { id: 5, city: 'otaru', name: '小樽運河', type: 'spot', image: 'https://static.gltjp.com/glt/data/article/21000/20422/20230918_131515_6807f616_w1920.webp', description: '沿岸由復古的紅磚倉庫群環繞，黃昏時分瓦斯燈點亮，倒映在運河水面上，散發著極具異國情調的浪漫氛圍。' },
  { id: 15, city: 'otaru', name: '日本銀行舊小樽支店金融資料館', type: 'culture', image: 'https://static.gltjp.com/glt/data/article/21000/20422/20230918_132450_6ca85fa5_w1920.webp', description: '資料館位於一座歷史悠久的建築內，這裡曾經是舊日本銀行的小樽分店。該建築於1912年建成，由設計東京車站紅磚大樓的建築大師辰野金吾和徒弟們聯手打造。這座文藝復興風格的優雅建築至今仍保留著當年的氛圍，現已被指定為小樽市文化財產。' },

  // ==================== 道南地區 ====================
  { id: 6, city: 'hakodate', name: '函館山夜景', type: 'spot', image: 'https://hokkaido-labo.com/wp-content/uploads/2014/06/31.jpg', description: '榮獲米其林三星評價的世界三大夜景之一！特殊的雙弧線對稱地形夾著萬家燈火，宛如散落在大海中的璀璨珠寶。' },
  { id: 7, city: 'hakodate', name: '五稜郭公園', type: 'culture', image: 'https://img.ezfly.com/ims/I000/061/922.jpg', description: '日本罕見的星形西洋式城郭，曾是箱館戰爭的古戰場。登上展望台可以俯瞰完美的星形地景。' },
  { id: 16, city: 'noboribetsu', name: '蕎麥麵店 福庵', type: 'food', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/cd/81/75/sobadokorofukuan.jpg?w=1800&h=1000&s=1', description: '老字號手打蕎麥麵店「蕎麥麵店 福庵」位於登別溫泉街的極樂通，最受歡迎的料理為「蝦天婦羅蓋飯套餐」（えび天丼セット），套餐內容有奢侈使用4隻大隻炸蝦天婦羅的天婦羅蓋飯，以及可選擇溫或冷的蕎麥麵。要是吃太多地獄谷的香辣料理，不妨改到日式座席風格的餐廳，品嚐極品「炸蝦天婦羅蓋飯」和「蕎麥麵」吧。' },
  { id: 8, city: 'noboribetsu', name: '登別地獄谷', type: 'spot', image: 'https://www.visit-hokkaido.jp/lsc/upfile/spot/0001/0157/10157_4_l.jpg', description: '火山爆發後形成的奇特谷地，寸草不生、煙霧繚繞，湧出大量的溫泉，是著名溫泉鄉登別的源頭。' },
  { id: 17, city: 'noboribetsu', name: '登別伊達時代村', type: 'culture', image: 'https://res.klook.com/image/upload/w_750,h_469,c_fill,q_85/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/axtkmoogkvhl5oytnpsb.webp', description: '「登別伊達時代村」是一座重現江戶時代街景的主題樂園。園內設有多種體驗設施，如可挑戰手裏劍與弓箭術的「體驗道場」、可親手為木芥子上色，並作為紀念品帶回家的「江戶屋」，以及重現傳統廟會氣氛的「遊戲館」等。此外，還有能欣賞忍者秀與武士秀的忍者屋敷和劇場，觀看精彩刺激的表演。還可租借和服或忍者服裝，在園內悠閒散策，感受時光倒流般的體驗。' },

  // ==================== 道北地區 ====================
  { id: 18, city: 'asahikawa', name: '天金拉麵4條店', type: 'food', image: 'https://tw.wamazing.com/media/wp-content/uploads/sites/4/2019/09/asahikawa-gourmet_insta2.jpg.webp', description: '在美味拉麵店激戰區旭川，「天金拉麵」（らーめんや天金）長年以來一直備受顧客喜愛，至今已超過60年。濃郁的湯頭以豬骨為基底，直到最後一滴都保留美味，因此深受好評。與自豪的湯頭相當對味的中粗捲麵，能夠充分吸附湯汁，配料則包括簡單而道地的叉燒、香氣明顯的青蔥、口感令人上癮的筍乾等。為了在冬季嚴寒的旭川也能讓身體由內而外感到溫暖，並會加入豬油形成油膜，避免湯的熱度散失。如果是第一次嘗試的人，則推薦「醬油拉麵」。' },
  { id: 9, city: 'asahikawa', name: '旭山動物園', type: 'spot', image: 'https://www.visit-hokkaido.jp/lsc/upfile/spot/0001/0043/10043_8_l.jpg', description: '全日本最受歡迎的動物園之一，以「行動展示」聞名，遊客可以極近距離觀察北極熊游泳與企鵝雪中散步。' },
  { id: 10, city: 'furano', name: '富田農場', type: 'spot', image: 'https://www.visit-hokkaido.jp/lsc/upfile/spot/0001/0174/10174_1_l.jpg', description: '北海道最著名的薰衣草觀光農場。每到夏季，滿山遍野的紫色薰衣草與彩虹花田交織，形成壯麗的彩色地毯。' },
  { id: 19, city: 'furano', name: '深山峠藝術公園', type: 'culture', image: 'https://static.gltjp.com/glt/data/directory/15000/14401/20230506_002620_4a6d7d96_w1920.webp', description: '深山峠藝術公園座落在上富良野和美瑛町交界處的國道上，是一座充滿遊趣的複合設施。在主要設施的「錯視藝術美術館」裡，看得到像是要從平面一躍而出的作品，以及隨著角度改變模樣的作品等匯集了眾多神奇的錯視藝術之作。不只是看，還能與可供觸摸的作品一起拍照，是一個玩法自由多元的體驗型美術館。' },

  // ==================== 道東地區 ====================
  { id: 13, city: 'kushiro', name: '和商市場（勝手丼）', type: 'food', image: 'https://mimigo.tw/wp-content/uploads/20190706131151_51.jpg', description: '釧路著名的海鮮市場。遊客可以先買一碗白飯，然後拿著碗到各個攤位挑選自己想吃的生魚片、魚卵、海膽，拼湊出專屬的豪華海鮮丼。' },
  { id: 11, city: 'abashiri', name: '網走流冰觀光破冰船', type: 'spot', image: 'https://www.visit-hokkaido.jp/lsc/upfile/spot/0001/0045/10045_10_l.jpg', description: '冬季限定的超震撼體驗！搭乘大型破冰船衝破鄂霍次克海的厚重流冰，還有機會看見流冰天使等極地生物。' },
  { id: 14, city: 'kushiro', name: '釧路濕地展望台', type: 'spot', image: 'https://www.visit-hokkaido.jp/lsc/upfile/spot/0001/0181/10181_1_l.jpg', description: '日本最大的濕地，棲息著珍貴的丹頂鶴。從展望台望出去，能將無邊無際的原始大自然與蜿蜒的釧路川盡收眼底。' },
  { id: 12, city: 'abashiri', name: '博物館網走監獄', type: 'culture', image: 'https://www.visit-hokkaido.jp/lsc/upfile/spot/0001/0046/10046_8_l.jpg', description: '日本明治時代真實使用過的古老監獄改建而成，保存了當年的木造牢房，展示著北海道開拓時期與囚犯的沉重歷史。' }
];

// 【路由工具】route 用於「讀取」當前網址狀態；router 用於「控制」網址進行跳轉
const route = useRoute();
const router = useRouter();

// 【計算屬性】動態取得當前路由對應的城市中文名稱。如果對照表找不到，就降級顯示英文代碼
const currentCityName = computed(() => cityNamesMap[route.params.city] || route.params.city);

// 【核心過濾邏輯】根據網址動態計算出該顯示哪些景點卡片
const filteredSpots = computed(() => {
  // 第一步：先過濾出屬於當前城市的景點（例如：只拿 city === 'sapporo' 的資料）
  let result = spots.filter(spot => spot.city === route.params.city);
  
  // 第二步：如果網址後面有 type 分類參數（如 ?type=food），就再過濾一次分類
  if (route.query.type) {
    result = result.filter(spot => spot.type === route.query.type);
  }
  return result;
});

// 【方法】當點擊美食、景點、文化等標籤時，動態改寫瀏覽器網址的 Query 參數
const changeFilter = (type) => {
  router.push({ 
    path: `/cities/${route.params.city}`, 
    // 如果有帶分類，網址就加上 ?type=xxx；如果是點「全部」，則給空物件移除參數
    query: type ? { type: type } : {} 
  });
};
</script>

<template>
  <div class="page-wrapper">
    <div class="container">
      
      <RouterLink to="/cities" class="back-link">⬅ 重新選擇區域 / 城市</RouterLink>

      <h2 class="city-title">📍 {{ currentCityName }} · 景點精選</h2>

      <div class="filter-tabs">
        <button :class="{ active: !route.query.type }" @click="changeFilter('')">全部</button>
        <button :class="{ active: route.query.type === 'food' }" @click="changeFilter('food')">美食</button>
        <button :class="{ active: route.query.type === 'spot' }" @click="changeFilter('spot')">景點</button>
        <button :class="{ active: route.query.type === 'culture' }" @click="changeFilter('culture')">文化</button>
      </div>

      <div class="spots-list">
        <div v-for="spot in filteredSpots" :key="spot.id" class="spot-card fade-in">
          
          <div class="card-image-box">
            <img :src="spot.image" :alt="spot.name" class="spot-card-img" />
          </div>

          <div class="card-content">
            <div class="card-header">
              <h3>{{ spot.name }}</h3>
              <span class="type-badge" :class="spot.type">{{ spot.type.toUpperCase() }}</span>
            </div>
            
            <p class="spot-short-desc">{{ spot.description }}</p>
            
            <RouterLink 
              :to="{ 
                path: `/cities/${route.params.city}/spots/${spot.id}`, 
                query: { fromType: route.query.type } 
              }" 
              class="detail-btn"
            >
              查看詳細介紹 ➔
            </RouterLink>
          </div>

        </div>

        <div v-if="filteredSpots.length === 0" class="no-data">
          💨 抱歉，該城市目前沒有這個分類的資料！
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* 頁面大背景（第二頁專屬背景圖） */
.page-wrapper {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 40px 20px;
  box-sizing: border-box;
  background-image: url(@/assets/Img/北海道-2.jpg);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

/* 內容主要置中容器（寬度與第一頁完全一致為 550px） */
.container { 
  max-width: 550px; 
  margin: 0 auto; 
  font-family: 'Helvetica Neue', Arial, sans-serif; 
  color: #2c3e50; 
}

/* 返回連結：加上立體陰影避免被亮色風景背景圖吃掉文字 */
.back-link { 
  color: #fff; 
  text-shadow: 0 2px 4px rgba(0,0,0,0.5); 
  text-decoration: none; 
  font-size: 14px; 
  display: inline-block; 
  margin-bottom: 15px; 
  font-weight: bold;
  transition: opacity 0.2s;
}
.back-link:hover {
  opacity: 0.8;
}

.city-title { 
  margin: 0 0 20px 0; 
  color: #ffffff; 
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
  font-size: 26px; 
}

/* 篩選標籤彈性盒佈局 */
.filter-tabs { 
  display: flex; 
  gap: 10px; 
  margin-bottom: 25px; 
}
.filter-tabs button { 
  flex: 1; 
  padding: 10px; 
  border: 1px solid rgba(255,255,255,0.3); 
  background-color: rgba(255, 255, 255, 0.85); 
  color: #2c3e50;
  border-radius: 6px; 
  cursor: pointer; 
  font-size: 14px; 
  font-weight: bold;
  transition: all 0.2s ease; 
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}
.filter-tabs button:hover {
  background-color: #ffffff;
  color: #3498db;
}
.filter-tabs button.active { 
  background-color: #3498db; 
  color: #fff; 
  border-color: #3498db; 
}

/* 景點直排卡片清單 */
.spots-list { 
  display: flex; 
  flex-direction: column; 
  gap: 20px; 
}
.spot-card { 
  border: 1px solid rgba(224, 224, 224, 0.7); 
  border-radius: 12px; 
  overflow: hidden; /* 關鍵：內部圖片放大的時候，不會超出卡片的圓角外框 */
  background-color: rgba(255, 255, 255, 0.95); /* 透光微白質感卡片 */
  box-shadow: 0 4px 20px rgba(0,0,0,0.06); 
  transition: transform 0.2s ease;
}
/* 滑鼠移入卡片時，整張卡片往上微微飄浮 3px */
.spot-card:hover {
  transform: translateY(-3px); 
}

/* 圖片限制外框與特效 */
.card-image-box {
  width: 100%;
  height: 180px;
  overflow: hidden;
  background-color: #eaedf1;
}
.spot-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  transition: transform 0.4s ease; /* 圖片變大時的過渡時間 */
}
/* 當整張卡片被 hover 時，內部的景點大圖優雅地放大 1.05 倍 */
.spot-card:hover .spot-card-img {
  transform: scale(1.05); 
}

.card-content {
  padding: 20px;
}
.card-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 10px;
}
.card-header h3 { 
  margin: 0; 
  font-size: 18px; 
  color: #2c3e50;
}

.spot-short-desc {
  margin: 0 0 15px 0;
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}

/* 各種類別標籤的精緻粉嫩配色 */
.type-badge { 
  font-size: 11px; 
  padding: 3px 8px; 
  border-radius: 4px; 
  font-weight: bold; 
}
.type-badge.food { background-color: #fef0f0; color: #f56c6c; } /* 美食紅 */
.type-badge.spot { background-color: #f0f9eb; color: #67c23a; } /* 景點綠 */
.type-badge.culture { background-color: #fdf6ec; color: #e6a23c; } /* 文化橘 */

.detail-btn { 
  display: block; 
  text-align: right; 
  color: #e67e22; 
  text-decoration: none; 
  font-size: 14px; 
  font-weight: bold;
  transition: color 0.2s;
}
.detail-btn:hover {
  color: #d35400;
}

.no-data { 
  text-align: center; 
  padding: 40px; 
  color: #606266; 
  background-color: rgba(255, 255, 255, 0.9); 
  border-radius: 12px; 
  font-weight: bold;
}

.fade-in { animation: fadeIn 0.3s ease-in-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
</style>