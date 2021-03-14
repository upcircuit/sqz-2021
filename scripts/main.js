var active_modal = 1;
var has_selected_categ = false;
var is_qb = false;
var is_mobile = false;
var is_college = true;
var college_qb_action = "https://docs.google.com/forms/u/0/d/e/1FAIpQLScIvbb_-of4rA-LrE1CBiwmv8q17wqXG-zA1shkQ9k9h_JKWA/formResponse";
var college_td_action = "https://docs.google.com/forms/u/0/d/e/1FAIpQLScVICy4aNPtTJbcYuoY_k942VUeZvsf_1Ic11IfpLl5OO-dkA/formResponse";
var highschool_ws_action = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeSLj2_oy6xtJ632HA3FDN65wBQSZYO7rC91FiMaN4TU1GqRg/formResponse";
var highschool_qb_action = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeK_Gw5G1nmQ3gFbN2DKmzAcezqmTDwvDwyUszUXJMoBylh7w/formResponse";
var visible_teams = 1;
var visible_coach = 1;
var i;
var furthest_visit = 1;
// Summary of Form Details before Submit
var ids = [
  "schoolname", "schoolad", "schoolno",

  "c1name", "c1no", "c1mail",
  "c2name", "c2no", "c2mail",

  "t1_s1name", "t1_s1course", "t1_s1no", "t1_s1mail",
  "t1_s2name", "t1_s2course", "t1_s2no", "t1_s2mail",
  "t1_s3name", "t1_s3course", "t1_s3no", "t1_s3mail",

  "t2_s1name", "t2_s1course", "t2_s1no", "t2_s1mail",
  "t2_s2name", "t2_s2course", "t2_s2no", "t2_s2mail",
  "t2_s3name", "t2_s3course", "t2_s3no", "t2_s3mail",

  "t3_s1name", "t3_s1course", "t3_s1no", "t3_s1mail",
  "t3_s2name", "t3_s2course", "t3_s2no", "t3_s2mail",
  "t3_s3name", "t3_s3course", "t3_s3no", "t3_s3mail",

  "ws_sname", "ws_scourse", "ws_sno", "ws_smail",
]

$( document ).ready(function() {

  if ($(".registration-container").length){
    reg_page();
  }else{
    ;
  }

});

//REG PAGE BEHAVIOUR

function reg_page(){
  $.validator.addMethod( "lettersonly", function( value, element ) {
    return this.optional( element ) || /^[a-z]+$/i.test( value );
    }, "Letters only please."
  );

  $.validator.addMethod( "phphonenumber", function( value, element ) {
    return this.optional( element ) || /^[0][9]\d{9}$/i.test( value );
    }, "Please enter a phone number in the given PH format."
  );

  $.validator.addMethod( "phlandline", function( value, element ) {
    return this.optional( element ) || /^[0][2][ ]\d{8}|\d{3}[ ]\d{7}$/i.test( value );
    }, "Please enter a phone number in the given PH format."
  );

  $.validator.addMethod( "address", function( value, element ) {
    return this.optional( element ) || /^[a-z 0-9.]+[,][ ][a-z 0-9.]+[,][ ][a-z 0-9.]+$/i.test( value );
    }, "Please enter an address in the given format."
  );

  $.validator.addMethod( "studentnumber", function( value, element ) {
    return this.optional( element ) || /^[2][0]\d{2}-\d{5}$/i.test( value );
    }, "Please enter a student number in the given format."
  );

  $.validator.addMethod( "fullname", function( value, element ) {
    return this.optional( element ) || /^[a-z 0-9.]+[,][ ][a-z 0-9.]+[,][ ][a-z 0-9.]+$/i.test( value );
    }, "Please enter your full name as shown, with commas and spaces to separate."
  );

  $.validator.addMethod("course", function( value, element ) {
    return this.optional( element ) || /^[0-9][ ][-][ ][B][A-Z]?[ ][a-zA-Z ]+$/i.test( value );
  }, "Please enter your course as shown."
  );

  $("#reg-form").validate({
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
    address:true,
    messages: {
      required: "Please enter your school address.",
      address: "Please enter a valid address following the format.",
    }
  });

  $("#schoolno").rules("add", {
    required: true,
    phlandline: true,
    messages: {
      required: "Please enter your school phone number.",
      phphonenumber: "Please enter a valid contact number in the given format."
    }
  });

  $("#c1name").rules("add", {
    required: true,
    minlength:2,
    fullname: true,
    messages: {
      required: "Please enter your Full Name.",
      fullname: "Please follow the provided format"
    }
  });

  $("#c1no").rules("add", {
    required: true,
    phphonenumber: true,
    messages: {
      phphonenumber: "Please enter a valid contact number in the given format."
    }
  });

  $("#c1mail").rules("add", {
    required: true,
    email: true,
    messages: {
      required: "Please enter your email address.",
      mail: "Please enter a valid email address in the given format."
    }
  });

  $("#c2name").rules("add", {
    required: {
      depends:function(element){
        return (visible_coach == 2);
      }
    },
    fullname: {
      depends:function(element){
        return (visible_coach == 2);
      }
    },
    messages: {
      required: "Please enter your Full Name.",
      fullname: "Please follow the provided format"
    }
  });

  $("#c2no").rules("add", {
    required: {
      depends:function(element){
        return (visible_coach == 2);
      }
    },
    phphonenumber: {
      depends:function(element){
        return (visible_coach == 2);
      }
    },
    messages: {
      phphonenumber: "Please enter a valid contact number in the given format."
    }
  });

  $("#c2mail").rules("add", {
    required: {
      depends:function(element){
        return (visible_coach == 2);
      }
    },
    email: {
      depends:function(element){
        return (visible_coach == 2);
      }
    },
    messages: {
      required: "Please enter your email address.",
      mail: "Please enter a valid email address in the given format."
    }
  });

  //TEAM 1

  $("#t1_s1name").rules("add", {
    required: true,
    fullname: true,
    messages: {
      required: "Please enter your Full Name.",
      fullname: "Please follow the provided format"
    }
  });

  $("#t1_s1course").rules("add", {
    required: true,
    course:true,
    messages: {
      required: "Please enter your course."
    }
  });

  $("#t1_s1no").rules("add", {
    required: true,
    phphonenumber: true,
    messages: {
      phphonenumber: "Please enter a valid contact number in the given format."
    }
  });

  $("#t1_s1mail").rules("add", {
    required: true,
    email: true
  });

  $("#t1_s2name").rules("add", {
    required: true,
    fullname: true,
    messages: {
      required: "Please enter your Full Name.",
      fullname: "Please follow the provided format"
    }
  });

  $("#t1_s2course").rules("add", {
    required: true,
    course:true
  });

  $("#t1_s2no").rules("add", {
    required: true,
    phphonenumber: true,
    messages: {
      phphonenumber: "Please enter a valid contact number in the given format."
    }
  });

  $("#t1_s2mail").rules("add", {
    required: true,
    email: true
  });


  $("#t1_s3name").rules("add", {
    required: true,
    fullname: true,
    messages: {
      required: "Please enter your Full Name.",
      fullname: "Please follow the provided format"
    }
  });

  $("#t1_s3course").rules("add", {
    required: true,
    course:true
  });

  $("#t1_s3no").rules("add", {
    required: true,
    phphonenumber: true,
  });

  $("#t1_s3mail").rules("add", {
    required: true,
    email: true
  });

  //TEAM 2
  $("#t2_s1name").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams >= 2);
      }
    },
    fullname: {
      depends:function(element){
        return (visible_teams >= 2);
      }
    },
    messages: {
      required: "Please enter your Full Name.",
      fullname: "Please follow the provided format"
    }
  });

  $("#t2_s1course").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams >= 2);
      }
    },
    course:{
      depends:function(element){
        return (visible_teams >= 2);
      }
    },
    messages: {
      required: "Please enter your course."
    }
  });

  $("#t2_s1no").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams >= 2);
      }
    },
    phphonenumber: {
      depends:function(element){
        return (visible_teams >= 2);
      }
    },
    messages: {
      phphonenumber: "Please enter a valid contact number in the given format."
    }
  });

  $("#t2_s1mail").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams >= 2);
      }
    },
    email: {
      depends:function(element){
        return (visible_teams >= 2);
      }
    }
  });

  $("#t2_s2name").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams >= 2);
      }
    },
    fullname: {
      depends:function(element){
        return (visible_teams >= 2);
      }
    },
    messages: {
      required: "Please enter your Full Name.",
      fullname: "Please follow the provided format"
    }
  });

  $("#t2_s2course").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams >= 2);
      }
    },
    course:{
      depends:function(element){
        return (visible_teams >= 2);
      }
    }
  });

  $("#t2_s2no").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams >= 2);
      }
    },
    phphonenumber: {
      depends:function(element){
        return (visible_teams >= 2);
      }
    },
    messages: {
      phphonenumber: "Please enter a valid contact number in the given format."
    }
  });

  $("#t2_s2mail").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams >= 2);
      }
    },
    email: {
      depends:function(element){
        return (visible_teams >= 2);
      }
    }
  });

  $("#t2_s3name").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams >= 2);
      }
    },
    fullname: {
      depends:function(element){
        return (visible_teams >= 2);
      }
    },
    messages: {
      required: "Please enter your Full Name.",
      fullname: "Please follow the provided format"
    }
  });

  $("#t2_s3course").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams >= 2);
      }
    },
    course:{
      depends:function(element){
        return (visible_teams >= 2);
      }
    }
  });

  $("#t2_s3no").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams >= 2);
      }
    },
    phphonenumber: {
      depends:function(element){
        return (visible_teams >= 2);
      }
    },
  });

  $("#t2_s3mail").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams >= 2);
      }
    },
    email: {
      depends:function(element){
        return (visible_teams >= 2);
      }
    }
  });

  $("#t3_s1name").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams == 3);
      }
    },
    fullname: {
      depends:function(element){
        return (visible_teams == 3);
      }
    },
    messages: {
      required: "Please enter your Full Name.",
      fullname: "Please follow the provided format"
    }
  });

  $("#t3_s1course").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams == 3);
      }
    },
    course:{
      depends:function(element){
        return (visible_teams == 3);
      }
    },
    messages: {
      required: "Please enter your course."
    }
  });

  $("#t3_s1no").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams == 3);
      }
    },
    phphonenumber: {
      depends:function(element){
        return (visible_teams == 3);
      }
    },
    messages: {
      phphonenumber: "Please enter a valid contact number in the given format."
    }
  });

  $("#t3_s1mail").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams == 3);
      }
    },
    email: {
      depends:function(element){
        return (visible_teams == 3);
      }
    }
  });

  $("#t3_s2name").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams == 3);
      }
    },
    fullname: {
      depends:function(element){
        return (visible_teams == 3);
      }
    },
    messages: {
      required: "Please enter your Full Name.",
      fullname: "Please follow the provided format"
    }
  });

  $("#t3_s2course").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams == 3);
      }
    },
    course:{
      depends:function(element){
        return (visible_teams == 3);
      }
    }
  });

  $("#t3_s2no").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams == 3);
      }
    },
    phphonenumber: {
      depends:function(element){
        return (visible_teams == 3);
      }
    },
    messages: {
      phphonenumber: "Please enter a valid contact number in the given format."
    }
  });

  $("#t3_s2mail").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams == 3);
      }
    },
    email: {
      depends:function(element){
        return (visible_teams == 3);
      }
    }
  });

  $("#t3_s3name").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams == 3);
      }
    },
    fullname: {
      depends:function(element){
        return (visible_teams == 3);
      }
    },
    messages: {
      required: "Please enter your Full Name.",
      fullname: "Please follow the provided format"
    }
  });

  $("#t3_s3course").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams == 3);
      }
    },
    course:{
      depends:function(element){
        return (visible_teams == 3);
      }
    }
  });

  $("#t3_s3no").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams == 3);
      }
    },
    phphonenumber: {
      depends:function(element){
        return (visible_teams == 3);
      }
    },
  });

  $("#t3_s3mail").rules("add", {
    required: {
      depends:function(element){
        return (visible_teams == 3);
      }
    },
    email: {
      depends:function(element){
        return (visible_teams == 3);
      }
    }
  });

  //STUDENT REGISTRATION

    $("#ws_sname").rules("add", {
      required: true,
      fullname: true,
      messages: {
        required: "Please enter your Full Name.",
        fullname: "Please follow the provided format"
      }
    });

    $("#ws_scourse").rules("add", {
      required: true,
      course:true,
      messages: {
        required: "Please enter your course."
      }
    });

    $("#ws_sno").rules("add", {
      required: true,
      phphonenumber: true,
      messages: {
        phphonenumber: "Please enter a valid contact number in the given format."
      }
    });

    $("#ws_smail").rules("add", {
      required: true,
      email: true
    });

  $("#college-select").on("click",function(){
    is_college = true;
    showRegistration();
    if (is_mobile) {
      alert("We recommend the use of a Laptop/PC when filling up the registration form.")
    }
  });

  $("#hs-select").on("click",function(){
    is_college = false;
    showRegistration();
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
      //case: incorrect form
      if (active_modal > 2 &&
        !validate_page(active_modal)
      ){
        return;
      }
      //update summary page
      for (i = 0; i < ids.length; i++) {
        if (!$("#"+ids[i]).val()) {
          $("."+ids[i]+"-label").hide();
          $("."+ids[i]+"-data").hide();
        } else {
          $("."+ids[i]+"-label").show();
          $("."+ids[i]+"-data").show();
        }
        $("."+ids[i]+"-data").text($("#"+ids[i]).val());
      }
      //case: going to confirmation
      if (active_modal==5){
        showConfimationCollege();
        return;
      }
      //prevent double click
      $(".next").prop("disabled", true);
      //update reg menu
      $("#reg-menu-"+String(active_modal+1)).children(".reg-menu-bold").removeClass("hidden-text");
      $("#reg-menu-"+String(active_modal)).children(".reg-menu-bold").addClass("hidden-text");
      //push down current active
      $("#modal-"+String(active_modal)).addClass("phase-out");
      $("#modal-"+String(active_modal)).removeClass("active");
      //elevate hidden next page and enable
      $("#modal-"+String(active_modal+1)).addClass("active");
      $("#modal-"+String(active_modal+1)).removeClass("no-display");
      setTimeout(function(){
        $("#modal-"+String(active_modal+1)).removeClass("hidden");
        //disable non-visible formerly active page
        $("#modal-"+String(active_modal)).addClass("hidden");
        $("#modal-"+String(active_modal)).removeClass("phase-out");

        setTimeout(function(){
          $("#modal-"+String(active_modal)).addClass("no-display");
          active_modal +=1;
          $(".next").prop("disabled", false);
          //update reg menu visit locations
          furthest_visit = Math.max(active_modal, furthest_visit);
          $("#reg-menu-"+active_modal).removeClass("unvisited");
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
    $("#modal-"+String(active_modal)).addClass("phase-out");
    $("#modal-"+String(active_modal)).removeClass("active");
    //elevate hidden next page and enable
    $("#modal-"+String(active_modal-1)).addClass("active");
    $("#modal-"+String(active_modal-1)).removeClass("no-display");
    setTimeout(function(){
      $("#modal-"+String(active_modal-1)).removeClass("hidden");
      //disable non-visible formerly active page
      $("#modal-"+String(active_modal)).addClass("hidden");
      $("#modal-"+String(active_modal)).removeClass("phase-out");
      setTimeout(function(){
        $("#modal-"+String(active_modal)).addClass("no-display");
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
    //make appropriate qualification data visible
    $("#quali-qb").css({'opacity' : 1});
    $("#quali-td").css({'opacity' : 0});
    $("#quali-qb-hs").css({'opacity' : 0});
    $("#quali-ws").css({'opacity' : 0});
    $(".error-message").css({'opacity' : 0});
    $(".event-data").text("College Quiz Bee")
    //hold selection
    $("#college-qb-select").addClass("active-choice")
    $("#college-td-select").removeClass("active-choice")
    //swap student/team reg
    disableWS();
  });

  $("#college-td-select").on("click", function(){
    is_qb = false; //use this to set target URL later.
    has_selected_categ = true;
    //make appropriate qualification data visible
    $("#quali-qb").css({'opacity' : 0});
    $("#quali-td").css({'opacity' : 1});
    $("#quali-qb-hs").css({'opacity' : 0});
    $("#quali-ws").css({'opacity' : 0});
    $(".error-message").css({'opacity' : 0});
    $(".event-data").text("Technological Design Contest")
    //hold selection
    $("#college-qb-select").removeClass("active-choice")
    $("#college-td-select").addClass("active-choice")
    //swap student/team reg
    disableWS();

  });

  $("#hs-qb-select").on("click", function(){
    is_qb = true; //use this to set target URL later.
    has_selected_categ = true;
    //make appropriate qualification data visible
    $("#quali-qb-hs").css({'opacity' : 1});
    $("#quali-td").css({'opacity' : 0});
    $("#quali-qb").css({'opacity' : 0});
    $("#quali-ws").css({'opacity' : 0});
    $(".error-message").css({'opacity' : 0});
    $(".event-data").text("High School Quiz Bee")
    //swap student/team reg
    disableWS();
    //hold selection
    $("#hs-qb-select").addClass("active-choice")
    $("#hs-ws-select").removeClass("active-choice")
  });

  $("#hs-ws-select").on("click", function(){
    is_qb = false; //use this to set target URL later.
    has_selected_categ = true;
    //make appropriate qualification data visible
    $("#quali-qb-hs").css({'opacity' : 0});
    $("#quali-td").css({'opacity' : 0});
    $("#quali-qb").css({'opacity' : 0});
    $("#quali-ws").css({'opacity' : 1});
    $(".error-message").css({'opacity' : 0});
    $(".event-data").text("Workshop")
    //swap student/team reg
    enableWS();
    //hold selection
    $("#hs-qb-select").removeClass("active-choice")
    $("#hs-ws-select").addClass("active-choice")
  });

  $("#addteam").on('click', function(){
    if (visible_teams == 3){
      return;
    }
    $("#team-" + String(visible_teams+1)).removeClass("no-display");
    visible_teams+=1;
  });

  $("#removeteam").on('click', function(){
    if (visible_teams == 1){
      return;
    }
    $("#team-" + String(visible_teams)).addClass("no-display");
    $("#team-" + String(visible_teams)).find("input").val('');
    visible_teams-=1;
  });

  $("#addcoach").on('click', function(){
    if (visible_coach == 2){
      return;
    }
    $("#coach-" + String(visible_coach+1)).removeClass("no-display");
    visible_coach+=1;
  });

  $("#removecoach").on('click', function(){
    if (visible_coach == 1){
      return;
    }
    $("#coach-" + String(visible_coach)).find("input").val('');
    $("#coach-" + String(visible_coach)).addClass("no-display");
    visible_coach-=1;
  });

  var reg_menu_click = false;
  //reg menu navigation
  $(".reg-menu-item").on("click", function(){
    //if in progress, do not interrupt.
    if (reg_menu_click) {
      return;
    }
    if (active_modal==1 && has_selected_categ==false){
      $(".error-message").css({'opacity' : 1});
      return;
    }
    var item_no = parseInt(String($(this).prop("id")).split("-").pop());
    //if already there, do nothing.
    if (active_modal==item_no){
      return;
    }
    //do not skip.
    if (item_no > furthest_visit){
      return;
    }
    //prevent double click
    reg_menu_click = true;
    //update reg menu
    $("#reg-menu-"+String(item_no)).children(".reg-menu-bold").removeClass("hidden-text");
    $("#reg-menu-"+String(active_modal)).children(".reg-menu-bold").addClass("hidden-text");
    //push down current active
    $("#modal-"+String(active_modal)).addClass("phase-out");
    $("#modal-"+String(active_modal)).removeClass("active");
    //elevate hidden next page and enable
    $("#modal-"+String(item_no)).addClass("active");
    $("#modal-"+String(item_no)).removeClass("no-display");
    setTimeout(function(){
      $("#modal-"+String(item_no)).removeClass("hidden");
      //disable non-visible formerly active page
      $("#modal-"+String(active_modal)).addClass("hidden");
      $("#modal-"+String(active_modal)).removeClass("phase-out");

      setTimeout(function(){
        $("#modal-"+String(active_modal)).addClass("no-display");
        active_modal = parseInt(item_no);
        reg_menu_click = false;
      }, 500);

    }, 10);
  });

  $("#qb_part").on("click", function(){
    $("#qb_notpart").prop("checked", false);
  });

  $("#qb_notpart").on("click", function(){
    $("#qb_part").prop("checked", false);
  });

  $("#submit").on("click", function(){
    //prevent double click
    $("#submit").prop("disabled", true);
    if(is_college){
      if (is_qb){
        $("#reg-form").prop("action", college_qb_action);
      }else {
        $("#reg-form").prop("action", college_td_action);
      }
    }else {
      if (is_qb){
        $("#reg-form").prop("action", highschool_qb_action);
      }else {
        $("#reg-form").prop("action", highschool_ws_action);
      }
    }

    if($("#reg-form").valid() &&
        document.getElementById('verifycheck').checked){
      $("#reg-form").submit();
      //transition here.
      $("#feedback").removeClass("no-display");
      setTimeout(function(){
        $("#reg-confirm").addClass("hidden");
        $("#feedback").removeClass("hidden");
        setTimeout(function(){
          $("#reg-confirm").addClass("no-display");
        }, 500);
      }, 10);
    }else{
      $("#submit").prop("disabled", false);
    }
  });
}

function showConfimationCollege() {
  $("#reg-confirm").removeClass("no-display");
  $(".confirm-buttons").removeClass("no-display");
  setTimeout(function(){
    $("#reg-confirm").removeClass("hidden");
    $(".confirm-buttons").removeClass("hidden");
    $(".reg-input").addClass("hidden");
    $(".modal-nav").addClass("hidden");
    setTimeout(function(){
      $(".reg-input").addClass("no-display");
      $(".modal-nav").addClass("no-display");
    }, 500);
  }, 10);
}

function hideConfimationCollege() {
  $(".modal-nav").removeClass("no-display");
  $(".reg-input").removeClass("no-display");
  setTimeout(function(){
    $(".modal-nav").removeClass("hidden");
    $(".reg-input").removeClass("hidden");
    $("#reg-confirm").addClass("hidden");
    $(".confirm-buttons").addClass("hidden");
    setTimeout(function(){
      $("#reg-confirm").addClass("no-display");
      $(".confirm-buttons").addClass("no-display");
    }, 500);
  }, 10);
}

function showRegistration(){
  if (is_college){
    $("#reg-header").text("COLLEGE DIVISION REGISTRATION");
    $("#college-qb-select").parent().removeClass("no-display");
    $("#college-td-select").parent().removeClass("no-display");
    $("#hs-qb-select").parent().addClass("no-display");
    $("#hs-ws-select").parent().addClass("no-display");
  }else {
    $("#reg-header").text("HIGH SCHOOL DIVISION REGISTRATION");
    $("#college-qb-select").parent().addClass("no-display");
    $("#college-td-select").parent().addClass("no-display");
    $("#hs-qb-select").parent().removeClass("no-display");
    $("#hs-ws-select").parent().removeClass("no-display");
  }
  active_modal = 1;
  $("#bg-1").removeClass("no-display");
  $("#registration").removeClass("no-display");
  $("#modal-"+active_modal).removeClass("no-display");
  setTimeout(function(){
    $("#bg-1").removeClass("hidden");
    $("#registration").removeClass("hidden");
    $(".intro-slide-container").addClass("no-display");
    $(".intro-slide-container").addClass("hidden");
    $("#modal-"+active_modal).removeClass("hidden");
    $("#modal-"+active_modal).addClass("active");
    $("#reg-menu-"+String(active_modal)).children(".reg-menu-bold").removeClass("hidden-text");
  }, 50);
}

function hideRegistrationCollege(){
  $("#bg-1").addClass("hidden");
  $("#registration").addClass("hidden");
  $("#modal-"+active_modal).addClass("hidden");
  setTimeout(function(){
    $("#bg-1").addClass("no-display");
    $("#registration").addClass("no-display");
    $(".intro-slide-container").removeClass("no-display");
    setTimeout(function(){
      $(".intro-slide-container").removeClass("hidden");
      $("#modal-"+active_modal).removeClass("active");
      $("#reg-menu-"+String(active_modal)).children(".reg-menu-bold").addClass("hidden-text");
      active_modal = 1;
      furthest_visit = 1;
      $(".reg-menu").children("li").addClass("unvisited");
      $("#reg-menu-1").removeClass("unvisited");
    }, 10);
  }, 500);
}

function enableWS(){
  $("#team-reg").addClass("no-display");
  $("#student-reg").removeClass("no-display");
  $("#student-reg").find('input').prop('disabled', false);
  $("#team-reg").find('input').prop('disabled', true);
  $(".team-data").addClass("no-display");
  $(".student-data").removeClass("no-display");
}

function disableWS(){
  $("#student-reg").addClass("no-display");
  $("#team-reg").removeClass("no-display");
  $("#team-reg").find('input').prop('disabled', false);
  $("#student-reg").find('input').prop('disabled', true);
  $(".student-data").addClass("no-display");
  $(".team-data").removeClass("no-display");
}

function validate_page(page){
  //yes, it should just be one var &&= to all, but that doesn't work somehow
  var temp = true;
  var i = 0;
  var flag = true;
  if (page == 3){
    for (i = 0; i <= 2; i++){
      temp = $("#reg-form").data('validator').element("#"+ids[i]);
      flag &&=temp;
    }
  }else if (page == 4){
    //if both coaches are visible, validate all coach fields.
    for (i = 3; i <= (visible_coach==2 ? 8 : 5); i++){
      temp = $("#reg-form").data('validator').element("#"+ids[i]);
      flag &&=temp;
    }
  }else if (page == 5){
    if (is_college){
      for (i = 9; i <= 8 + 12*visible_teams; i++){
        temp = $("#reg-form").data('validator').element("#"+ids[i]);
        flag &&=temp;
      }
    }else {
      for (i = 45; i <= 48; i++){
        temp = $("#reg-form").data('validator').element("#"+ids[i]);
        flag &&=temp;
      }
    }
  }
  return flag;
}
