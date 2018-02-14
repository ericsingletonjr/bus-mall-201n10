'use strict';

var totalClicks = 0;
ImageGetter.all = [];
var images = [];
var compare = [];
var compare2 = [];
var randomIndex = [];

function ImageGetter(name, path){
  this.name = name;
  this.path = path;
  this.clicked = 0;
  this.viewed = 0;
  ImageGetter.all.push(this);
}

new ImageGetter('Bag', 'img/bag.jpg');
new ImageGetter('Banana', 'img/banana.jpg');
new ImageGetter('Bathroom', 'img/bathroom.jpg');
new ImageGetter('Boots', 'img/boots.jpg');
new ImageGetter('Breakfast', 'img/breakfast.jpg');
new ImageGetter('Bubblegum', 'img/bubblegum.jpg');
new ImageGetter('Chair', 'img/chair.jpg');
new ImageGetter('Cthulhu', 'img/cthulhu.jpg');
new ImageGetter('Dog-duck', 'img/dog-duck.jpg');
new ImageGetter('Dragon', 'img/dragon.jpg');
new ImageGetter('Pen', 'img/pen.jpg');
new ImageGetter('Pet-sweep', 'img/pet-sweep.jpg');
new ImageGetter('Tauntaun', 'img/tauntaun.jpg');
new ImageGetter('Unicorn', 'img/unicorn.jpg');
new ImageGetter('Usb', 'img/usb.gif');
new ImageGetter('Water-can', 'img/water-can.jpg');
new ImageGetter('Wine-glass', 'img/wine-glass.jpg');

for(var i = 0; i < 3; i++) images.push(document.getElementById('img'+(i+1)));

var eventArea = document.getElementById('images');
eventArea.addEventListener('click', imageDisplay);

function chartDisplay() {
  var ctx = document.getElementById('chart').getContext('2d');
  var data = [];
  var labels = [];
  for(var i = 0; i < ImageGetter.all.length; i++) {
    data.push(ImageGetter.all[i].clicked);
    labels.push(ImageGetter.all[i].name);
  }

  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '# of votes',
        data: data,
        backgroundColor: 'black'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function imageDisplay() {
  var indexRand = 0;
  for(var k = 0; k < images.length; k++) compare2[k] = images[k].src;
  for(var i = 0; i < images.length; i++) {
    indexRand = Math.floor(Math.random()*ImageGetter.all.length);
    images[i].src = ImageGetter.all[indexRand].path;
    for(var j = 0; j < images.length; j++){
      if(compare2[j] === images[i].src || compare[j] === images[i].src) {
        console.log('Duplicate');
        if(i === 0) {
          do{
            indexRand = Math.floor(Math.random()*ImageGetter.all.length);
            images[0].src = ImageGetter.all[indexRand].path;
          } while (indexRand === randomIndex[0]);
        } else i--;
        break;
      }
    }
    compare[i] = images[i].src;
    randomIndex[i] = indexRand;
  }
  for(i = 0; i < images.length; i++) {
    ImageGetter.all[randomIndex[i]].viewed++;
  }
  images[0].onclick = function (){
    ImageGetter.all[randomIndex[0]].clicked++;
    totalClicks++;
  };
  images[1].onclick = function (){
    ImageGetter.all[randomIndex[1]].clicked++;
    totalClicks++;
  };
  images[2].onclick = function (){
    ImageGetter.all[randomIndex[2]].clicked++;
    totalClicks++;
  };
  if(totalClicks === 25) {
    var resultElement = document.getElementById('results');
    var resultTitle = document.createElement('h1');
    resultTitle.textContent = 'Results';
    var ulElement = document.createElement('ul');
    resultElement.appendChild(resultTitle);
    resultElement.appendChild(ulElement);
    for(i = 0; i < ImageGetter.all.length; i++) {
      var liElement = document.createElement('li');
      liElement.textContent = ImageGetter.all[i].name + ' voted: ' + ImageGetter.all[i].clicked + ' and viewed ' + ImageGetter.all[i].viewed + ' time(s)';
      ulElement.appendChild(liElement);
      chartDisplay();
    }
    eventArea.removeEventListener('click',imageDisplay);
  }
}
imageDisplay();