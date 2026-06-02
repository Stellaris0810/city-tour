<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// 【對照表】用於將景點所屬城市的英文代碼，轉換為中文名稱呈現在詳細卡片中
const cityNamesMap = {
  sapporo: '札幌市', otaru: '小樽市', hakodate: '函館市', noboribetsu: '登別市',
  asahikawa: '旭川市', furano: '富良野市', abashiri: '網走市', kushiro: '釧路市'
};

// 【主要資料庫
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

const route = useRoute();

// 【核心尋找邏輯】拿網址列最後面的景點 id（如 :id 參數為 1），去 spots 陣列中精確搜尋對應物件
const currentSpot = computed(() => {
  // 網址解析出來的 id 預設是字串型態，資料庫內是數字，故使用 '==' 進行寬鬆型態自動轉換比對
  return spots.find(spot => spot.id == route.params.id);
});
</script>

<template>
  <div class="page-wrapper">
    <div class="container">
      
      <div v-if="currentSpot" class="detail-card fade-in">
        
        <div class="card-header">
          <h2>{{ currentSpot.name }}</h2>
          <span class="type-badge" :class="currentSpot.type">{{ currentSpot.type.toUpperCase() }}</span>
        </div>

        <div class="detail-image-box">
          <img :src="currentSpot.image" :alt="currentSpot.name" class="detail-main-img" />
        </div>

        <div class="info-row">
          <span class="label">所屬城市：</span>
          <span class="value">📍 北海道 · {{ cityNamesMap[currentSpot.city] }}</span>
        </div>

        <div class="description-section">
          <h3>🔍 景點詳細介紹</h3>
          <p>{{ currentSpot.description }}</p>
        </div>

        <div class="actions">
          <RouterLink 
            :to="{ 
              path: `/cities/${route.params.city}`, 
              query: route.query.fromType ? { type: route.query.fromType } : {} 
            }" 
            class="back-btn"
          >
            ⬅ 返回 {{ cityNamesMap[currentSpot.city] }} 景點列表
          </RouterLink>
        </div>
      </div>

      <div v-else class="error-card fade-in">
        <h2>❌ 找不到該景點的詳細資料</h2>
        <p>請確認您的網址路徑是否正確。</p>
        <RouterLink :to="`/cities/${route.params.city}`" class="back-home-btn">
          返回景點列表
        </RouterLink>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
/* 第三頁專屬大背景 */
.page-wrapper {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 40px 20px;
  box-sizing: border-box;
  background-image: url(@/assets/Img/北海道-3.jpg);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

/* 內容主要置中容器（寬度與前兩頁完全對齊為 550px，確保換頁不發抖） */
.container { 
  max-width: 550px; 
  margin: 0 auto; 
  font-family: 'Helvetica Neue', Arial, sans-serif; 
  color: #2c3e50; 
}

/* 高質感白底卡片 */
.detail-card { 
  border: 1px solid rgba(224, 224, 224, 0.7); 
  border-radius: 12px; 
  padding: 30px; 
  background-color: rgba(255, 255, 255, 0.96); 
  box-shadow: 0 4px 25px rgba(0,0,0,0.08); 
}

/* 卡片與內容分割線 */
.card-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 15px; 
  margin-bottom: 20px; 
}
.card-header h2 { 
  margin: 0; 
  color: #2c3e50; 
  font-size: 22px; 
}

/* 巨幕大圖外包裝 */
.detail-image-box {
  width: 100%;
  height: 260px; /* 寬廣大視角高度 */
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 22px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.detail-main-img {
  width: 100%;
  height: 100%;
  object-fit: cover; 
}

.info-row { 
  margin-bottom: 15px; 
  font-size: 15px; 
}
.label { 
  color: #7f8c8d; 
}
.value { 
  color: #2c3e50; 
  font-weight: bold; 
}

/* 詳細敘述灰色虛線區塊 */
.description-section { 
  background-color: rgba(248, 249, 250, 0.7); 
  padding: 20px; 
  border-radius: 8px; 
  margin-top: 20px; 
  border: 1px dashed #bdc3c7; /* 古典文青風 dashed 虛線 */
}
.description-section h3 { 
  margin: 0 0 12px 0; 
  font-size: 16px; 
  color: #34495e;
}
.description-section p { 
  margin: 0; 
  color: #555; 
  line-height: 1.6; /* 放大行高，提升長篇文字的閱讀舒適度 */
  font-size: 15px;
}

.actions { 
  margin-top: 30px; 
  text-align: left;
}
.back-btn { 
  color: #3498db; 
  text-decoration: none; 
  font-size: 15px; 
  font-weight: bold; 
  transition: color 0.2s;
}
.back-btn:hover { 
  color: #2980b9; 
}

/* 錯誤處理外框（紅字警告風格） */
.error-card { 
  text-align: center; 
  padding: 40px; 
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  color: #e74c3c; 
}
.back-home-btn {
  display: inline-block;
  margin-top: 15px;
  padding: 8px 16px;
  background-color: #e74c3c;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

/* 藥丸形狀的圓角類別標籤 */
.type-badge { 
  font-size: 12px; 
  padding: 4px 10px; 
  border-radius: 20px; /* 左右完全變為半圓形的藥丸造型 */
  font-weight: bold; 
}
.type-badge.food { background-color: #fef0f0; color: #f56c6c; }
.type-badge.spot { background-color: #f0f9eb; color: #67c23a; }
.type-badge.culture { background-color: #fdf6ec; color: #e6a23c; }

/* 淡入動畫 */
.fade-in { animation: fadeIn 0.3s ease-in-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
</style>