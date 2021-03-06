$( document ).ready(function() {
  $(".nav-link").on("mouseenter", function(){
    $(this).children(".nav-link-bold").removeClass("hidden-text");
  });
  $(".nav-link").on("mouseleave", function(){
    $(this).children(".nav-link-bold").addClass("hidden-text");
  });

  //REG FORM JS
  //in order to transition properly, need to remove disabled (display:none)
  //BEFORE removing hidden (opacity:0)
  $("#college-select").on("click", function(){
    $("#bg-1").removeClass("disabled");
    $("#college-form").removeClass("disabled");
    setTimeout(function(){
      $("#bg-1").removeClass("hidden");
      $("#college-form").removeClass("hidden");
    }, 50);

  });
});
