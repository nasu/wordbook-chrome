var Dict = (function () {
    var Dict = function () {};
    var p = Dict.prototype;
    p.search = function (word) {
        var that = this;
        $.get('http://public.dejizo.jp/NetDicV09.asmx/SearchDicItemLite?' +
            'Dic=EJdict&Word=' + word + '&' +
            'Scope=HEADWORD&Match=STARTWITH&Merge=AND&' +
            'Prof=XHTML&PageSize=1&PageIndex=0',
            function (res) {
                $(res).find('ItemID').each(function (i, v) {
                    that.get(v);
                })
            }
        );
    };
    p.get = function (itemID) {
        $.get('http://public.dejizo.jp/NetDicV09.asmx/GetDicItemLite?' +
            'Dic=EJdict&Item=' + $(itemID).text() + '&' +
            'Loc=&Prof=XHTML',
            function (res) {
                $(res).find('.NetDicBody').each(function (i, v) {
                    alert($(v).text());
                });
            }
        );
    };
    return Dict;
})();
chrome.contextMenus.create({
    title: "「%s」をWordbookに登録",
    type: "normal",
    contexts: ["selection"],
    onclick: function (info, tab) {
        $.post('http://localhost:8000/word/' + info.selectionText, function (res) {});
        var dict = new Dict();
        dict.search(info.selectionText);
    }
});

