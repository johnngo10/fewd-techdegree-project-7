const alertBanner = document.getElementById("alert");
const trafficCanvas = document.getElementById("traffic-chart");
const dailyCanvas = document.getElementById("daily-chart");
const mobileCanvas = document.getElementById("mobile-chart");
const userField = document.getElementById("userField");
const messageField = document.getElementById("messageField");
const send = document.getElementById("send");
const notification = document.getElementById("notification");
const notificationBell = document.querySelector(".notification-bell");
const trafficNav = document.querySelector(".traffic-nav");
const trafficNavLinks = document.getElementsByClassName("traffic-nav-link");
const autoUser = document.getElementById("autoUser");
const users = document.getElementsByClassName("users");

// notifications
notificationBell.addEventListener("click", e => {
  if (notification.style.display === "none") {
    notification.style.display = "block";
  } else if (notification.style.display !== "none") {
    notification.style.display = "none";
  }
});

// alert banner
alertBanner.innerHTML = `
<div class="alert-banner">
  <p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks to complete</p>
  <p class="alert-banner-close">x</p>
</div>
`;

alertBanner.addEventListener("click", e => {
  const element = e.target;
  if (element.classList.contains("alert-banner-close")) {
    alertBanner.style.display = "none";
  }
});

// traffic navs
for (var i = 0; i < trafficNavLinks.length; i++) {
  trafficNavLinks[i].addEventListener("click", e => {
    let nav = e.target;
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    nav.className += " active";
    // update data
    if (nav.textContent === "Hourly") {
      updateHourlyData();
    } else if (nav.textContent === "Daily") {
      updateDailyData();
    } else if (nav.textContent === "Weekly") {
      updateWeeklyData();
    } else if (nav.textContent === "Monthly") {
      updateMonthlyData();
    }
  });
}

// traffic chart

let trafficData = {
  labels: [
    "16-22",
    "23-29",
    "30-5",
    "6-12",
    "13-19",
    "20-26",
    "27-3",
    "4-10",
    "11-17",
    "18-24",
    "25-31"
  ],
  datasets: [
    {
      data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
      backgroundColor: `rgba(116, 119, 191, .3)`,
      borderWidth: 1
    }
  ]
};

let trafficOptions = {
  aspectRatio: 2.5,
  animation: {
    duration: 0
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  },
  legend: {
    display: false
  }
};

let trafficChart = new Chart(trafficCanvas, {
  type: "line",
  data: trafficData,
  options: trafficOptions
});

// updating traffic chart
function updateHourlyData() {
  trafficChart.data.datasets[0].data = [
    1000,
    1750,
    2250,
    2000,
    1500,
    1500,
    1850,
    1850,
    2250,
    1500,
    2500
  ];
  trafficChart.update();
}

function updateDailyData() {
  trafficChart.data.datasets[0].data = [
    2500,
    1500,
    2250,
    1850,
    2000,
    750,
    1000,
    1400,
    1200,
    500,
    2300
  ];
  trafficChart.update();
}

function updateWeeklyData() {
  trafficChart.data.datasets[0].data = [
    750,
    1250,
    1000,
    2000,
    1500,
    1750,
    1250,
    1850,
    2250,
    1500,
    2500
  ];
  trafficChart.update();
}

function updateMonthlyData() {
  trafficChart.data.datasets[0].data = [
    2500,
    1500,
    2250,
    1850,
    1250,
    1750,
    1500,
    2000,
    1000,
    1250,
    750
  ];
  trafficChart.update();
}

// daily chart
const dailyData = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [
    {
      label: `# of Hits`,
      data: [75, 115, 175, 125, 225, 200, 100],
      backgroundColor: `#7477BF`,
      borderWidth: 1
    }
  ]
};

const dailyOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  },
  legend: {
    display: false
  }
};

let dailyChart = new Chart(dailyCanvas, {
  type: "bar",
  data: dailyData,
  options: dailyOptions
});

// mobile chart
const mobileData = {
  labels: ["Desktop", "Tablet", "Phones"],
  datasets: [
    {
      label: "#of Users",
      data: [2000, 550, 500],
      borderWidth: 0,
      backgroundColor: ["#7477BF", "#78CF82", "#51B6C8"]
    }
  ]
};

const mobileOptions = {
  legend: {
    position: "right",
    labels: {
      boxWidth: 20,
      fontStyle: "bold"
    }
  }
};

let mobileChart = new Chart(mobileCanvas, {
  type: "doughnut",
  data: mobileData,
  options: mobileOptions
});

// messaging
send.addEventListener("click", e => {
  if (userField.value === "") {
    alert("Enter a user");
    e.preventDefault();
  } else if (messageField.value === "") {
    alert("Enter a message");
    e.preventDefault();
  } else if (userField.value === "" && messageField.value === "") {
    alert("Enter a user and a message");
    e.preventDefault();
  } else {
    alert("Message was sent!");
  }
});

// autocomplete search

// userField.addEventListener("input", e => {
//   let search = e.target.value.toLowerCase();
//   if (userField.value.length > 0) {
//     autoUser.style.display = "block";
//   } else if (userField.value.length === 0) {
//     autoUser.style.display = "none";
//   }

//   for (let i = 0; i < users.length; i++) {
//     let name = users[i].textContent.toLowerCase();
//     if (search.indexOf(name[i]) === -1) {
//       console.log(search);
//       users[i].style.display = "none";
//     } else if (search.indexOf(name[i]) > -1) {
//       users[i].style.display = "block";
//     }
//   }
// });

// save settings to local storage
const timezone = document.getElementById("timezone");
const switch1 = document.querySelector(".switch1");
const switch2 = document.querySelector(".switch2");
const save = document.getElementById("save");
const cancel = document.getElementById("cancel");

save.addEventListener("click", () => {
  if (timezone.value) {
    localStorage.setItem("timezone", timezone.selectedIndex);
    localStorage.setItem("switch1", switch1.checked);
    localStorage.setItem("switch2", switch2.checked);
    window.alert("Your settings have been saved");
    location.reload();
  }
});

// for loading
let timezoneVal = localStorage.getItem("timezone");
let checked1 = JSON.parse(localStorage.getItem("switch1"));
let checked2 = JSON.parse(localStorage.getItem("switch2"));

timezone.selectedIndex = timezoneVal;
switch1.checked = checked1;
switch2.checked = checked2;

// Reset settings
cancel.addEventListener("click", () => {
  location.reload();
  localStorage.clear();
  window.alert("Your settings have been resetted");
});
