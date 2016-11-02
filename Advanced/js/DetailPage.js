var CommonData = require("js/CommonData");

function goBack()
{
    router.goBack();
}

module.exports = {
    goBack,
    selectedItem:CommonData.selectedItem
}