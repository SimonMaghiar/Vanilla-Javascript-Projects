const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");


slides.forEach(function(slide,index){
    console.log(index);
    slide.style.left = `${index * 100}%`;
});

let counter = 0;
nextBtn.addEventListener("click",function(){
    counter++;
    if(counter > slides.length - 1){
        counter = 0;
    }
    carouse(counter);
});

prevBtn.addEventListener("click",function(){
    counter--;
    if(counter < 0)
    {
        counter = slides.length-1;
    }
    carouse(counter);
});

function carouse(){
    slides.forEach(function(slide){
        slide.style.transform = `translateX(-${counter*100}%)`;
    });
}