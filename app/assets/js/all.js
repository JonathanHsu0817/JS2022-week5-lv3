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
const data = [];

axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json")
  .then(function(response){
    // console.log(response.data.data);
    updateData(response.data.data);
    // console.log(data)
    sortObjNum();
    renderCard(data);
  });

function updateData(information){
  information.forEach(item =>{
    let obj ={};
    obj.id = item.id;
    obj.name = item.name;
    obj.imgUrl = item.imgUrl;
    obj.area = item.area;
    obj.description = item.description;
    obj.group = item.group;
    obj.price = item.price;
    obj.rate = item.rate;
    // console.log(obj);
    data.push(obj);
  })
}

function sortObjNum(){
  let totalAreaObj = {};
  data.forEach(item=>{
    if(!totalAreaObj[item.area]){
      totalAreaObj[item.area] = 1;
    }else{
      totalAreaObj[item.area] += 1;
    }
  })
  // console.log(totalAreaObj) {高雄: 1, 台北: 1, 台中: 1}

  //轉換成C3能讀取的陣列[]
  const arrayData = Object.entries(totalAreaObj);
  // console.log(arrayData);[['高雄', 1],['台北', 1],['台中',1]]

  // console.log(arrayData.sort((a,b)=>{a-b}))想試著排列，但目前無法Q

  let chart = c3.generate({
    bindto: '#chart', // HTML 元素綁定
    data: {
      columns: arrayData, // 資料存放
      type: "donut",
      colors:{
        "高雄":"#E68618",
        "台中":"#5151D3",
        "台北":"#26BFC7"
      }
    },
    donut:{
      title:"套票地區比重"
    }
  });
}

  

const searchNum = document.querySelector(".search-num");
const card = document.querySelector(".search-place");
const searchDataNum = document.querySelector(".search-text")
const searchSelection = document.querySelector("#searchPlace");



//預設載入、渲染幾筆資料
function renderCard(renderData){
  let str="";
  renderData.forEach(item=>{
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
    searchDataNum.innerHTML = `<p class="search-text mb-0">本次搜尋共 ${renderData.length} 筆資料</p>`;
  })
}

renderCard(data);

//篩選器邏輯
searchSelection.addEventListener('change',research);

function research(e){
  console.log(e.target.value);
  let str="";
  if(e.target.value === "地區搜尋"){
    renderCard(data);
  }else {
    const tempData = [];
    data.forEach(item=>{
      if(item.area === e.target.value){
        tempData.push(item)
      }
    })
    // console.log(tempData);
    renderCard(tempData);
  }
}

//新增卡片邏輯
const ticketName = document.querySelector("#ticketName");

const ticketUrl = document.querySelector("#ticketUrl"); 

const ticketRegion = document.querySelector("#ticketRegion");

const ticketPrice = document.querySelector("#ticketPrice");

const ticketNum = document.querySelector("#ticketNum");

const ticketStar = document.querySelector("#ticketStar");

const ticketDescription = document.querySelector("#ticketDescription");

const addTicketBtn = document.querySelector("#addTicketBtn");



function addData(){
  if(!ticketName.value||!ticketUrl.value||!ticketUrl.value||ticketRegion.value==="請選擇景點地區"||!ticketDescription.value||!ticketNum||!ticketPrice||!ticketStar){
    return alert("請不要留空格");
  }
  let obj = {};
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
  const form = document.querySelector(".addticket-form");
  form.reset();
  sortObjNum();
  renderCard(data)
}


addTicketBtn.addEventListener("click", (e) =>{
  // console.log(ticketName.value);
  addData();
})



