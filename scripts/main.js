var active_modal = 1;
var has_selected_categ = false;
var is_qb = false;
var is_mobile = false;
var college_qb_action = "https://docs.google.com/forms/u/0/d/e/1FAIpQLScIvbb_-of4rA-LrE1CBiwmv8q17wqXG-zA1shkQ9k9h_JKWA/formResponse";
var college_td_action = "https://docs.google.com/forms/u/0/d/e/1FAIpQLScVICy4aNPtTJbcYuoY_k942VUeZvsf_1Ic11IfpLl5OO-dkA/formResponse";
var visible_teams = 1;

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

function showRegistrationCollege(){
  $("#bg-1").removeClass("no-display");
  $("#college-registration").removeClass("no-display");
  $("#college-"+active_modal).removeClass("no-display");
  setTimeout(function(){
    $("#bg-1").removeClass("hidden");
    $("#college-registration").removeClass("hidden");
    $(".intro-slide-container").addClass("no-display");
    $(".intro-slide-container").addClass("hidden");
    $("#college-"+active_modal).removeClass("hidden");
    $("#college-"+active_modal).addClass("active");
    $("#reg-menu-"+String(active_modal)).children(".reg-menu-bold").removeClass("hidden-text");
  }, 50);
}

function hideRegistrationCollege(){
  $("#bg-1").addClass("hidden");
  $("#college-registration").addClass("hidden");
  $("#college-"+active_modal).addClass("hidden");
  setTimeout(function(){
    $("#bg-1").addClass("no-display");
    $("#college-registration").addClass("no-display");
    $(".intro-slide-container").removeClass("no-display");
    setTimeout(function(){
      $(".intro-slide-container").removeClass("hidden");
      $("#college-"+active_modal).removeClass("active");
      $("#reg-menu-"+String(active_modal)).children(".reg-menu-bold").addClass("hidden-text");
      active_modal = 1;
    }, 10);
  }, 500);
}

function validate_page(page){
  if (page == 3){
    return ($("#college-form").data('validator').element("#schoolname") &&
      $("#college-form").data('validator').element("#schoolad") &&
      $("#college-form").data('validator').element("#schoolno"));
  }else if (page == 4){
    return ($("#college-form").data('validator').element("#c1name") &&
      $("#college-form").data('validator').element("#c1no"));
  }else if (page == 5){

  }

}

$( document ).ready(function() {

  $.validator.addMethod( "lettersonly", function( value, element ) {
  	return this.optional( element ) || /^[a-z]+$/i.test( value );
    }, "Letters only please."
  );

  $.validator.addMethod( "phphonenumber", function( value, element ) {
  	return this.optional( element ) || /^[0][9]\d{9}$/i.test( value );
    }, "Please enter a phone number in the given PH format."
  );

  $.validator.addMethod( "studentnumber", function( value, element ) {
  	return this.optional( element ) || /^[2][0]\d{2}-\d{5}$/i.test( value );
    }, "Please enter a student number in the given format."
  );

  $.validator.addMethod( "fullname", function( value, element ) {
  	return this.optional( element ) || /^[a-z 0-9.]+[,][ ][a-z 0-9.]+[,][ ][a-z 0-9.]+$/i.test( value );
    }, "Please enter your full name as shown, with commas and spaces to separate."
  );

  $.validator.addMethod( "eeecourse", function( value, element ) {
  	return value==="BS Computer Engineering" || value==="BS Electrical Engineering" || value==="BS Electronics Engineering";
    }, "Please choose from given courses and do not edit their names."
  );

  $("#college-form").validate({
		wrapper:"div",
		errorPlacement:function(error, element) {
			error.insertAfter(element);
		}
	});

  $("#schoolname").rules("add", {
		required: true,
		minlength:2,
		messages: {
			required: "Please enter your school name.",
			minlength: "Please enter a valid name with at least 2 characters.",
		}
	});

  $("#schoolad").rules("add", {
		required: true,
		minlength:2,
		messages: {
			required: "Please enter your school address.",
			minlength: "Please enter a valid name with at least 2 characters.",
		}
	});

  $("#c1name").rules("add", {
		required: true,
		minlength:2,
		fullname: true,
		messages: {
			required: "Please enter your Full Name.",
			minlength: "Please enter a valid name with at least 2 characters.",
		}
	});


  //REG FORM JS
  //in order to transition properly, need to remove disabled (display:none)
  //BEFORE removing hidden (opacity:0)
  $("#college-select").on("click",function(){
    showRegistrationCollege();
    if (is_mobile) {
      alert("We recommend the use of a Laptop/PC when filling up the registration form.")
    }
  });

  if (window.navigator.userAgent.indexOf("Mobile") > -1) {
    is_mobile = true;
    $(".reg-menu").hide();
    $(".nav-header").hide();
  }

  $(".next").on("click", function(){
    if (active_modal==1 && has_selected_categ==false){
      $(".error-message").css({'opacity' : 1});
    } else {
      //case: going to confirmation
      if (active_modal==5){
        showConfimationCollege();
        return;
      }
      //case: incorrect form
      if (active_modal > 2 &&
        !validate_page(active_modal)
      ){
        return;
      }
      //prevent double click
      $(".next").prop("disabled", true);
      //update reg menu
      $("#reg-menu-"+String(active_modal+1)).children(".reg-menu-bold").removeClass("hidden-text");
      $("#reg-menu-"+String(active_modal)).children(".reg-menu-bold").addClass("hidden-text");
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
      $(".back").prop("disabled", true);
      hideRegistrationCollege();
      $(".back").prop("disabled", false);
      return;
    }
    //prevent double click
    $(".back").prop("disabled", true);
    //update reg menu
    $("#reg-menu-"+String(active_modal-1)).children(".reg-menu-bold").removeClass("hidden-text");
    $("#reg-menu-"+String(active_modal)).children(".reg-menu-bold").addClass("hidden-text");
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

  var reg_menu_click = false;
  //reg menu navigation
  $(".reg-menu-item").on("click", function(){
    if (reg_menu_click) {
      return;
    }
    if (active_modal==1 && has_selected_categ==false){
      $(".error-message").css({'opacity' : 1});
      return;
    }
    var item_no = String($(this).prop("id")).split("-").pop();
    //prevent double click
    reg_menu_click = true;
    //update reg menu
    $("#reg-menu-"+String(item_no)).children(".reg-menu-bold").removeClass("hidden-text");
    $("#reg-menu-"+String(active_modal)).children(".reg-menu-bold").addClass("hidden-text");
    //push down current active
    $("#college-"+String(active_modal)).addClass("phase-out");
    $("#college-"+String(active_modal)).removeClass("active");
    //elevate hidden next page and enable
    $("#college-"+String(item_no)).addClass("active");
    $("#college-"+String(item_no)).removeClass("no-display");
    setTimeout(function(){
      $("#college-"+String(item_no)).removeClass("hidden");
      //disable non-visible formerly active page
      $("#college-"+String(active_modal)).addClass("hidden");
      $("#college-"+String(active_modal)).removeClass("phase-out");

      setTimeout(function(){
        $("#college-"+String(active_modal)).addClass("no-display");
        active_modal = item_no;
        reg_menu_click = false;
      }, 500);

    }, 10);
  });
});
