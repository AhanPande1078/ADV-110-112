prediction1 ="";
prediction2 ="";

camera = document.getElementById("camera");
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
Webcam.attach("#camera");
 
function takeSnapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='"+data_uri+"'>"
        
    });

}
console.log("ml5 version: "+ ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/w-cSf03Kr/model.json",modelLoaded);

function modelLoaded() 
{
console.log("Model is loaded");

}
function speak()
{
    synth = window.speechSynthesis;
    speakData1 = "The first prediction is that you are showing "+ predection1;
    speakData2 = "       And The second prediction is that you are showing "+ predection2;
    utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}
function check()
{
   img = document.getElementById("captured_image");
   classifier.classify(img,gotResult) 
}
function gotResult(error,result)
{
    if(error){
        console.error(error);
    
    }
    else{
        console.log(result);
        document.getElementById("result_emotion_name1").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        predection1 = result[0].label;
        predection2 = result[1].label;        
        speak();
        if(result[0].label == "Victory"){
            document.getElementById("update_emoji1").innerHTML = "&#9996;";
        }
        if(result[1].label == "Victory"){
            document.getElementById("update_emoji2").innerHTML = "&#9996;";
        }
        if(result[0].label == "Loser"){
            document.getElementById("update_emoji1").innerHTML = "&#128078;";
        }
        if(result[1].label == "Loser"){
            document.getElementById("update_emoji2").innerHTML = "&#128078;";
        }
        if(result[0].label == "Like"){
            document.getElementById("update_emoji1").innerHTML = "&#128077;";
        }
        if(result[1].label == "Like"){
            document.getElementById("update_emoji2").innerHTML = "&#128077;";
        }
        if(result[0].label == "Nice"){
            document.getElementById("update_emoji1").innerHTML = "&#128550;";
        }
        if(result[1].label == "Nice"){
            document.getElementById("update_emoji2").innerHTML = "&#128550;";
        }


    }}
