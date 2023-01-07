
// "http://18.180.213.40:3000/api/attractions?page=1"     EC2
// "http://192.168.2.168:3000/api/attractions?page=0"     自家

// fetch(request, {mode: 'cors'});

fetch(
    "http://192.168.2.168:3000/api/attractions?page=4"
).then(function(response){
    return response.json();
}).then(function(data){
    // 頁數
    nextPage = data.nextPage;
    console.log(nextPage);      // 1

    // console.log(data);     data {}
    data = data.data;         //  []
    
    for (let i = 0; i < data.length; i++) {
        setAttraction(data[i]);
    }
});


// 思考第一筆資料傳入
function setAttraction(data) {
    // console.log(data) {}
    // console.log(data.images);

        let attractionsContent = document.createElement("div");
        attractionsContent.setAttribute("class", "attractions__content");

        // <div class="attractions__space">
        let attractionsSpace = document.createElement("div");
        attractionsSpace.setAttribute("class", "attractions__space");

        // attractions__image
        let attractionsImage = document.createElement("img");
        attractionsImage.setAttribute("class", "attractions__image");
        attractionsImage.setAttribute("src", data.images[0]);

        // <div class="attractions__filter">
        let attractionsFilter = document.createElement("div");
        attractionsFilter.setAttribute("class", "attractions__filter");

        // <div class="attractions__name">
        let attractionsName = document.createElement("div");
        attractionsName.setAttribute("class", "attractions__name");
        attractionsName.innerHTML = data.name;


        // <div class="attractions__information">
        let attractionsInformation = document.createElement("div");
        attractionsInformation.setAttribute("class", "attractions__information");


        // <div class="attractions__mrt">MRT1</div>
        let attractionsMRT = document.createElement("div");
        attractionsMRT.setAttribute("class", "attractions__mrt");
        attractionsMRT.innerHTML = data.mrt;


        // <div class="attractions__cat">CAT1</div>
        let attractionsCat = document.createElement("div");
        attractionsCat.setAttribute("class", "attractions__cat");
        attractionsCat.innerHTML = data.category;


        // 找出要塞進的起始div 把資料塞進去
        // appendChild() => 找出父層，一層一層塞資料    // class="attractions"


        let attractionsDiv = document.getElementsByClassName("attractions")[0];
        // console.log(attractionsDiv);     // HTMLCollection [div.attractions]
        // console.log(typeof(attractionsDiv));   object
        /**
         * domElement.appendChild()中，
         * 获取domElement 时，使用了getElementsByClassName() 
         * 这类获得的结果是数组的函数，而没有定位到其中的某一个对象。
         * 改正如var domElement = getElementsByClassName("div") [0]。
         * 
         * 
         * getElementsByClassName() 獲得是複數資料，要指定成一項
         * 
         */


        // 第一層
        attractionsDiv.appendChild(attractionsContent);

        // 第二層
        attractionsContent.appendChild(attractionsSpace);
        attractionsContent.appendChild(attractionsInformation);
        // 第三層-1
        attractionsSpace.appendChild(attractionsImage);
        attractionsSpace.appendChild(attractionsFilter);
        attractionsSpace.appendChild(attractionsName);
        // 第三層-2
        attractionsInformation.appendChild(attractionsMRT);
        attractionsInformation.appendChild(attractionsCat);
};



// 自動載入
/* 
思路
1.當畫面捲動到最下面時 =>將要看到footer，自動載入新的資料
2.原本的資料仍在上面不動，所以資料資料是以新增的方式加入
3.當載入的頁面資料nextPage顯示 null 不再新增資料

*/


/*

root
指定的容器，比如要偵測 #container 內的目標是否進入可見範圍，就可以像這樣設定：
root: document.getElementById('container');
預設為 null 也就是代表整個頁面(body)。

rootMargin
意思是移動到目標的相對位置，
預設四邊都是 0px，如果設定 10px 的話，
代表是距離目標還有 10px 時才會觸發事件，也可以設定負值，
比如設定 -20px 的話，代表已經進入目標 20px 後才會觸發事件。

threshold
這個參數是設定目標進入可見範圍多少百分比後會觸發，用陣列帶入，比如：
threshold: [0, 0.25, 0.5]
就會目標出現 0%(也就是剛出現)、25% 及 50% 時都觸發事件。

*/ 




// 1.觀察器就是用來設定你要偵測捲動目標是否進入可見範圍的容器

//  option 是選項，都不填就會使用預設值，option 可以填的內容如下：
let options = {
  root: document.getElementsByClassName("root"),
  rootMargin: '10px',
  threshold: [0]
};


//  callback 就是當目標(target)進入/離開觀察器(root)的可見範圍會做的事。
let observer = new IntersectionObserver(callback, [options]);



// 2.指定觀察目標(entry)
let footer = document.getElementsByClassName("footer")[0];
// console.log(footer);
// console.log(typeof(footer));    
observer.observe(footer);



// 3.容器跟目標都設定好後，就可以設計 callback 要做的事了：
function callback(entries, observer) {
  for (const entry of entries) {
    if (entry.intersectionRatio > 0) {
      // 元素已經進入視窗
      // console.log("元素已經進入視窗");
        fetch(
         "http://192.168.2.168:3000/api/attractions?page=1"
        ).then(function(response){
             return response.json();
        }).then(function(data){
            // 頁數
            nextPage = data.nextPage;
            console.log(nextPage);      // 1

            // console.log(data);     data {}
            data = data.data;         //  []
            
            for (let i = 0; i < data.length; i++) {
                setAttraction(data[i]);
            }
        });
    } else {
      // 元素已經離開視窗
      console.log("元素已經離開視窗");
    }
  }
}

