"use strict";

// const { init } = require("browser-sync");
// const data = [
//   {
//     "id": 0,
//     "name": "肥宅心碎賞櫻3日",
//     "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
//     "area": "高雄",
//     "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
//     "group": 87,
//     "price": 1400,
//     "rate": 10
//   },
//   {
//     "id": 1,
//     "name": "貓空纜車雙程票",
//     "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     "area": "台北",
//     "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
//     "group": 99,
//     "price": 240,
//     "rate": 2
//   },
//   {
//     "id": 2,
//     "name": "台中谷關溫泉會1日",
//     "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     "area": "台中",
//     "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
//     "group": 20,
//     "price": 1765,
//     "rate": 7
//   }
// ];
//接取資料
var data = [];
axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json").then(function (response) {
  // console.log(response.data.data);
  updateData(response.data.data); // console.log(data)

  sortObjNum();
  renderCard(data);
});

function updateData(information) {
  information.forEach(function (item) {
    var obj = {};
    obj.id = item.id;
    obj.name = item.name;
    obj.imgUrl = item.imgUrl;
    obj.area = item.area;
    obj.description = item.description;
    obj.group = item.group;
    obj.price = item.price;
    obj.rate = item.rate; // console.log(obj);

    data.push(obj);
  });
}

function sortObjNum() {
  var totalAreaObj = {};
  data.forEach(function (item) {
    if (!totalAreaObj[item.area]) {
      totalAreaObj[item.area] = 1;
    } else {
      totalAreaObj[item.area] += 1;
    }
  }); // console.log(totalAreaObj) {高雄: 1, 台北: 1, 台中: 1}
  //轉換成C3能讀取的陣列[]

  var arrayData = Object.entries(totalAreaObj); // console.log(arrayData);[['高雄', 1],['台北', 1],['台中',1]]
  // console.log(arrayData.sort((a,b)=>{a-b}))想試著排列，但目前無法Q

  var chart = c3.generate({
    bindto: '#chart',
    // HTML 元素綁定
    data: {
      columns: arrayData,
      // 資料存放
      type: "donut",
      colors: {
        "高雄": "#E68618",
        "台中": "#5151D3",
        "台北": "#26BFC7"
      }
    },
    donut: {
      title: "套票地區比重"
    }
  });
}

var searchNum = document.querySelector(".search-num");
var card = document.querySelector(".search-place");
var searchDataNum = document.querySelector(".search-text");
var searchSelection = document.querySelector("#searchPlace"); //預設載入、渲染幾筆資料

function renderCard(renderData) {
  var str = "";
  renderData.forEach(function (item) {
    var cardContent = "<div class=\"col-lg-4 mb-8\">\n    <div class=\"card shadow d-flex flex-column h-100\">\n      <div class=\"search-picture position-relative\">\n        <div class=\"place-icon bg-secondary text-white rounded-end position-absolute py-2 px-5\">".concat(item.area, "</div>\n        <div class=\"place-rate bg-primary text-white rounded-end position-absolute py-1 px-2\">").concat(item.rate, "</div>\n        <a href=\"#\" class=\"d-block overflow-hidden\"><img src=\"").concat(item.imgUrl, "\" class=\"card-img-top  object-fix-cover\" alt=\"travel_1.png\"></a>\n      </div>\n        <div class=\"card-body d-flex flex-column\">\n          <h2 class=\"card-title fw-bold text-primary border-bottom border-2 border-primary pb-1 mb-4\"><a href=\"#\" class=\"text-decoration-none\">").concat(item.name, "</a></h2>\n          <p class=\"card-text text-gray\">").concat(item.description, "</p>\n          <div class=\"d-flex justify-content-between align-items-center mt-auto\">\n            <div class=\"text-primary fw-bold\"><i class=\"fas fa-exclamation-circle me-1\"></i>\u5269\u4E0B\u6700\u5F8C ").concat(item.group, " \u7D44</div>\n            <div class=\"d-flex align-items-center text-primary fw-bold\">TWD<span class=\"fs-7 ms-1\">").concat(item.price, "</span></div>\n        </div>\n      </div>\n    </div>\n  </div>");
    str += cardContent;
    card.innerHTML = str;
    searchDataNum.innerHTML = "<p class=\"search-text mb-0\">\u672C\u6B21\u641C\u5C0B\u5171 ".concat(renderData.length, " \u7B46\u8CC7\u6599</p>");
  });
}

renderCard(data); //篩選器邏輯

searchSelection.addEventListener('change', research);

function research(e) {
  console.log(e.target.value);
  var str = "";

  if (e.target.value === "地區搜尋") {
    renderCard(data);
  } else {
    var tempData = [];
    data.forEach(function (item) {
      if (item.area === e.target.value) {
        tempData.push(item);
      }
    }); // console.log(tempData);

    renderCard(tempData);
  }
} //新增卡片邏輯


var ticketName = document.querySelector("#ticketName");
var ticketUrl = document.querySelector("#ticketUrl");
var ticketRegion = document.querySelector("#ticketRegion");
var ticketPrice = document.querySelector("#ticketPrice");
var ticketNum = document.querySelector("#ticketNum");
var ticketStar = document.querySelector("#ticketStar");
var ticketDescription = document.querySelector("#ticketDescription");
var addTicketBtn = document.querySelector("#addTicketBtn");

function addData() {
  if (!ticketName.value || !ticketUrl.value || !ticketUrl.value || ticketRegion.value === "請選擇景點地區" || !ticketDescription.value || !ticketNum || !ticketPrice || !ticketStar) {
    return alert("請不要留空格");
  }

  var obj = {};
  obj.id = data.length;
  obj.name = ticketName.value;
  obj.imgUrl = ticketUrl.value;
  obj.area = ticketRegion.value;
  obj.description = ticketDescription.value;
  obj.group = ticketNum.value;
  obj.price = ticketPrice.value;
  obj.rate = ticketStar.value; // console.log(obj);

  data.push(obj);
  var form = document.querySelector(".addticket-form");
  form.reset();
  sortObjNum();
  renderCard(data);
}

addTicketBtn.addEventListener("click", function (e) {
  // console.log(ticketName.value);
  addData();
});
//# sourceMappingURL=all.js.map
