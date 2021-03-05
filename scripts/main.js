$( document ).ready(function() {
  console.log("document ready");
  $(".nav-link").on("mouseenter", function(){
    $(this).children(".nav-link-thin").addClass("hidden-text");
    $(this).children(".nav-link-bold").removeClass("hidden-text");
  });
  $(".nav-link").on("mouseleave", function(){
    $(this).children(".nav-link-thin").removeClass("hidden-text");
    $(this).children(".nav-link-bold").addClass("hidden-text");
  });
});
