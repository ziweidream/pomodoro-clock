$(document).ready(function() {
  var i = 25;
  var n = 5;
  var time = 0;
  var durationS = 0;
  var durationB = 0;
  var myTimer;
  var clock = $("#clock");
  var number_name = "zero one two three four five six seven eight nine".split(" ");
  var numbers = {};
  var positions = [
    "h1",
    "h2",
    ":",
    "m1",
    "m2",
    ":",
    "s1",
    "s2"
  ];
  var numbers_container = clock.find(".numbers");
  var show = clock.find(".show span");

  $("#plusS").click(function() {
    i++;
    if (i >= 1) {
      $("#lengthS").val(i);
    } else {
      $("#lengthS").val("1");
    }
  });

  $("#minusS").click(function() {
    i--;
    if (i >= 1) {
      $("#lengthS").val(i);
    } else {
      $("#lengthS").val("1");
    }
  });

  $("#plusB").click(function() {
    n++;
    if (n >= 1) {
      $("#lengthB").val(n);
    } else {
      $("#lengthB").val("1");
    }
  });
  $("#minusB").click(function() {
    n--;
    if (n >= 1) {
      $("#lengthB").val(n);
    } else {
      $("#lengthB").val("1");
    }
  });

  /* code on displaying digits on the clock was adapted from a tutorial on tutorialzine.com on 10/11/17:
https://tutorialzine.com/2013/06/digital-clock */
  $.each(positions, function() {
    if (this == ":") {
      numbers_container.append('<div class="dots">');
    } else {
      var pos = $("<div>");
      for (var i = 1; i < 8; i++) {
        pos.append('<span class="d' + i + '">');
      }
      numbers[this] = pos;
      numbers_container.append(pos);
    }
  });

  numbers.h1.attr("class", number_name[0]);
  numbers.h2.attr("class", number_name[0]);
  numbers.m1.attr("class", number_name[0]);
  numbers.m2.attr("class", number_name[0]);
  numbers.s1.attr("class", number_name[0]);
  numbers.s2.attr("class", number_name[0]);

  $("#startBtn").addClass("start");

  $("#startBtn").click(function() {
    if ($("#startBtn").hasClass("start")) {
      updateDisplay();
      $("#startBtn").removeClass("start");
    }
  });

  $("#pause").click(function() {
    if ($("#pause > span").hasClass("fa-pause")) {
      myTimer.pause();
      $("#pause > span").addClass("fa-play").removeClass("fa-pause");
    } else {
      if ($("#pause").hasClass("session")) {
        duration2 = 60 * $("#lengthB").val();
        if (duration2 == durationB) {
          myTimer.resume();
        } else {
          $("#pause").removeClass("session").addClass("break");
          updateDisplay();
        }
      } else if ($("#pause").hasClass("break")) {
        duration2 = 60 * $("#lengthS").val();
        if (duration2 == durationS) {
          myTimer.resume();
        } else {
          $("#pause").removeClass("break").addClass("session");
          updateDisplay();
        }
      }
      $("#pause > span").addClass("fa-pause").removeClass("fa-play");
    }
  });

  function updateDisplay() {
    if ($("#pause").hasClass("session")) {
      durationS = 60 * $("#lengthS").val();

      show.removeClass("active").eq(0).addClass("active");
      time = durationS * 1000;
      myTimer = initialTimer(durationS);
      $("#pause").removeClass("session").addClass("break");
    } else {
      durationB = 60 * $("#lengthB").val();

      show.removeClass("active").eq(1).addClass("active");
      time = durationB * 1000;
      myTimer = initialTimer(durationB);
      $("#pause").removeClass("break").addClass("session");
    }
    setTimeout(function() {
      updateDisplay();
    }, time);
  }

  function initialTimer(duration) {
    var startTime;
    var timer;
    var timerpiece = {};
    var timetotal = duration * 1000;

    timerpiece.resume = function() {
      startTime = new Date().getTime();
      timer = setInterval(timerpiece.step, 250);
    };
    timerpiece.pause = function() {
      timetotal = timerpiece.step();
      clearInterval(timer);
    };

    timerpiece.step = function() {
      var timeleft = Math.max(0, timetotal - (new Date().getTime() - startTime));
      var x = new Date(timeleft).toISOString().substr(11, 8);

      numbers.h1.attr("class", number_name[x[0]]);
      numbers.h2.attr("class", number_name[x[1]]);
      numbers.m1.attr("class", number_name[x[3]]);
      numbers.m2.attr("class", number_name[x[4]]);
      numbers.s1.attr("class", number_name[x[6]]);
      numbers.s2.attr("class", number_name[x[7]]);

      if (timeleft == 0) {
        clearInterval(timer);
        timerpiece.resume = function() {};
      }
      return timeleft;
    };
    timerpiece.resume();
    return timerpiece;
  }
});
