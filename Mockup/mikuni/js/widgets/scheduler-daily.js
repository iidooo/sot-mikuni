/**
 * Created by yafangtao on 16/5/2.
 */
var selectecdlog = [];
var resultLen = 0;
var resultBegin = 0;

var selectedColor = '#7CB0DC';

//    // Or you can animate the scrolling:
//    container.animate({
//        scrollLeft: scrollTo.offset().left - container.offset().left + container.scrollLeft()
//    });

$(function () {
    //$('.form_time').datetimepicker({
    //    weekStart: 1,
    //    todayBtn: 1,
    //    autoclose: 1,
    //    todayHighlight: 1,
    //    startView: 1,
    //    minView: 0,
    //    maxView: 1,
    //    forceParse: 0,
    //    format: 'hh:ii'
    //});
    //
    //$('.form_date').datetimepicker({
    //    weekStart: 1,
    //    todayBtn: 1,
    //    autoclose: 1,
    //    todayHighlight: 1,
    //    startView: 2,
    //    minView: 2,
    //    forceParse: 0,
    //    format: 'yyyy-mm-dd'
    //});


});

function changeRepeatOption() {
    var index = $("#selRepeatMode").val();

    switch (index) {
        case "1":
            $("#repeatDailyOption").attr("class","show");
            $("#repeatWeeklyOption").attr("class","hidden");
            $("#repeatMonthlyOption").attr("class","hidden");
            break;
        case  "2":
            $("#repeatDailyOption").attr("class","show");
            $("#repeatWeeklyOption").attr("class","show");
            $("#repeatMonthlyOption").attr("class","hidden");
            break;
        case "3":
            $("#repeatDailyOption").attr("class","show");
            $("#repeatWeeklyOption").attr("class","hidden");
            $("#repeatMonthlyOption").attr("class","show");
            break;
        default :
            $("#repeatDailyOption").attr("class","hidden");
            $("#repeatWeeklyOption").attr("class","hidden");
            $("#repeatMonthlyOption").attr("class","hidden");
            break;
    }
}

function onMouseDown() {

    selectecdlog = [];
    //resultColor = backColor[$(this).parent().attr('id').substr(1)-1];
    //$('td').css('background-color', 'white');
    // ID for tr tag
    //alert($(this).parent().attr('id'));
    //get the column No.
    //alert($(this).index()+1);
    $(this).css('background-color', selectedColor);
    selectecdlog.push($(this).attr('id'));
    //alert($(this).attr('id'));
    $("td").mouseup(onMouseUp);
    $("td").mouseover(onMouseOver);
}

function onMouseUp() {
    /* Act on the event */
    var len = resultLen = Math.abs(parseInt(selectecdlog[0].substr(selectecdlog[0].indexOf('c') + 1)) - parseInt($(this).attr('id').substr(($(this).attr('id').indexOf('c')) + 1))) + 1;
    var begin = resultBegin = parseInt(selectecdlog[0].substr(selectecdlog[0].indexOf('c') + 1)) > parseInt($(this).attr('id').substr(($(this).attr('id').indexOf('c')) + 1)) ? parseInt($(this).attr('id').substr(($(this).attr('id').indexOf('c')) + 1)) : parseInt(selectecdlog[0].substr(selectecdlog[0].indexOf('c') + 1));
    for (var i = 0; i < resultLen; i++) {
        selectecdlog.push(selectecdlog[0].substr(0, 2) + "c" + (resultBegin + i));
    }
    selectecdlog.shift();
    $('#log').text(selectecdlog.toString());

    $("td").unbind('mouseover', onMouseOver);
    $("td").unbind('mouseup', onMouseUp);

    $('#dialogCreateScheduler').modal('show');
}
function onMouseOver(argument) {
    var len = resultLen = Math.abs(parseInt(selectecdlog[0].substr(selectecdlog[0].indexOf('c') + 1)) - parseInt($(this).attr('id').substr(($(this).attr('id').indexOf('c')) + 1))) + 1;
    var begin = resultBegin = parseInt(selectecdlog[0].substr(selectecdlog[0].indexOf('c') + 1)) > parseInt($(this).attr('id').substr(($(this).attr('id').indexOf('c')) + 1)) ? parseInt($(this).attr('id').substr(($(this).attr('id').indexOf('c')) + 1)) : parseInt(selectecdlog[0].substr(selectecdlog[0].indexOf('c') + 1));
    // $('td').css('background-color', 'white');
    for (var i = 0; i < len; i++) {
        $('#' + selectecdlog[0].substr(0, 2) + "c" + (begin + i)).css('background-color', selectedColor);
    }
    //alert( $(this).attr('id').substr(($(this).attr('id').indexOf('c'))+1));
    //$('#'+tdId).css('background-color', 'red');


}

//combine cells
function doSetting() {
    // body...
    for (var m in selectecdlog) {
        if (m == 0) {
            $('#' + selectecdlog[m]).attr('colspan', resultLen);
            $('#' + selectecdlog[m]).css('width', resultLen * 17 + "px");
            $('#' + selectecdlog[m]).css('white-space', "nowrap");
            //$('#'+selectecdlog[m]).css('background-color', 'bule');
            $('#' + selectecdlog[m]).html("Test User 1");//= '已选择';

        }
        else {
            $('#' + selectecdlog[m]).addClass('hidden');
        }
        $('#' + selectecdlog[m]).unbind('mousedown', onMouseDown);
    }
    $('#dialogCreateScheduler').modal('hide');
}

function doCancel() {
    // body...
    for (var m in selectecdlog) {
        $('#' + selectecdlog[m]).css("background-color", "#FFFFFF");

    }
    $('#dialogCreateScheduler').modal('hide');
}