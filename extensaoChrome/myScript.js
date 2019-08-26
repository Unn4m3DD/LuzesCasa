var ips = ["", "", ""];
var c_ip;
let req = url => {
  const Http = new XMLHttpRequest();
  Http.open("GET", url);
  Http.send();
};
let toggle = id => {
  if (id == 4 || id == 5) {
    for (let i of ips) {
      const url = i + id == 4 ? "/on" : "/off";
      rec(url);
    }
  } else {
    const url = ips[id] + "/toggle";
    rec(url);
  }
};
let config = id => {
  first_page.style.visibility = "hidden";
  config_page.style.visibility = "visible";
  c_ip = ips(id);
};
document.addEventListener("DOMContentLoaded", function() {
  var on = document.getElementById("on");
  var off = document.getElementById("off");
  var secretaria = document.getElementById("secretaria");
  var movel = document.getElementById("movel");
  var cama = document.getElementById("cama");
  var config_secretaria = document.getElementById("config_secretaria");
  var config_movel = document.getElementById("config_movel");
  var config_cama = document.getElementById("config_cama");
  var set = document.getElementById("set");
  var back = document.getElementById("back");
  var first_page = document.getElementById("first_page");
  var config_page = document.getElementById("config_page");
  var red_input_text = document.getElementById("red_input_text");
  var red_input_slider = document.getElementById("red_input_slider");
  var green_input_text = document.getElementById("green_input_text");
  var green_input_slider = document.getElementById("green_input_slider");
  var blue_input_text = document.getElementById("blue_input_text");
  var blue_input_slider = document.getElementById("blue_input_slider");
  red_input_slider.oninput = () => {
    red_input_text.value = red_input_slider.value;
    setBackgroundColor();
  };
  red_input_text.oninput = () => {
    red_input_slider.value = red_input_text.value;
    setBackgroundColor();
  };
  green_input_slider.oninput = () => {
    green_input_text.value = green_input_slider.value;
    setBackgroundColor();
  };
  green_input_text.oninput = () => {
    green_input_slider.value = green_input_text.value;
    setBackgroundColor();
  };
  blue_input_slider.oninput = () => {
    blue_input_text.value = blue_input_slider.value;
    setBackgroundColor();
  };
  blue_input_text.oninput = () => {
    blue_input_slider.value = blue_input_text.value;
    setBackgroundColor();
  };
  set.onclick = () => {
    req(
      c_ip +
        "/on/" +
        pad(red_input_slider.value) +
        pad(green_input_slider.value) +
        pad(blue_input_slider.value)
    );
  };
  on.addEventListener("click", () => {
    toggle(4);
  });
  off.addEventListener("click", () => {
    toggle(5);
  });
  config_secretaria.onclick = () => {
    config(0);
  };
  secretaria.addEventListener("click", () => {
    toggle(0);
  });
  config_movel.onclick = () => {
    config(1);
  };
  movel.addEventListener("click", () => {
    toggle(1);
  });
  config_cama.onclick = () => {
    config(2);
  };
  cama.addEventListener("click", () => {
    toggle(2);
  });
  back.onclick = () => {
    first_page.style.visibility = "visible";
    config_page.style.visibility = "hidden";
    red_input_slider.value = 255;
    green_input_slider.value = 255;
    blue_input_slider.value = 255;
    red_input_text.value = 255;
    green_input_text.value = 255;
    blue_input_text.value = 255;
    setBackgroundColor();
  };
});

var setBackgroundColor = opc => {
  document.getElementById("bck").style.backgroundColor =
    "rgb(" +
    red_input_slider.value +
    "," +
    green_input_slider.value +
    "," +
    blue_input_slider.value +
    ")";
};
function pad(str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}
