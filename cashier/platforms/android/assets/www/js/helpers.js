function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

function repeatVibrate(amount) {

  for(r = 0; r < 5; r++) {
    navigator.vibrate(amount);
    //10 seconds
    wait(10000);
  }

}

