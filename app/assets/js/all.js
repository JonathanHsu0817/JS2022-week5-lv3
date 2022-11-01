// const { init } = require("browser-sync");

const data = [
  {
    "id": 0,
    "name": "肥宅心碎賞櫻3日",
    "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    "area": "高雄",
    "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    "group": 87,
    "price": 1400,
    "rate": 10
  },
  {
    "id": 1,
    "name": "貓空纜車雙程票",
    "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台北",
    "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    "group": 99,
    "price": 240,
    "rate": 2
  },
  {
    "id": 2,
    "name": "台中谷關溫泉會1日",
    "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台中",
    "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    "group": 20,
    "price": 1765,
    "rate": 7
  }
];
const searchNum = document.querySelector(".search-num");
const card = document.querySelector(".search-place");

let searchSelection = document.querySelector("#searchPlace");

let str="";

let searchText = `<p class="search-text mb-0">本次搜尋共 ${data.length} 筆資料</p>`
searchNum.innerHTML = searchText;

//預設載入
function init(){
  data.forEach(item=>{
    let cardContent = `<div class="col-lg-4 mb-8">
    <div class="card shadow d-flex flex-column h-100">
      <div class="search-picture position-relative">
        <div class="place-icon bg-secondary text-white rounded-end position-absolute py-2 px-5">${item.area}</div>
        <div class="place-rate bg-primary text-white rounded-end position-absolute py-1 px-2">${item.rate}</div>
        <a href="#" class="d-block overflow-hidden"><img src="${item.imgUrl}" class="card-img-top  object-fix-cover" alt="travel_1.png"></a>
      </div>
        <div class="card-body d-flex flex-column">
          <h2 class="card-title fw-bold text-primary border-bottom border-2 border-primary pb-1 mb-4"><a href="#" class="text-decoration-none">${item.name}</a></h2>
          <p class="card-text text-gray">${item.description}</p>
          <div class="d-flex justify-content-between align-items-center mt-auto">
            <div class="text-primary fw-bold"><i class="fas fa-exclamation-circle me-1"></i>剩下最後 ${item.group} 組</div>
            <div class="d-flex align-items-center text-primary fw-bold">TWD<span class="fs-7 ms-1">${item.price}</span></div>
        </div>
      </div>
    </div>
  </div>`;
    str+= cardContent;
    card.innerHTML = str;
  })
}

init();

//篩選器邏輯
searchSelection.addEventListener('change',research);

function research(e){
  // console.log(e.target.value);
  str="";
  data.forEach(item =>{
    let cardContent = `<div class="col-lg-4 mb-8">
  <div class="card shadow d-flex flex-column h-100">
    <div class="search-picture position-relative">
      <div class="place-icon bg-secondary text-white rounded-end position-absolute py-2 px-5">${item.area}</div>
      <div class="place-rate bg-primary text-white rounded-end position-absolute py-1 px-2">${item.rate}</div>
      <a href="#" class="d-block overflow-hidden"><img src="${item.imgUrl}" class="card-img-top  object-fix-cover" alt="travel_1.png"></a>
    </div>
      <div class="card-body d-flex flex-column">
        <h2 class="card-title fw-bold text-primary border-bottom border-2 border-primary pb-1 mb-4"><a href="#" class="text-decoration-none">${item.name}</a></h2>
        <p class="card-text text-gray">${item.description}</p>
        <div class="d-flex justify-content-between align-items-center mt-auto">
          <div class="text-primary fw-bold"><i class="fas fa-exclamation-circle me-1"></i>剩下最後 ${item.group} 組</div>
          <div class="d-flex align-items-center text-primary fw-bold">TWD<span class="fs-7 ms-1">${item.price}</span></div>
      </div>
    </div>
  </div>
</div>`;
    if(e.target.value === "地區搜尋"){
      str+=cardContent;
    }else if(e.target.value === item.area){
      str+=cardContent;
    }
    card.innerHTML = str;
  })
}

//新增邏輯
const ticketName = document.querySelector("#ticketName");

const ticketUrl = document.querySelector("#ticketUrl"); 

const ticketRegion = document.querySelector("#ticketRegion");

const ticketPrice = document.querySelector("#ticketPrice");

const ticketNum = document.querySelector("#ticketNum");

const ticketStar = document.querySelector("#ticketStar");

const ticketDescription = document.querySelector("#ticketDescription");

const addTicketBtn = document.querySelector("#addTicketBtn");

let obj = {};

function addData(){
  obj.id= data.length;
  obj.name = ticketName.value;
  obj.imgUrl = ticketUrl.value;
  obj.area = ticketRegion.value;
  obj.description = ticketDescription.value;
  obj.group = ticketNum.value;
  obj.price = ticketPrice.value;
  obj.rate = ticketStar.value;
  // console.log(obj);
  data.push(obj);
  init();
  cleanWrittenData();
}

function cleanWrittenData(){
  obj={};
}

addTicketBtn.addEventListener("click", (e) =>{
  // console.log(ticketName.value);
  addData();

})