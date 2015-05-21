var Dict = (function () {
    var Dict = function () {};
    var p = Dict.prototype;
    p.SAVE_URL   = "";
    p.GET_URL    = "";
    p.SEARCH_URL = "";
    p.search = function (word) {
        var that = this;
        $.get(this.SEARCH_URL + word,
            function (res) {
                $(res).find('ItemID').each(function (i, v) {
                    that.get(v);
                })
            }
        );
    };
    p.get = function (itemID) {
        $.get(this.GET_URL + $(itemID).text(),
            function (res) {
                $(res).find('.NetDicBody').each(function (i, v) {
                    alert($(v).text());
                });
            }
        );
    };
    p.save = function (word) {
        $.post(this.SAVE_URL + word, function (res) {});
    };
    return Dict;
})();
chrome.runtime.getPackageDirectoryEntry(function (root) {
    root.getFile('config.json', {}, function (entry) {
        entry.file(function (file) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                var config = JSON.parse(this.result);
                var p = Dict.prototype;
                p.SAVE_URL   = config.save_url;
                p.GET_URL    = config.get_url;
                p.SEARCH_URL = config.search_url;
            };
            reader.readAsText(file);
        });
    });
});
chrome.contextMenus.create({
    title: "「%s」をWordbookに登録",
    type: "normal",
    contexts: ["selection"],
    onclick: function (info, tab) {
        var dict = new Dict();
        dict.save(info.selectionText);
        dict.search(info.selectionText);
    }
});

