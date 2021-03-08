function showConfimationCollege() {
  $("#college-confirm").removeClass("no-display");
  $(".confirm-buttons").removeClass("no-display");
  setTimeout(function(){
    $("#college-confirm").removeClass("hidden");
    $(".confirm-buttons").removeClass("hidden");
    $("#college-input").addClass("hidden");
    $(".modal-nav").addClass("hidden");
    setTimeout(function(){
      $("#college-input").addClass("no-display");
      $(".modal-nav").addClass("no-display");
    }, 500);
  }, 10);

  // Summary of Form Details before Submit
  var ids = [
    "schoolname", "schoolad", "schoolno",

    "c1name", "c1no", "c1mail",
    "c2name", "c2no", "c2mail",

    "t1_s1name", "t1_s1course", "t1_s1no", "t1_s1mail", "t1_s1attach",
    "t1_s2name", "t1_s2course", "t1_s2no", "t1_s2mail", "t1_s2attach",
    "t1_s3name", "t1_s3course", "t1_s3no", "t1_s3mail", "t1_s3attach",

    "t2_s1name", "t2_s1course", "t2_s1no", "t2_s1mail", "t2_s1attach",
    "t2_s2name", "t2_s2course", "t2_s2no", "t2_s2mail", "t2_s2attach",
    "t2_s3name", "t2_s3course", "t2_s3no", "t2_s3mail", "t2_s3attach",

    "t3_s1name", "t3_s1course", "t3_s1no", "t3_s1mail", "t3_s1attach",
    "t3_s2name", "t3_s2course", "t3_s2no", "t3_s2mail", "t3_s2attach",
    "t3_s3name", "t3_s3course", "t3_s3no", "t3_s3mail", "t3_s3attach"
  ]

  var i;
  for (i = 0; i < ids.length; i++) {
    $("."+ids[i]+"-data").text($("#"+ids[i]).val());
  }

}

function hideConfimationCollege() {
  $(".modal-nav").removeClass("no-display");
  $("#college-input").removeClass("no-display");
  setTimeout(function(){
    $(".modal-nav").removeClass("hidden");
    $("#college-input").removeClass("hidden");
    $("#college-confirm").addClass("hidden");
    $(".confirm-buttons").addClass("hidden");
    setTimeout(function(){
      $("#college-confirm").addClass("no-display");
      $(".confirm-buttons").addClass("no-display");
    }, 500);
  }, 10);
}



$( document ).ready(function() {
  // $(".nav-link").on("mouseenter", function(){
  //   $(this).children(".nav-link-bold").removeClass("hidden-text");
  // });
  // $(".nav-link").on("mouseleave", function(){
  //   $(this).children(".nav-link-bold").addClass("hidden-text");
  // });

  //REG FORM JS
  //in order to transition properly, need to remove disabled (display:none)
  //BEFORE removing hidden (opacity:0)

  var active_modal = 1;
  var has_selected_categ = false;
  var is_qb = false;
  var college_qb_action = "https://docs.google.com/forms/u/0/d/e/1FAIpQLScIvbb_-of4rA-LrE1CBiwmv8q17wqXG-zA1shkQ9k9h_JKWA/formResponse";
  var college_td_action = "https://docs.google.com/forms/u/0/d/e/1FAIpQLScVICy4aNPtTJbcYuoY_k942VUeZvsf_1Ic11IfpLl5OO-dkA/formResponse";
  var visible_teams = 1;
  $("#college-select").on("click", function(){
    $("#bg-1").removeClass("no-display");
    $("#college-registration").removeClass("no-display");
    $("#college-"+active_modal).removeClass("no-display");
    setTimeout(function(){
      $("#bg-1").removeClass("hidden");
      $("#college-registration").removeClass("hidden");
      $(".intro-slide-container").addClass("no-display");
      $("#college-"+active_modal).removeClass("hidden");
      $("#college-"+active_modal).addClass("active");
    }, 50);
  });


  $(".next").on("click", function(){

    if (active_modal==1 && has_selected_categ==false){
      $(".error-message").css({'opacity' : 1});
    } else {
      if (active_modal==5){
        showConfimationCollege();
        return;
      }
      //prevent double click
      $(".next").prop("disabled", true);
      //push down current active
      $("#college-"+String(active_modal)).addClass("phase-out");
      $("#college-"+String(active_modal)).removeClass("active");
      //elevate hidden next page and enable
      $("#college-"+String(active_modal+1)).addClass("active");
      $("#college-"+String(active_modal+1)).removeClass("no-display");
      setTimeout(function(){
        $("#college-"+String(active_modal+1)).removeClass("hidden");
        //disable non-visible formerly active page
        $("#college-"+String(active_modal)).addClass("hidden");
        $("#college-"+String(active_modal)).removeClass("phase-out");

        setTimeout(function(){
          $("#college-"+String(active_modal)).addClass("no-display");
          active_modal +=1;
          $(".next").prop("disabled", false);
        }, 500);

      }, 10);
    }
  });

  $(".back").on("click", function(){
    if (active_modal==1){
      return;
    }
    //prevent double click
    $(".back").prop("disabled", true);
    //push down current active
    $("#college-"+String(active_modal)).addClass("phase-out");
    $("#college-"+String(active_modal)).removeClass("active");
    //elevate hidden next page and enable
    $("#college-"+String(active_modal-1)).addClass("active");
    $("#college-"+String(active_modal-1)).removeClass("no-display");
    setTimeout(function(){
      $("#college-"+String(active_modal-1)).removeClass("hidden");
      //disable non-visible formerly active page
      $("#college-"+String(active_modal)).addClass("hidden");
      $("#college-"+String(active_modal)).removeClass("phase-out");
      setTimeout(function(){
        $("#college-"+String(active_modal)).addClass("no-display");
        active_modal -=1;
        $(".back").prop("disabled", false);
      }, 500);
    }, 10);
  });

  $(".back-confirm").on("click", function(){
    hideConfimationCollege();
  });

  $("#college-qb-select").on("click", function(){
    is_qb = true; //use this to set target URL later.
    has_selected_categ = true;
    $("#quali-qb").css({'opacity' : 1});
    $("#quali-td").css({'opacity' : 0});
    $(".error-message").css({'opacity' : 0});
    $(".event-data").text("College Quiz Bee")
    $("#college-qb-select").addClass("active-choice")
    $("#college-td-select").removeClass("active-choice")
  });

  $("#college-td-select").on("click", function(){
    is_qb = false; //use this to set target URL later.
    has_selected_categ = true;
    $("#quali-qb").css({'opacity' : 0});
    $("#quali-td").css({'opacity' : 1});
    $(".error-message").css({'opacity' : 0});
    $(".event-data").text("Technological Design Contest")
    $("#college-qb-select").removeClass("active-choice")
    $("#college-td-select").addClass("active-choice")
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
    $("#college-team-" + String(visible_teams+1)).removeClass("no-display");
    visible_teams+=1;
  });

  $("#removeteam").on('click', function(){
    if (visible_teams == 1){
      return;
    }
    $("#college-team-" + String(visible_teams)).addClass("no-display");
    visible_teams-=1;
  });

});
