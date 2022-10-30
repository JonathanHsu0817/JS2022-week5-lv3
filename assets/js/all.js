"use strict";

// const { init } = require("browser-sync");
var data = [{
  "id": 0,
  "name": "肥宅心碎賞櫻3日",
  "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
  "area": "高雄",
  "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
  "group": 87,
  "price": 1400,
  "rate": 10
}, {
  "id": 1,
  "name": "貓空纜車雙程票",
  "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  "area": "台北",
  "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
  "group": 99,
  "price": 240,
  "rate": 2
}, {
  "id": 2,
  "name": "台中谷關溫泉會1日",
  "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  "area": "台中",
  "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
  "group": 20,
  "price": 1765,
  "rate": 7
}];
var searchNum = document.querySelector(".search-num");
var card = document.querySelector(".search-place");
var searchSelection = document.querySelector("#searchPlace");
var str = "";
var searchText = "<p class=\"search-text mb-0\">\u672C\u6B21\u641C\u5C0B\u5171 ".concat(data.length, " \u7B46\u8CC7\u6599</p>");
searchNum.innerHTML = searchText;

function init() {
  data.forEach(function (item) {
    var cardContent = "<div class=\"col-lg-4 mb-8\">\n    <div class=\"card shadow d-flex flex-column h-100\">\n      <div class=\"search-picture position-relative\">\n        <div class=\"place-icon bg-secondary text-white rounded-end position-absolute py-2 px-5\">".concat(item.area, "</div>\n        <div class=\"place-rate bg-primary text-white rounded-end position-absolute py-1 px-2\">").concat(item.rate, "</div>\n        <a href=\"#\" class=\"d-block overflow-hidden\"><img src=\"").concat(item.imgUrl, "\" class=\"card-img-top  object-fix-cover\" alt=\"travel_1.png\"></a>\n      </div>\n        <div class=\"card-body d-flex flex-column\">\n          <h2 class=\"card-title fw-bold text-primary border-bottom border-2 border-primary pb-1 mb-4\"><a href=\"#\" class=\"text-decoration-none\">").concat(item.name, "</a></h2>\n          <p class=\"card-text text-gray\">").concat(item.description, "</p>\n          <div class=\"d-flex justify-content-between align-items-center mt-auto\">\n            <div class=\"text-primary fw-bold\"><i class=\"fas fa-exclamation-circle me-1\"></i>\u5269\u4E0B\u6700\u5F8C ").concat(item.group, " \u7D44</div>\n            <div class=\"d-flex align-items-center text-primary fw-bold\">TWD<span class=\"fs-7 ms-1\">").concat(item.price, "</span></div>\n        </div>\n      </div>\n    </div>\n  </div>");
    str += cardContent;
    card.innerHTML = str;
  });
}

init();
searchSelection.addEventListener('change', research);

function research(e) {
  // console.log(e.target.value);
  data.forEach(function (item) {
    var cardContent = "<div class=\"col-lg-4 mb-8\">\n  <div class=\"card shadow d-flex flex-column h-100\">\n    <div class=\"search-picture position-relative\">\n      <div class=\"place-icon bg-secondary text-white rounded-end position-absolute py-2 px-5\">".concat(item.area, "</div>\n      <div class=\"place-rate bg-primary text-white rounded-end position-absolute py-1 px-2\">").concat(item.rate, "</div>\n      <a href=\"#\" class=\"d-block overflow-hidden\"><img src=\"").concat(item.imgUrl, "\" class=\"card-img-top  object-fix-cover\" alt=\"travel_1.png\"></a>\n    </div>\n      <div class=\"card-body d-flex flex-column\">\n        <h2 class=\"card-title fw-bold text-primary border-bottom border-2 border-primary pb-1 mb-4\"><a href=\"#\" class=\"text-decoration-none\">").concat(item.name, "</a></h2>\n        <p class=\"card-text text-gray\">").concat(item.description, "</p>\n        <div class=\"d-flex justify-content-between align-items-center mt-auto\">\n          <div class=\"text-primary fw-bold\"><i class=\"fas fa-exclamation-circle me-1\"></i>\u5269\u4E0B\u6700\u5F8C ").concat(item.group, " \u7D44</div>\n          <div class=\"d-flex align-items-center text-primary fw-bold\">TWD<span class=\"fs-7 ms-1\">").concat(item.price, "</span></div>\n      </div>\n    </div>\n  </div>\n</div>");

    if (e.target.value == item.area) {
      str += cardContent;
    }

    card.innerHTML = str;
  });
}
//# sourceMappingURL=all.js.map