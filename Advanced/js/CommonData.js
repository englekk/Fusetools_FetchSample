var Observable = require("FuseJS/Observable");

var items = Observable();
var searchText = Observable();
var selectedItem = Observable();

// Daum API key (https://apis.daum.net/search/book)
var api_key = "";

// API 키가 없다면 아래 json 사용
var jsonArr = [
    "https://dl.dropboxusercontent.com/u/1486638/examples/fuse_fetch1.json",
    "https://dl.dropboxusercontent.com/u/1486638/examples/fuse_fetch2.json",
    "https://dl.dropboxusercontent.com/u/1486638/examples/fuse_fetch3.json"
];

module.exports = {
    items,
    searchText,
    selectedItem,
    api_key,
    jsonArr
}