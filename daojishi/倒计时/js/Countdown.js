//封装倒计时
function t(expire_time) {
    var $Day = $('.day'),
        $Hours = $('.hours'),
        $Minutes = $('.minutes'),
        $Seconds = $('.seconds'),
        NowTime = new Date(),
        EndTime = new Date(expire_time),
        t = (EndTime.getTime() - NowTime.getTime()),
        day = Math.floor(t / 1000 / 60 / 60 / 24),
        hours = Math.floor(t / 1000 / 60 / 60 % 24),
        minutes = Math.floor(t / 1000 / 60 % 60),
        seconds = Math.floor(t / 1000 % 60);
    $Day.html(day < 10 ?(day<0 ?'00':'0'+day):day);
    $Hours.html( hours < 10 ?(hours<0 ?'00':'0'+hours):hours);
    $Minutes.html( minutes < 10 ?(minutes<0 ?'00':'0'+minutes):minutes);
    $Seconds.html( seconds < 10 ?(seconds<0 ?'00':'0'+seconds):seconds);
}