function toWords(number) {
  //is merely seconds, just return rounded numebr
  if (number < 120) {
    return getNumberWords(number, true) + " seconds";
  }
  var hour = 60 * 60;
  if (number < hour) {
    minutes = number / 60;
    return getNumberWords(minutes, true) + " minutes";
  }
  var day = hour * 24;
  if (number < 2 * day) {
    hours = number / hour;
    return getNumberWords(hours) + " hours";
  }
  var month = day * 30;
  if (number < month) {
    days = number / day;
    return getNumberWords(days) + " days";
  }
  var year = day * 365;
  if (number < year) {
    months = number / month;
    return getNumberWords(months) + " months";
  }
  var century = year * 100;
  if (number < century * 10) {
    years = number / year;
    return getNumberWords(years) + " years";
  }
  if (number < century * 100) {
    centuries = number / century;
    return getNumberWords(centuries) + " centuries";
  }
  years = number / year;
  return getNumberWords(years) + " years";
}

function getNumberWords(number, twoDP) {
  var numberWords = "";
  var trillion = Math.pow(10, 12);
  var billion = Math.pow(10, 9);
  var million = Math.pow(10, 6);
  var thousand = Math.pow(10, 4);
  var hundred = Math.pow(10, 3);
  while (number / trillion >= 1) {
    numberWords = " trillion " + numberWords;
    number = number / trillion;
  }
  while (number / billion >= 1) {
    numberWords = " billion " + numberWords;
    number = number / billion;
  }
  while (number / million >= 1) {
    numberWords = " million " + numberWords;
    number = number / million;
  }
  while (number / thousand >= 1) {
    numberWords = " thousand " + numberWords;
    number = number / thousand;
  }
  while (number / hundred >= 1) {
    numberWords = " hundred " + numberWords;
    number = number / hundred;
  }
  if (twoDP) {
    decimalPoint = 100;
  } else {
    decimalPoint = 1;
  }
  number = Math.round(number * decimalPoint) / decimalPoint;
  numberWords = number + numberWords;
  return numberWords;
}

function checkMyPassword(password) {
  var checked = zxcvbn(password);
  var time_to_crack = checked.crack_times_seconds.online_throttling_100_per_hour;
  var suggestions = checked.feedback.suggestions;
  var strength = password == "" ? 5 : checked.score;
  var time_to_crack_in_words = toWords(time_to_crack);

  document.getElementById("estimate").innerHTML = "<h1>" + time_to_crack_in_words + "</h1>";
  
  displayStrength(strength);
  displaySuggestions(suggestions);
  displayJoke(password, strength);
}

function displayJoke(password, strength) {
  if (password == "") {
    document.getElementById("joke").innerHTML = "";
    return;
  } 

  var joke = "";
  switch (strength) {
    case 0:
      joke =
        "  Oh my goodness, using that password is akin to hanging a 'Welcome Burglars' sign on your front door!  ";
      break;
    case 1:
      joke =
        " Whoops! Utilizing that password is like forgetting to take your key out of the lock when you leave home.";
      break;
    case 2:
      joke =
        " Ah, selecting that password is akin to locking your front door but leaving the spare key in the flowerpot next to it.  ";
      break;
    case 3:
      joke =
        " Good choice, using that password is like locking your front door and safeguarding the key in a high-security vault. ";
      break;
    case 4:
      joke =
        " Fantastic! Opting for that password is like fortifying your digital fortress with an ironclad defense system.";
      break;
  }

  document.getElementById("joke").innerHTML =
    '<span style="font-weight:bold">Review:</span> ' + joke;
}

function displaySuggestions(suggestions) {
  if (suggestions.length == 0) {
    document.getElementById("suggestions").innerHTML = "";
  } else {
    document.getElementById("suggestions").innerHTML = "<p>" + JSON.stringify(suggestions, null,2) + "</p>";
  }
}

function displayStrength(c) {
  var f = "Very Weak";
  var e = "e40808";

  if (c == 0) {
    f = "Very Weak";
  }
  if (c == 1) {
    f = "Weak";
    e = "e40808";
  }
  if (c == 2) {
    f = "Medium";
    e = "ffd800";
  }
  if (c == 3) {
    f = "Strong";
    e = "2cb117 ";
  }
  if (c == 4) {
    f = "Very Strong";
    e = "2cb117";
  }
  if (c == 5) {
    f = "No Password";
    e = "D0D0D0";
  }

  document.getElementById("complexity-span").innerHTML = f;
  document.getElementById("complexity").style.backgroundColor = "#" + e;
}
