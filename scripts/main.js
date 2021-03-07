

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

  active_moodle = 1;

  $("#college-select").on("click", function(){
    $("#bg-1").removeClass("disabled");
    $("#college-form").removeClass("disabled");
    $("#college-"+active_moodle).removeClass("disabled");
    setTimeout(function(){
      $("#bg-1").removeClass("hidden");
      $("#college-form").removeClass("hidden");
      $("#college-"+active_moodle).removeClass("hidden");
      $("#college-"+active_moodle).addClass("active");
    }, 50);
  });

  $(".next").on("click", function(){
    if (active_moodle==5){
      return;
    }
    //push down current active
    $("#college-"+String(active_moodle)).addClass("phase-out");
    $("#college-"+String(active_moodle)).removeClass("active");
    //elevate hidden next page and enable
    $("#college-"+String(active_moodle+1)).addClass("active");
    $("#college-"+String(active_moodle+1)).removeClass("disabled");
    setTimeout(function(){
      $("#college-"+String(active_moodle+1)).removeClass("hidden");
      //disable non-visible formerly active page
      $("#college-"+String(active_moodle)).addClass("disabled");
      $("#college-"+String(active_moodle)).addClass("hidden");
      $("#college-"+String(active_moodle)).removeClass("phase-out");
      active_moodle +=1;
    }, 50);
  });

  $(".back").on("click", function(){
    if (active_moodle==1){
      return;
    }
    //push down current active
    $("#college-"+String(active_moodle)).addClass("phase-out");
    $("#college-"+String(active_moodle)).removeClass("active");
    //elevate hidden next page and enable
    $("#college-"+String(active_moodle-1)).addClass("active");
    $("#college-"+String(active_moodle-1)).removeClass("disabled");
    setTimeout(function(){
      $("#college-"+String(active_moodle-1)).removeClass("hidden");
      //disable non-visible formerly active page
      $("#college-"+String(active_moodle)).addClass("disabled");
      $("#college-"+String(active_moodle)).addClass("hidden");
      $("#college-"+String(active_moodle)).removeClass("phase-out");
      active_moodle -=1;
    }, 50);
  });

});
