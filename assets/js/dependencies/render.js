function render(tplName,data,cb){
    var tplPath ='templates/' + tplName + '.ejs';

    $.get(tplPath,function(resData){
        var html = ejs.render(resData,data);
        cb(html);
    });
}