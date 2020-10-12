const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let futureDate = new Date(2020,09,01,12,3,0);
let currentDate = new Date();
let offset = futureDate-currentDate;


const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];
const date = futureDate.getDate();

let day = futureDate.getDay();
day = weekdays[day];

giveaway.textContent = `giveaway ends on ${day} ${date} ${month} ${year} ${hours}:${minutes}am`;

console.log(deadline);
//future time in ms

const futureTime = futureDate.getTime();

function getRemainingTime(){
  const today = new Date().getTime();
  const t = futureTime - today
  //1s = 1000ms
  //1m = 60sdeadline
  //1hr = 60min
  //1day = 24hr
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  //calculate values 
  let days = Math.floor(t/oneDay);
  let hours = Math.floor(t % oneDay / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  //set value array
  const values = [days,hours,minutes,seconds];
  items.forEach(function(item,index){
    item.innerHTML = values[index];
  });
  console.log(t);
  if(t < 1000){
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired!</h4>`;
  }
}

let countdown = setInterval(getRemainingTime,1000);

getRemainingTime();