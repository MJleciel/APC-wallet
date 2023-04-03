$(function () {
    $(".mobile_nav").click(function () {
        $(".sidebar").toggleClass("active");
        $(this).toggleClass('nav_open')
    });

    // $(".nav_close").click(function () {
    //     $(".nav_close").removeClass("d-block");
    //     $(".nav_close").addClass("d-none");
    //     $(".nav_open").removeClass("d-none");
    // });
});