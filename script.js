console.log("hey");
var songIndex=0;
var audioElement= new Audio('songs/1.mp3');
var masterPlay=document.getElementById('play');
var myProgressBar=document.getElementById('progressbar');
var gif=document.getElementById('gif');
var songItem = Array.from(document.getElementsByClassName('songitem'));
var masterSongName=document.getElementById('masterSongName');

var songs=[
    {songName: "Faasle",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName: "do i wanna know",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songName: "electric love",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName: "way down we go",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName: "sagariya",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songName: "aao chalein",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
    {songName: "baarishein",filePath:"songs/7.mp3",coverPath:"covers/7.jpg"},
    {songName: "ghar",filePath:"songs/8.mp3",coverPath:"covers/8.jpg"},
    {songName: "",filePath:"songs/9.mp3",coverPath:"covers/9.jpg"},
    {songName: "abcd 10",filePath:"songs/10.mp3",coverPath:"covers/10.jpg"},

];

songItem.forEach((element,i)=>{
  
    
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
})

// handle playpause of progress bat
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity=1;
    }
    else{
            audioElement.pause();
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            gif.style.opacity=0;

        }
})

const makeAllPlays =()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{   /// doubt in this part
        console.log(e);                        /// e is short var reference for event objects
        console.log(e.target);
        
        songIndex= parseInt(e.target.id); // getting the song being played
        // e.target.classList.remove('fa-play');
        // e.target.classList.add('fa-pause');
        // audioElement.src = `songs/${songIndex+1}.mp3`;
        //console.log(audioElement.paused);

        if(audioElement.paused)
        {
           console.log("play");
        audioElement.src = `songs/${songIndex+1}.mp3`;

            makeAllPlays();
          songIndex= parseInt(e.target.id);
          e.target.classList.remove('fa-play');
          e.target.classList.add('fa-pause');
          //audioElement.src = `songs/${songIndex+1}.mp3`; /// CHECK THE MEANING OF THE SIGN AND DOLLAR =-----------<
          audioElement.currentTime=0;   // ****** CHECK IF CODE WORKS WITHOUT THIS LINE ALSO *****
          audioElement.play();
          gif.style.opacity=1;
          masterSongName.innerText=songs[songIndex].songName;
          masterPlay.classList.remove('fa-play');
          masterPlay.classList.add('fa-pause');
        }
        else
        {
            console.log("stop");
            audioElement.pause();
            makeAllPlays();
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            gif.style.opacity=0;
        }
        
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=8)
    {
      songIndex=0;
    }
    else
    {
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`; /// CHECK THE MEANING OF THE SIGN AND DOLLAR =-----------<
    audioElement.currentTime=0;   // ****** CHECK IF CODE WORKS WITHOUT THIS LINE ALSO *****
    audioElement.play();
    masterSongName.innerText=songs[songIndex].songName;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');

})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0)
    {
      songIndex=0;
    }
    else
    {
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`; /// CHECK THE MEANING OF THE SIGN AND DOLLAR =-----------<
    audioElement.currentTime=0;   // ****** CHECK IF CODE WORKS WITHOUT THIS LINE ALSO *****
    audioElement.play();
    masterSongName.innerText=songs[songIndex].songName;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');

})






// listen to events
audioElement.addEventListener('timeupdate',()=>
{

    // update the seekbar
     progress=parseInt((audioElement.currentTime/audioElement.duration)*100);    
     myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=(audioElement.duration*myProgressBar.value)/100;
})
