function showConfimationCollege() {
  $("#college-confirm").removeClass("disabled");
  setTimeout(function(){
    $("#college-confirm").removeClass("hidden");
    $("#college-input").addClass("hidden");
    setTimeout(function(){
      $("#college-input").addClass("disabled");
    }, 500);
  }, 10);
}

function hideConfimationCollege() {

  $("#college-input").removeClass("disabled");
  setTimeout(function(){
    $("#college-input").removeClass("hidden");
    $("#college-confirm").addClass("hidden");
    setTimeout(function(){
      $("#college-confirm").addClass("disabled");
    }, 500);
  }, 10);
}



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

  active_modal = 1;
  is_qb = false;
  college_qb_action = "https://docs.google.com/forms/u/0/d/e/1FAIpQLScIvbb_-of4rA-LrE1CBiwmv8q17wqXG-zA1shkQ9k9h_JKWA/formResponse";
  college_td_action = "https://docs.google.com/forms/u/0/d/e/1FAIpQLScLfRcqT95vuxgQ_kpl_-8YQI3sy4gnh1WaIf5hKbJyVdMQQw/formResponse";
  visible_teams = 1;

  $("#college-select").on("click", function(){
    $("#bg-1").removeClass("disabled");
    $("#college-registration").removeClass("disabled");
    $("#college-"+active_modal).removeClass("disabled");
    setTimeout(function(){
      $("#bg-1").removeClass("hidden");
      $("#college-registration").removeClass("hidden");
      $("#college-"+active_modal).removeClass("hidden");
      $("#college-"+active_modal).addClass("active");
    }, 50);
  });

  $(".next").on("click", function(){
    if (active_modal==5){
      showConfimationCollege();
      return;
    }
    //push down current active
    $("#college-"+String(active_modal)).addClass("phase-out");
    $("#college-"+String(active_modal)).removeClass("active");
    //elevate hidden next page and enable
    $("#college-"+String(active_modal+1)).addClass("active");
    $("#college-"+String(active_modal+1)).removeClass("disabled");
    setTimeout(function(){
      $("#college-"+String(active_modal+1)).removeClass("hidden");
      //disable non-visible formerly active page
      $("#college-"+String(active_modal)).addClass("hidden");
      $("#college-"+String(active_modal)).removeClass("phase-out");

      setTimeout(function(){
        $("#college-"+String(active_modal)).addClass("disabled");
        active_modal +=1;
      }, 500);

    }, 10);

  });

  $(".back").on("click", function(){
    if (active_modal==1){
      return;
    }
    //push down current active
    $("#college-"+String(active_modal)).addClass("phase-out");
    $("#college-"+String(active_modal)).removeClass("active");
    //elevate hidden next page and enable
    $("#college-"+String(active_modal-1)).addClass("active");
    $("#college-"+String(active_modal-1)).removeClass("disabled");
    setTimeout(function(){
      $("#college-"+String(active_modal-1)).removeClass("hidden");
      //disable non-visible formerly active page
      $("#college-"+String(active_modal)).addClass("hidden");
      $("#college-"+String(active_modal)).removeClass("phase-out");
      setTimeout(function(){
        $("#college-"+String(active_modal)).addClass("disabled");
        active_modal -=1;
      }, 500);
    }, 10);
  });

  $(".back-confirm").on("click", function(){
    hideConfimationCollege();
  });

  $("#college-qb-select").on("click", function(){
    is_qb = true; //use this to set target URL later.
    $("#quali-qb").css({'opacity' : 1});
    $("#quali-td").css({'opacity' : 0});
  });

  $("#college-td-select").on("click", function(){
    is_qb = false; //use this to set target URL later.
    $("#quali-qb").css({'opacity' : 0});
    $("#quali-td").css({'opacity' : 1});
  });

  $("#college-submit").on("click", function(){
    if (is_qb){
      $("#college-form").prop("action", college_qb_action);
    }else {
      $("#college-form").prop("action", college_td_action);
    }
    console.log($('#college-form').serialize());
    $("#college-form").submit();
  });

  $("#addteam").on('click', function(){
    if (visible_teams == 3){
      return;
    }
    $("#college-team-" + String(visible_teams+1)).removeClass("disabled");
    visible_teams+=1;
  });

  $("#removeteam").on('click', function(){
    if (visible_teams == 1){
      return;
    }
    $("#college-team-" + String(visible_teams)).addClass("disabled");
    visible_teams-=1;
  });

});
