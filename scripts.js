// get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// functions
function togglePlay(){
  if(video.paused){
    video.play();
  }else{
    video.pause();
  }
}
function changeButton(){
  let icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip(){
  console.log(this.dataset);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRange(){
  video[this.name] = this.value;
  console.log(this.value);
}

function handleProgress(){
  let percent = (video.currentTime/video.duration)*100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
  if(e.offsetX){
    const scrubTime = (e.offsetX / progress.offsetWidth)*video.duration;
    video.currentTime = scrubTime;
  }else{
    addTocuchOffsets(e);
    const scrubTimes = (event.offsetX / progress.offsetWidth)*video.duration;
    video.currentTime = scrubTimes;
  }

}

function addTocuchOffsets(event) {
    var touch = event.touches[0] || event.changedTouches[0];
    var realTarget = document.elementFromPoint(touch.clientX, touch.clientY);
    event.offsetX = touch.clientX-realTarget.getBoundingClientRect().x;
    event.offsetY = touch.clientY-realTarget.getBoundingClientRect().y
    return event;
}
// hook up the events
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
window.addEventListener('keypress', e =>{
  if(e.code === 'Space'){
     togglePlay();
   }
  });
video.addEventListener('play', changeButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('pause', changeButton);
skipButtons.forEach(button => button.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('change',handleRange));
ranges.forEach(range => range.addEventListener('mousemove',handleRange));
ranges.forEach(range => range.addEventListener('touchmove',handleRange));
let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('touchmove', scrub);
progress.addEventListener('mousedown', ()=> mouseDown === true);
progress.addEventListener('mouseup', ()=> mouseDown === false);
progress.addEventListener('mousemove', ()=> {
  if(mouseDown){
    scrub();
  }
});
