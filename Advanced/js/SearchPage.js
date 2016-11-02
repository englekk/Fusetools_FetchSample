var print = debug_log;
var CommonData = require("js/CommonData");

var jsonArrCursor = 0;

// HTML 태그 없애기
function stripHTML(text)
{
    text = text.replace(/&lt;/gm, "<");
    text = text.replace(/&gt;/gm, ">");
    return text.replace(/<.*?>/gm, '');
}

// 숫자 포맷
Number.prototype.numberFormat = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

// 검색 시작
function search()
{
    CommonData.items.clear();

    // API 키가 있거나 없는 경우 json 데이터 가져오기
    var _url = 'https://apis.daum.net/search/book?apikey=' + CommonData.api_key + '&q=' + CommonData.searchText.value + '&output=json';
    if(CommonData.api_key == "")
    {
        if(jsonArrCursor > CommonData.jsonArr.length - 1) jsonArrCursor = 0;
        _url = CommonData.jsonArr[jsonArrCursor];
        jsonArrCursor++;
    }

    fetch(_url, {
        method: 'GET',
        headers: { "Content-type": "application/json"}
    }).then(function(response) {
        // print("status: " + response.status);
        // print("response_ok: " + response.ok);
        return response.json();
    }).then(function(jsonData) {
        var _items = jsonData.channel.item;
        for(var i = 0; i < _items.length; ++i)
        {
            _items[i].title = stripHTML(_items[i].title);
            _items[i].sale_price = (_items[i].sale_price * 1).numberFormat();
            CommonData.items.add(_items[i]);
        }
    }).catch(function(err) {
        print("Error!!");
    });
}

// 상세보기 페이지로 이동
function showDetailPage(args)
{
    CommonData.selectedItem.value = args.data;
    router.push("detailPage");
}

module.exports = {
    items:CommonData.items,
    searchText:CommonData.searchText,
    search,
    selectedItem:CommonData.selectedItem,
    showDetailPage
}