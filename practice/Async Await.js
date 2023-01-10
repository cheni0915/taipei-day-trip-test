// 非同步函數
function sendRequest() {
    // 當Promise 完成任務，調用resolve
    // 當Promise 失敗，則用reject
    return new Promise(function(resolve, reject) {
        // setTimeout (執行函數 , 等待時間)
        setTimeout(function() {
            // resolve("John Doe")
            reject("Requset rejected due to server error")
        }), 2000;
    });
}

// sendRequest() 獲得一個Promise 變量
// 用Promise 變數盛裝,console.log出來是一個promise object
// let promise = sendRequest();   
// console.log(promise);


// promise.then(function(username){
//     console.log(username)
// });



// await 只能用在async function裡面
// await 用來等待promise完成任務
// await 後面會加回傳的promise函數

// 在async await 裡，用try.catch除錯
// async function getUsername() {
//     // try 嘗試執行的代碼
//     try {
//         let username = await sendRequest();
//         console.log(username);
//     } catch (message) {
//         // catch 捕捉錯誤訊息，進行對應處理
//         console.log(`Error: ${message}`);
//     }
    
// }

// getUsername();

async function getUsername() {
    // try 嘗試執行的代碼
    try {
        let username = await fetch("https://jsonplaceholder.typicode.com/users");
        username = await username.json();
        console.log(username);
    } catch (message) {
        // catch 捕捉錯誤訊息，進行對應處理
        console.log(`Error: ${message}`);
    }
    
}

getUsername();
