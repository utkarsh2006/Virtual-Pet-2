//Create variables here
var dog,dogimg,happydogimg,database,foods,foodstock;
var database;
var fedTime, lastFed,feed,addFood,foodObj;
function preload()
{
  //load images here
  happydogimg = loadImage("dogImg.png")
  dogimg = loadImage("dogImg1.png")
}

function setup() {
  createCanvas(700, 600);
  foodObj = new Food ();
  database = firebase.database()
  dog = createSprite(300,300)
  dog.addImage("dog",dogimg)
  dog.scale = 0.5
  foodstock = database.ref('Food')
  foodstock.on("value",readStock)

  feed = createButton("Feed The Dog")
feed.position(700,95);
feed.mousePressed(feedDog);

addFood=createButton("Add Food")
addFood.position(800,95);
addFood.mousePressed(addFoods)

}

function readStock(data){
  foods = data.val()
}

//Function to write values in DB
function writeStock(x){
  if(x <= 0){
    x = 0
  }
  else{
    x = x - 1 
  }
  database.ref('/').update(
    {
      Food:x
    }
  )
}

function draw() {  
  background(46,139,87);
foodObj.display();

fedTime = database.ref('FeedTime');
fedTime.on("value",function (data){
  lastFed = data.val();
})

fill(255,255,254);
textSize(15);
if (lastFed>= 12){
  text("Last Feed: "+ lastFed%12 + "PM", 350 ,30);
}
else if (lastFed === 0){
  text("last Feed: 12AM",350,30);
}
else{
  text("last Feed:  " + lastFed+ "AM", 350,30)
}

drawSprites();
}

  //Function to read values from DB
 /// if(keyWentDown(UP_ARROW)){
  ///  writeStock(foods)
    //dog.addImage("dog",happydogimg)
  //} 
  //fill("black")
  //textSize(30)
  //text("Food Available:" + foods,200,500)
 // drawSprites();
  //add styles here
///  fill("black")
 // textSize(30)
 // text("Press the Up arrow to feed the Dog",100,100)

function readStock (data){
  foods = data.val();
  foodObj.updateFoodStock(foods)
}

function feedDog(){
  dog.addImage(dogimg);

  foodObj.updateFoodStock(foodObj.getFoofStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
      FeedTime: hour()
  })
}

function adddFoods(){
  foods++
  database.ref('/').update({
    food:foods
  })
}




