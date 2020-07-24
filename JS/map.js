

class Momento{
    constructor(path){
        this.path=path;
    }
    getSaved(){return this.path}
    toString(){return this.path}
}
class Originator{
    set(newPath){
        this.path=newPath;
    }
    getPath(){
        return this.path;
    }
    storeInMomento(){
        console.log("stored in momento");
        return new Momento(this.path);
    }
    restoreFromMomento(momento){
        this.path=momento.getSaved();
        return this.path;
    }
}
class Caretaker{
    constructor(){
        this.savedMomento=[];
    }
    addMomento(momento){
        this.savedMomento.push(momento)
        console.log("Pre : "+momento.getSaved().length);
    }
    getMomento(i){
        console.log("History: "+i+" "+this.savedMomento[i].getSaved().length);
        return this.savedMomento[i];
        //console.log("History: "+this.savedMomento[i]);
    }
}
// Load the Visualization API and the columnchart package.
google.load("visualization", "1", { packages: ["columnchart"] });
google.charts.load('current', {'packages':['corechart']});
var MyLocation={
    locationdata:""
}
var MyProfile=
$( document ).ready(function() {
    // Handler for .ready() called.
//init();
});
function initDB(){
    document.getElementById("pcontrol-unit").style.display="none";
    let database = firebase.database();
    firebase.auth().onAuthStateChanged(function(user) {
       if(user!=null)
       
        database.ref("Profiles/"+user.uid).on("child_added",(p)=>{
            console.log(p.val());
             MyProfile={"id":user.uid,"profile":p.val()}
       
             updateUserLocation(MyProfile);
          
            })
            else window.location="../HTML/login.html"
       
    });

     

   
     
}
var map;
var view;
function setLocation(profile){
    console.log(profile);
    if(LocationData.uid=="")
    navigator.geolocation.getCurrentPosition((loc)=>{
        LocationData.uid=profile.id;
        LocationData.location.long=loc.coords.longitude;
        LocationData.location.lat=loc.coords.latitude;
        MyLocation.locationdata=LocationData;
              const db = firebase.firestore();
              
              db.collection("Locations").doc(profile.id).set(
                  LocationData
              ).then(function (response) {
                
                    })
                    .catch(function (error) {
                
                    });
               
             
            });
            else{
                const db = firebase.firestore();
              
              db.collection("Locations").doc(profile.id).set(
                  LocationData
              ).then(function (response) {
                
                    })
                    .catch(function (error) {
                
                    });
                }
}
function reverseGeocode(lon,lat,exec=()=>{}) {
    fetch('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat)
      .then(function(response) {
             return response.json();
         }).then(function(json) {
             console.log(json);
            setupsideMenu(json);
            exec(json);
         });
 }
var ONLINEUSERS=[],OFFLINEUSERS=[];
function drawPolylines(event) {
    var path = poly.getPath();
    var pp=[];
  
    // Because path is an MVCArray, we can simply append a new coordinate
    // and it will automatically appear.
    if(isRecording&&!isPaused){ 
        path.push(event.latLng);
        var i=0;
        var temp=[];
       poly.getPath().forEach(n=>{
   
       temp.push(n)});
        originator.set(temp);
        caretaker.addMomento(originator.storeInMomento())
        savedVersions++;
        currentVersion++;
        $("#undo").show();
        console.log("Saved path version: "+savedVersions);
        
        $("#saveTypes").show();
        console.log(event);
       
        Journey.paths.push({
            "lat":event.latLng.lat(),
            "lng":event.latLng.lng(),
            "id":path.getLength()
        });
        //updateList();
        if(!disableGraph)setTimeout(drawElavatorGraphforPath({"paths":Lnglatadapter(temp),"name":Journey.name,"key":Journey.key,"color":Journey.color,"return":Journey.return}),1200)
        
    }
  }
  var tempPolylineHolder=[];
  function Lnglatadapter(list) {
      var temp=[];
      list.forEach(t=>{
          temp.push({lat:t.lat(),lng:t.lng()})
      })
      return temp;
  }
  function LngLatReverse(list) {
    var temp=[];
    list.forEach(t=>{
        temp.push(new google.maps.LatLng(t.lat,t.lng))
    })
    return temp;
    
  }
  function drawPolyLinesFromStored(){
    
    tempPolylineHolder.forEach(p=>{
        p.setMap(null);
        p.setPath([]);
    })
    tempPolylineHolder=[];
    for (const [k, v] of Object.entries(markers)) { 
        console.log(k);
        if(k.includes('--end')||k.includes('--start'))removeMarker(k);
        
  
}
//iterating through a list of nodes 
//this is an array of the objects {journey, id}
for (const [k, v] of Object.entries(JourneyView)) {
        console.log(v,k)
         if(v==true){
               NodePath=[];
               poly.setMap(null);
            Journeys[k-1].forEach(np=>{
                console.log(np.journey)
            var newpoly = new google.maps.Polyline({
                path:np.journey.paths,
                strokeColor:np.journey.color,
                strokeOpacity: 1.0,
               // editable: true,
                strokeWeight: 3,
               
             });
             np['polyline']=newpoly;
             
             
              poly.setPath(np.journey.paths);
              poly.setOptions({strokeColor:np.journey.color});
              
             
              Journey=np.journey;
             
            updateListV2(Journey.paths);
             $('#nodeBox').show();
            currentNode=np.id;  

             

              
              
              $("#journeyTitle").val(np.journey.name)
              document.getElementById("journey-type").value=np.journey.return
            
            newpoly.setMap(map);
            tempPolylineHolder.push(newpoly);

            //TODO: update journey ui
            NodePath.push(np);
              updateNodeElem();

            // Journey.name=Journeys[k-1].name;
            // Journey.color=Journeys[k-1].color;
            // Journey.key=Journeys[k-1].key;
            // Journey.return=Journeys[k-1].return;
            // Journey.paths=Lnglatadapter(Journeys[k-1].paths);

         
            if(np.journey.paths.length>2&&np.journey.key=="trials-main"){
               console.log("here")
              np.journey.return==true? addMarker(np.journey.paths[np.journey.paths.length-1].lat(),np.journey.paths[np.journey.paths.length-1].lng(),np.journey.name+"--end",):addMarker(np.journey.paths[0].lat(),np.journey.paths[0].lng(),np.journey.name+"--end",destinationIcon);
                    addMarker(np.journey.paths[np.journey.paths.length-1].lat(),np.journey.paths[np.journey.paths.length-1].lng(),np.journey.name+"--start",);
                }
             })
         }
     }
    
 
  
   
  }
 function redo(){
        if((savedVersions-1)>currentVersion){
            currentVersion++;
            originator.restoreFromMomento(caretaker.getMomento(currentVersion));
            poly.setPath(originator.getPath());
            poly.setMap(map);
            console.log("redo");
            $("#undo").show();
        }
        else{
            $("#redo").hide();
        }
        updatePolylines()
 }
 function undo(){
     if(currentVersion>=1){
         
         currentVersion--;
         console.log(currentVersion);
         originator.restoreFromMomento(caretaker.getMomento(currentVersion));
         console.log(originator.getPath().length);
         poly.setPath(originator.getPath());
         poly.setMap(map);
         console.log("undo");
         $("#redo").show();
     }else{
        $("#redo").hide();
     }
     updatePolylines()
 }

  function compare(a, b) {
    if (a.id < b.id) {
        return -1;
    }
    if (a.id > b.id) {
        return 1;
    }
    return 0;
}
var polyMarkers=[];
function updateList(){
    $("#pathList").html('');
    Journey.paths.sort(compare);
    Journey.paths.reverse();
     // Add a new marker at the new plotted point on the polyline.
   var i=0;
   if(Journey.paths.length>0)
   if (Journey.paths[0].id ==undefined){
       console.log(Journey.paths,"--tyoe");
            updateListV2(Journey.paths);
   }else{
    Journey.paths.forEach((path)=>{
        var label= new HLabel(`${path.id}) ${convertDMS(path.lat,path.lng)}`,'','',new FontSetting("12px", "black"));
        $("#pathList").append(label.getDiv());
      
    });
   }
   
   
    
}
function updateListV2(paths){
    $("#pathList").html('');
    

     // Add a new marker at the new plotted point on the polyline.
   var i=paths.length;

   
    paths.forEach((path)=>{
      
      console.log(path);
        var label= new HLabel(`${i--}) ${convertDMS(path.lat(),path.lng())}`,'','',new FontSetting("12px", "black"));
        $("#pathList").append(label.getDiv());
      
    })
   
}
function updateUI(){
    $(".profiles-online").html('');
    $(".profiles-offline").html('');
    let database = firebase.database();
   // alert(ONLINEUSERS.length);
    ONLINEUSERS.forEach(user=>{
    
        database.ref("Profile/"+user.uid).on("child_added",(p)=>{
            console.log(p.val());
                var list=document.createElement("div");
                list.setAttribute("class","grow list-group-item list-group-item-action left-row");
                var inner=document.createElement("div");
                var image=document.createElement("img");
                image.src=p.val().url!=undefined?p.val().url:"",
                image.alt="";
                image.style.border="2px rgb(81, 255, 0) solid";
                image.style.margin="0 10px";
                image.setAttribute("class","circle-image sml grow");
                

                list.appendChild(image);
                inner.innerHTML="<label>Distance: "+calcDistance(MyLocation.locationdata.location.lat, MyLocation.locationdata.location.long,user.location.lat,user.location.long)+" Km away</label><br><small id='time-"+user.uid+"'></small><br><label>"+p.val().first_name+" | "+p.val().id+"</label><br>";
               calTime(calcDistance(MyLocation.locationdata.location.lat, MyLocation.locationdata.location.long,user.location.lat,user.location.long),"#time-"+user.uid);
                
               reverseGeocode(user.location.long,user.location.lat,(e)=>{
                    inner.innerHTML+= "<label>location: "+e.address.city_district+" - <small>"+e.address.county+"</small></label>"
                })
                list.appendChild(inner);
                $(".profiles-online").append(list);
                
                list.addEventListener("click",()=>{
                   
                    flyTo(new ol.proj.fromLonLat([user.location.long,user.location.lat]),()=>{},view,16)
                })
                addMarker(user.location.long,user.location.lat,map,image.cloneNode(true))
            })
    });
    OFFLINEUSERS.forEach(p=>{
    
        
                var list=document.createElement("div");
                list.setAttribute("class","grow list-group-item list-group-item-action left-row");
                var inner=document.createElement("div");
                var image=document.createElement("img");
                image.src=p.profile.url!=undefined?p.profile.url:"",
                image.alt="";
                image.style.border="2px red solid";
                image.style.margin="0 10px";
                image.setAttribute("class","circle-image sml grow");
                

                list.appendChild(image);
                inner.innerHTML="<label>"+p.profile.first_name+" | "+p.profile.id+"</label><br>";
                /*reverseGeocode(user.location.long,user.location.lat,(e)=>{
                    inner.innerHTML+= "<label>location: "+e.address.city_district+" - <small>"+e.address.county+"</small></label>"
                })*/
                list.appendChild(inner);
                $(".profiles-offline").append(list);
                
                /*list.addEventListener("click",()=>{
                    flyTo(new ol.proj.fromLonLat([user.location.long,user.location.lat]),()=>{},view,16)
                })*/
               // addMarker(user.location.long,user.location.lat,map,image.cloneNode(true))
            
    })
}

function getOnlineUsers(){
    const db = firebase.firestore();
    let doc = db.collection('Online').onSnapshot({ includeMetadataChanges: true },querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
            console.log(change.doc.data());
          if (change.type === 'added') {
           
            if(!change.doc.data().uid!=undefined){
                if(change.doc.data().uid!=null)
                db.collection("Locations").doc(change.doc.data().uid).get()
                .then(doc =>{
                    console.log("$$",doc)
                  if(doc!=undefined)
                    console.log("??",doc.data());
                      
                        ONLINEUSERS.push(doc.data());
                        getOfflineUsers();
                    
                }).then(function (response) {
                    readytoGo=true;
                    getOfflineUsers();
                })
                .catch(function (error) {
                    console.log(error.message)
                });
               
        }
        getOfflineUsers();
          }
          if (change.type === 'modified') {
        
            db.collection("Locations").doc(change.doc.data().uid).get().then(querySnapshot =>{
                querySnapshot.docs().forEach(change => {
                    if (change.type === 'added') 
                    ONLINEUSERS.push(change.doc.data());
                })
            })
          }
          if (change.type === 'removed') {
            db.collection("Locations").doc(change.doc.data().uid).get().then(querySnapshot =>{
                querySnapshot.docs().forEach(change => {
                    if (change.type === 'added') 
                    
                    ONLINEUSERS.splice (ONLINEUSERS.indexOf(change.doc.data()))
                })
            })
          
          }
          var source = querySnapshot.metadata.fromCache ? "local cache" : "server";
          console.log("Data came from " + source);
        });
      });
}
function getOfflineUsers(){
    OFFLINEUSERS=[];
    let database = firebase.database();
    database.ref("Profile/")
    .on("value",(ds)=>{
        console.log(ds.val())//ids
        ds.forEach(e=>{
        var uid=e;
      
        uid.forEach((s)=>{

            console.log("-->",s.val());
        
            var online=false;
            var added=false;

            ONLINEUSERS.forEach(op=>{
                if(op.uid==e.key)
                online=true;
            })
            OFFLINEUSERS.forEach(op=>{
                if(op.id==e.key)
                added=true;
            })
            if(!online&&!added){
               
                OFFLINEUSERS.push({"id":e.key,"profile":s.val()});
           }
           
        
            
    
        });
    
    });
    updateUI();
    })
}
var readytoGo=true;
mainThread();
function mainThread(){
var thread=setInterval(() => {
    if(readytoGo==true){
        clearInterval(thread);
        initUI();
    }
}, 1000);
}
function initUI() {
    
    $('#anchor-x').val(anchor_x);
    $('#anchor-y').val(anchor_y);
    $('#icon-w').val(icon_w);
    $('#icon-h').val(icon_h);
    $('#icon-link').on('keyup',()=>{
        console.log('typing..');
        document.getElementById('icon-image').src=$('#icon-link').val();
    })
    document.getElementById("icon-file").addEventListener('change',(f)=>{
        var file= f.target.files[0];
        
        var fileReader = new FileReader();
        fileReader.onload = function(e){

            var dataUri = fileReader.result;
            document.getElementById('icon-image').src=dataUri

        }
        fileReader.readAsDataURL(file)
    });
    $('#icon-save').on('click',()=>{
        icons.push(document.getElementById('icon-image').src);
        loadIcons();
        document.getElementById('icon-image').src="";
        ocument.getElementById('icon-link').value=""
    })

    document.getElementById("searchPlace").addEventListener('keyup',function(){
        console.log("he");
        
    
        document.getElementsByClassName("suggestions")[0].innerHTML="";
       getGeocode( document.getElementById("searchPlace").value,(lat,lng)=>{
         
          addMarker(lat,lng);
          moveToLocation(lat,lng);

        //flyTo(new ol.proj.fromLonLat([lon, lat]),()=>{},view)
       },view,"suggestionBox","suggestions")
     })
     document.getElementById("journey-type").addEventListener('change',function(){
         Journey.return=document.getElementById("journey-type").checked;
     })
     
     document.getElementById("meeting-loc").addEventListener('keyup',function(){
        console.log("he");
        
    
        document.getElementsByClassName("meeting-sug")[0].innerHTML="";
       getGeocode( document.getElementById("meeting-loc").value,(lat,lng,lbl)=>{
        document.getElementById("meeting-loc").value=lbl;
        currentWayPoint={
            "title":document.getElementById("meeting-title").value!=""?document.getElementById("meeting-title").value:"Checkpoint "+(WayPoints.length+1),
            "icon":selectedIcon,
            "id":"checkpoint"+WayPoints.length+1,
            "location_name":lbl,
            "lat":lat,
            "lng":lng
        }
         // addMarker(lat,lng);
         if(selectedIcon==""){
            //add marker
            selectedIcon=icons[1];
            currentWayPoint.icon={
                url: selectedIcon,
                // This marker is 20 pixels wide by 32 pixels high.
                scaledSize: new google.maps.Size(24, 32),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(12,32)
              };
            removeMarker(currentWayPoint.id)
            addMarker(currentWayPoint.lat, currentWayPoint.lng,currentWayPoint.id,currentWayPoint.icon);
        }
        else{
            removeMarker(currentWayPoint.id)
            addMarker(currentWayPoint.lat, currentWayPoint.lng,currentWayPoint.id,currentWayPoint.icon);
        }
        
          moveToLocation(lat,lng);

        //flyTo(new ol.proj.fromLonLat([lon, lat]),()=>{},view)
       },view,"meeting-suggestions","meeting-sug")
     })
     $("#undo").on("click",()=>{undo()});
     $("#redo").on("click",()=>{redo()});
     
      startingIcon = {
        url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
      };
      // S
       destinationIcon = {
        url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
      };
      $('#exportBtn').on('click',()=>{
          exportProject();
          $('newBtn').attr('disabled',false)
        });
      $('#importBtn').on('click',()=>{
         importProject();
        });
        $('#exportPngBtn').on('click',()=>{
           // exportAsPng();
            gf();
        })
        $('#nodeAdder').on('click',()=>{
         
            currentNode++;
            Journey.paths=[];
          //  poly.setPath(LngLatReverse(Journey.paths));
           
           var temp = new google.maps.Polyline({
                    path:[],
                    strokeColor:activeColor,
                   strokeOpacity: 1.0,
                    strokeWeight: 3,
                   
              });
              poly=temp;
              poly.setMap(map)
            //updateList();
             NodePath.push({"journey": JSON.parse(JSON.stringify(Journey)),"id":currentNode,"polyline":temp});
            updateNodeElem();
        });
        $("#findMe").on("click",()=>{

        });
   
}
function updateUserLocation(profile){
    console.log("po");
    
    if(LocationData.uid=="")
    navigator.geolocation.getCurrentPosition((loc)=>{
LocationData.uid=profile.id;
LocationData.location.long=loc.coords.longitude;
LocationData.location.lat=loc.coords.latitude;
MyLocation.locationdata=LocationData;

      const db = firebase.firestore();

     
            db.collection("PubLocations").doc(profile.id).update({
                "location":LocationData.location
            }).then(function (response) {
                console.log("ready");
                
                readytoGo=true;
            })
            .catch(function (error) {
                console.log(error.message)
            });
        
    
    });
    else{
        const db = firebase.firestore();
     
        db.collection("PubLocations").doc(profile.id).update({
            "location":LocationData.location
        }).then(function (response) {
            console.log("ready");
            readytoGo=true;
        })
        .catch(function (error) {
            console.log(error.message)
        });
    }
}
function exportAsPng() {
    // if(Journeys.indexOf(Journey)<0){
      
    //     Journeys.push(Journey);
    // }
    var staticMapUrl = "https://maps.googleapis.com/maps/api/staticmap";

    //Set the Google Map Center.
    staticMapUrl += "?center=" +map.getCenter().lat() + "," + map.getCenter().lng();

    //Set the Google Map Size.
    staticMapUrl += "&size=640x480&scale=2";

    //Set the Google Map Type.
    staticMapUrl += "&maptype="+map.getMapTypeId();


    //Set the Google Map Zoom.
    staticMapUrl += "&zoom=" + map.getZoom();

    for (const [k, v] of Object.entries(markers)) {
        console.log(v.getIcon());
        

        staticMapUrl+=`&markers=size:small%7Canchor=12,32%7Cicon=${v.getIcon()==undefined?icons[1]:v.getIcon().url}%7C${v.getPosition().lat()},${v.getPosition().lng()}`
    }

    // Journeys.forEach(j=>{
    //     var path="";
    //     j.paths.forEach(p=>{
    //         path+=`${p.lat()},${p.lng()}|`;
    //     });
    //     staticMapUrl+=`&path=weight:3|color:${j.color}|${path}`;

    // });
    // var path="";
    // Journey.paths.forEach(p=>{      
    //     path+=`${p.lat},${p.lng}|`;
    // });
    // if(  Journey.paths.length>1)
    // staticMapUrl+=`&path=weight:3|color:${Journey.color}|${path}`;
    // console.log(staticMapUrl+"&key="+APIs.map);
    //Loop and add Markers.
   // staticMapUrl += "&markers=" + document.getElementById('lat').value + "," + document.getElementById('lng').value;

    //Display the Image of Google Map.
    var imgMap = document.getElementById("imgMap");

    $('#screenshot').attr("src",staticMapUrl+"&key="+APIs.map)
    $('#screenshotModal').modal('show');
    $('#save-screenshot').on('click',()=>{
        download()
    })
}
function gf() {

    var element = $("#mapArea");
    $.getScript("https://html2canvas.hertzen.com/dist/html2canvas.js", function() {
    html2canvas(element.get(0)).then((canvas)=>{
        var img = canvas.toDataURL("image/png");
        img = img.replace('data:image/png;base64,', '');
        var finalImageSrc = 'data:image/png;base64,' + img;

        $('#screenshot').attr("src",finalImageSrc)
        $('#screenshotModal').modal('show');
      //  download(dataUrl,"map_screenshot_"+new Date.now(),"image/png")
    })
     
    
});
}
//getLocation();

var map;
var poly;
var elevator;
var markers={};
var activeColor="#000000";
var isRecording=false;
var disableGraph=true;
var isPaused=false;
var Journeys=[];
var JourneyView={};
var originator=new Originator();
var caretaker=new Caretaker();
var savedVersions=0;
var currentVersion=0;
var JourneyIndex=0;
var currentWayPoint=undefined;
var WayPoints=[];
var WayPointsView={};
var uploadedFiles=[];//TODO
var checkpoints=[];//TODO
var lockRatio=false;
var NodePath=[{}];
var currentNode=0;

var Journey={
    "name":"",
    "color":"",
    "paths":[],
    "return":true,
    "key":"trials"
}
var Path={
    "lat":0,
    "lon":0,
    "address":0,
    "id":0
}
var startingIcon = {
  };
  // S
  var destinationIcon = {
  };
  // S
var clickEvent=(e)=>{};
function  updatePolylines(){
   
    var path = poly.getPath();
    Journey.paths=[];
    var i=1;
    poly.getPath().forEach(e=>{
       
        if(isRecording)Journey.paths.push({
            "lat":e.lat(),
            "lng":e.lng(),
            "id":i++
        });
    })
  updateList()
       
}

function parseFile(txt=""){
   
    console.log(txt);
    searchRegExp = /\\n/g;
    txt=txt.replace(searchRegExp,"\n")
    console.log(txt); 
    var sections=txt.split("-- Path End --");
   var newNodePath=[];
   var i=0;
   if(sections.length>0){
       console.log(sections,"sections");
   sections.forEach(sec=>{
       if(i<sections.length-1)
       newNodePath.push(
           {"journey": parseFileJourney(sec),"id":i++}
       );
   })
    console.log(newNodePath);
  
    Journeys.push(newNodePath);
    JourneyIndex++;
    }else{
        alert("invalid File uploaded")
    }
}
function parseFileJourney(txt){
    var searchRegExp = /\\n/g;
    txt=txt.replace(searchRegExp,"\n").trim();
    console.log(txt);
    var lines=txt.split("\n");
    var paths=[];
    console.log(lines);
    
   
        for(i=0;i<Number(lines[0].split(",")[2]);i++){
       // paths.push({"id":lines[i+1].split(",")[0],"lat":lines[i+1].split(",")[1],"lng":lines[i+1].split(",")[2]});
      var myLatLng = new google.maps.LatLng({lat: Number(lines[i+1].split(",")[1]), lng: Number(lines[i+1].split(",")[2])}); 
      paths.push(myLatLng)
    }
  //  paths.reverse();
    var journey={
        "name":lines[0].split(",")[0],
        "color":lines[0].split(",")[1],
        "paths":paths,
        "return":lines[0].split(",")[3],
        "key":lines[0].split(",")[4]
    }  
    journey.paths.sort(compare);
   journey.paths.reverse();
   return journey;
}
function parseJson(txt=""){
    console.log(txt);
    var json=JSON.parse(txt);
    
    var paths=[];
    json.paths.forEach(path=>{
        var myLatLng = new google.maps.LatLng({lat: path.lat, lng: path.lng}); 
        paths.push(myLatLng)
    })
  // paths.reverse();
    var journey={
        "name":json.name,
        "color":json.color,
        "paths":paths,
        "return":json.return
    }
   
    console.log(journey);
    Journeys.push(journey);
    JourneyIndex++;
}
function waypointsetup(){
    $('#check_points').html('');
   
    WayPoints.forEach(wp=>{
    var cont=new HContainer("icon-h grow")
    cont.setHeight("30px");
    cont.setWidth("30px");
    console.log(wp);
    cont.add(new HImage().createImg(wp.icon.url,"100%","100%","contain"));
    var title= new HLabel(`${wp.title}`,"","",new FontSetting("14px","black","Helvetica","bold"));
    var subtitle= new HLabel(`${wp.location_name}`,"","",new FontSetting("11px","grey","Helvetica",));
    var trailing=new HButton(WayPointsView[wp.id]?"hide":"show","btn-dark");
    trailing.onClick(e=>{
       if(WayPointsView[wp.id]){
           WayPointsView[wp.id]=false;
            removeMarker(wp.id)
        }else{
            WayPointsView[wp.id]=true;
           
            addMarker(wp.lat, wp.lng,wp.id,wp.icon,(e)=>{
                //console.log("dragging..");
                wp.lat=e.latLng.lat();
                wp.lng=e.latLng.lng(); 
                wp.title="Checkpoint "+WayPoints.length+1; 
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${wp.lat},${wp.lng}&key=${APIs.map} `)
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    console.log(json);
                    wp.location_name=json.results[0].formatted_address
                 })
                
                
            });
        }
        waypointsetup();
    })
    

    var listtile=new HListTile(
        "listtile grow",//class
        "",//id
        "",//alignment
        cont,//leading
        title,//title
        subtitle,//subtitle
        trailing,//trailing

    );
     $('#check_points').append(listtile.getDiv());
     listtile.onClick(e=>{
         zoomPan(wp.lat,wp.lng)
     })

})
}
function addNodePath(){
    if( NodePath.length>0){
        NodePath[currentNode].journey=JSON.parse(JSON.stringify(Journey));
        NodePath[currentNode].polyline=poly;
        
       
        updateNodeElem();
    }
}
function updateNodeElem(){
    $('#nodeBox-inner').html('');
    var i=0;
    console.log(NodePath);
    NodePath.forEach((node)=>{
        var cont= new Center('circleBtn bordered grow nodeBtns');
        cont.setHeight("40px");
        cont.setWidth("40px");
        console.log("Node: ",currentNode,i);
        if(currentNode==i){
            cont.getDiv().style.backgroundColor="rgba(88, 174, 255, 0.541)"
        }
        var lbl= new HLabel(i+1,"","",new FontSetting("14px",node.journey!=undefined? node.journey.color:NodePath[i].journey!=undefined?NodePath[i].journey.color:activeColor,"Helvetica","bold"));
        cont.add(lbl.getDiv())
        $('#nodeBox-inner').append(cont.getDiv());
        i++;
       if(node.journey!=undefined)drawElavatorGraphforPath(node.journey)
        cont.onClick(()=>{
            
            Journey=node.journey;
            
            poly=node.polyline
            updateList();
            currentNode=node.id;  
            drawElavatorGraphforPath(Journey)
           updateNodeElem();
        })
    })
}
function initMap() {
    loadIcons();
    updateNodeElem();
    $('#lock_ratio').on('click',()=>{
        if(lockRatio){
            document.getElementById("lock_ratio").classList.remove("fa-lock");
            document.getElementById("lock_ratio").classList.add("fa-unlock");
            lockRatio=false;
        }
        else{
            document.getElementById("lock_ratio").classList.add("fa-lock");
            document.getElementById("lock_ratio").classList.remove("fa-unlock");
            lockRatio=true;   
        }
    })
    $('#meeting-btn').on("click",()=>{
        WayPoints.push(currentWayPoint);
        WayPointsView[currentWayPoint.id]=true;
    
        waypointsetup();
        $('#meeting-title').val('');
        $('#meeting-loc').val('');
        currentWayPoint=undefined;
        selectedIcon="";
        loadIcons();
        
    });

     loadFileAsText((text,ext)=>{
        updateLoadedFiles(text,ext); 
     },'loadInput')
    map = new google.maps.Map(document.getElementById("mapArea"), {
        center: { lat:52.1545, lng: -9.5669 },
        zoom: 10
      });
      poly = new google.maps.Polyline({
        strokeColor:activeColor,
        strokeOpacity: 1.0,
        editable: true,
        strokeWeight: 3,
      });
    //  google.maps.event.addListener(poly, "insert_at",function(){updatePolylines()});
    google.maps.event.addListener(map, 'dragend', function() { 
        cameraFocus.lnglat={
            lng:map.getCenter().lng(),
            lat:map.getCenter().lat()
        }
        cameraFocus.zoom=map.getZoom()
    } );
      poly.setMap(map);
      
      document.getElementsByClassName("custom-control")[0].addEventListener('click', function(e) {
        console.log("lok");
      
                document.getElementById("normal").checked=true;
                document.getElementById("pdrawer").checked=false;
                map.addListener("click", function(e){});
                document.getElementById("pcontrol-unit").style.display="none";
            });
            document.getElementsByClassName("custom-control")[1].addEventListener('click', function(ej) {
                console.log("lok");
                poly.setMap(null);
                document.getElementById("normal").checked=false;
                document.getElementById("pdrawer").checked=true;
                map.addListener("click", function(e){drawPolylines(e)});
                console.log("lok");
                document.getElementById("pcontrol-unit").style.display="block";
                $("#recLbl").hide();
                $("#recBtn").show();
                $("#drawerHelp").text("Click on the record button to record the current path");
                $("#recLbl").on('click',()=>{
                   // isRecording=false;
                    isPaused=true;
                    $("#recLbl").hide();
                    $("#recBtn").show();
                    $('#nodeBox').show();
                   
                    addNodePath();
                //     var temp=poly.getPath();
                //     poly.setMap(null);
                //     poly = new google.maps.Polyline({
                //     path:temp,
                //     strokeColor:activeColor,
                //     strokeOpacity: 1.0,
                //     strokeWeight: 3,
                   
                //   });
            
                //   poly.setMap(map);
                 if(NodePath[0].journey.paths.length>2){
                        console.log("lenght - "+Journey.paths.length);
                        addMarker(NodePath[0].journey.paths[0].lat,NodePath[0].journey.paths[0].lng,"end",destinationIcon);
                        addMarker(NodePath[0].journey.paths[NodePath[0].journey.paths.length-1].lat,NodePath[0].journey.paths[NodePath[0].journey.paths.length-1].lng,"start",);
                        console.log(markers)
                   }
                poly.setEditable(false)
                    endThread();
                    var i=0;
                   
                });
                $("#recBtn").on('click',()=>{
                    removeMarker("start");
                    $('#nodeBox').hide();
                    removeMarker("end");
                    console.log(NodePath);
                     NodePath[currentNode]={
                         journey:{},
                         id:currentNode
                     }
                     
                    if(!isPaused){

                        
                        var temp=poly.getPath();
                        poly.setMap(null);
                        poly = new google.maps.Polyline({
                        path:temp,
                        strokeColor:activeColor,
                        strokeOpacity: 1.0,
                        editable: true,
                        strokeWeight: 3,
                       
                     });

                     //poly.setPath(LngLatReverse(Journey.paths));
                      poly.setMap(map);
                     
                    }
                       poly.setEditable(true)
                      google.maps.event.addListener(poly, "rightclick", function(e) {console.log("delete");
                      if (e.vertex == undefined) {
                        return;
                      }else{
                        var path = poly.getPath()
                        var vertex = e.vertex
                    
                        if (!path || vertex == undefined) {
                          this.close();
                          return;
                        }
                    
                        path.removeAt(vertex);
                        updateList()
                      }
                    })
                    
                    startThread(updatePolylines);
                     
                    // poly.addListener('rightclick', function(polyMouseEvent) {
                    //     for (var i = 0; i < poly.length; i++) {
                    //         if (google.maps.geometry.poly.isLocationOnEdge(polyMouseEvent.latLng, poly[i], 0.0001)) {
                    //             path.removeAt(i);
                    //         }
                    //     }
                    // });
                     
                     
                     
                    $("#recLbl").show();
                    $("#recBtn").hide();
                    $("#drawerHelp").text("Click on the map to draw a path");
                    isRecording=true; isPaused=false;
                    $("#journeyTitle").on("keyup",()=>{
                        Journey.name=$("#journeyTitle").val()!=""?$("#journeyTitle").val():`untitled - ${new Date().toLocaleDateString()}`;

                    })
                    Journey.name=$("#journeyTitle").val()!=""?$("#journeyTitle").val():`untitled - ${new Date().toLocaleDateString()}`;
                    Journey.color=activeColor;
                    removeMarker(Journeys.name+"--end")

        
                })
                $('#saveBtn').on('click',()=>{
                     download(nodeDataToString(),`${Journey.name}.txt`,'text');
                     reset();
                })
                $('#saveAsBtn').on('click',()=>{
                    Journey.color=activeColor;
                    download( JSON.stringify(Journey),`${Journey.name}.json`,'octet/stream');
                    reset();
               })
                $("#resetPoly").on('click',()=>{reset();})
            });
  
    var picker = new CP(document.getElementById("pColor"));
   

    picker.on('change', function(r, g, b, a) {
        this.source.value = this.color(r, g, b, a);
        activeColor=this.color(r, g, b, a);
        
        poly.setOptions({
            strokeColor:activeColor
        });
        drawChartLines();
       /* poly = new google.maps.Polyline({
            strokeColor:activeColor,
            strokeOpacity: 1.0,
            strokeWeight: 3
          });
          poly.setMap(map);*/
        document.getElementById("pcolor-sample").style.backgroundColor=`rgba(${r},${g},${b},${a})`;
    });

        // Create an ElevationService.
         elevator = new google.maps.ElevationService();

     
     
  }

  /* All function within this block relate to drawing a graph */
var distances=[];

  function drawElavatorGraphforPath(journey){
      // Draw the path, using the Visualization API and the Elevation service.
      if(journey.paths.length>1)
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${journey.paths[0].lat},${journey.paths[0].lng}&key=${APIs.map} `)
      .then(function(response) {
             return response.json();
         }).then(function(json) {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${journey.paths[journey.paths.length-1].lat},${journey.paths[journey.paths.length-1].lng}&key=${APIs.map} `)
            .then(function(response2) {
                   return response2.json();
               }).then(function(json2) {
                  var temp=json2.results[0].formatted_address.split(",");
                  var temp2=json.results[0].formatted_address.split(",");
                $("#journey-title").text(`Elevation profile from • ${temp[temp.length-3]},${temp[temp.length-2]} • to • ${temp2[temp2.length-3]},${temp2[temp2.length-2]} •`)
          })
           
    })
     
      var points=[];
       distances=[];
       var i=0;
    //    if(journey.return==true){
    //       //console.log("journey: "+journey.return);
    //   var temp=journey.paths;
     
    //   console.log(temp,journey.paths);
    //  // temp.reverse();
    //   var newarr=journey.paths.concat(temp)
    //   journey.paths=newarr;
    //   console.log(temp,journey.paths);
    // }
      
      journey.paths.forEach(path=>{
      //  distances.push(calcDistance({lat:journey.paths[0].lat(),lng:journey.paths[0].lng()},{lat:path.lat(),lng:path.lng()}))
        var  curD=0;
      try {
        curD=calcDistance({lat:journey.paths[i==0?0:i-1].lat(),lng:journey.paths[i==0?0:i-1].lng()},{lat:path.lat(),lng:path.lng()});//
      } catch (error) {
          console.log('switching latlng format');
          
      }finally{
            curD=calcDistance({lat:journey.paths[i==0?0:i-1].lat,lng:journey.paths[i==0?0:i-1].lng},{lat:path.lat,lng:path.lng});//
      }
        
        var oldD=distances.length>1?distances[distances.length-1]:0;
        console.log(curD,oldD,curD+oldD);
        distances.push(curD+oldD);
        try {
             points.push( new google.maps.LatLng({lat:path.lat(),lng:path.lng()}));
        } catch (error) {
            
        }
        finally{
              points.push( new google.maps.LatLng({lat:path.lat,lng:path.lng}));
        }
        i++;
      })
    
      
      displayPathElevation(points, elevator,distances);
      
  }
  var chart,data;

  function displayPathElevation(path, elevator, distances) {
      
    elevator.getElevationAlongPath(
        {
          path: path,
          samples: 256
        },
        plotElevation)}
    function plotElevation(elevations, status){
      
        var chartDiv = document.getElementById("elevation_chart");
        if (status !== "OK") {
          // Show the error code inside the chartDiv.
          chartDiv.innerHTML =
            "Recalibrating.. " + status;
            console.log(status)
          return;
        }
        // Create a new chart in the elevation_chart DIV.
         chart = new google.visualization.LineChart(chartDiv);
      
        // Extract the data from which to populate the chart.
        // Because the samples are equidistant, the 'Sample'
        // column here does double duty as distance along the
        // X axis.
         data = new google.visualization.DataTable();
        data.addColumn("number", "Distance");
        data.addColumn("number", "Elevation");
        data.addColumn({type:'string', role:'tooltip'}); // 
       
        for (var i = 0; i < elevations.length; i++) {
          data.addRow([distances[i], elevations[i].elevation,`Distance: ${distances[i]?distances[i].toFixed(2):distances[distances.length-1]} km\nElevation: ${elevations[i].elevation.toFixed(2)} m`]);
        }
      
        // Draw the chart using the data within its DIV.
        $(window).resize( ()=>{
            drawChartLines()
        });
        drawChartLines();
        google.visualization.events.addListener(chart, 'onmouseover', function(e) {
            console.log(elevations[e.row]);
            removeMarker("mover");
            addMarker(elevations[e.row].location.lat(),elevations[e.row].location.lng(),"mover","",undefined,()=>{},null)
        });
  }
  function drawChartLines(){
      if(chart)
    chart.draw(data, {
        height: 160,
        crosshair: { trigger: "both",orientation: 'vertical',  opacity: '0.6'},
        colors:[activeColor],
        
        width: '100%',
        chartArea: {
          left: 90,
          bottom:40,
          width: '100%'
        },
    
        legend: "none",
        titleY: "Elevation (m)",
        titleX: "Distance (km)",

      });
  }
  async function loadElavationProfileWithOpenMapAPI(paths){
      return fetch("http://open.mapquestapi.com/elevation/v1/profile?key=KEY&shapeFormat=raw&latLngCollection=39.74012,-104.9849,39.7995,-105.7237,39.6404,-106.3736")
  }
  /* end */
  
  function reset(){
    Journey={
        "name":"",
        "color":"",
        "paths":[],
        "return":true,
        "key":"trials"
    }
    
    isRecording=false;
                    isPaused=false;
                    $("#recLbl").hide();
                    $("#recBtn").show();
                    $("#journeyTitle").val('');
                    endThread();
                    for (const [k, v] of Object.entries(JourneyView)) {
                        JourneyView[k]=false;
                    }
                    drawPolyLinesFromStored();
                    poly.setMap(null);
    poly.setPath([]);
    updateList();
    NodePath.forEach(node=>{
        node.polyline.setMap(null)
    })
    NodePath=[];
    updateNodeElem();
    removeMarker("end");
    removeMarker("start");

  }
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
     alert("Geolocation is not supported by this browser.");
    }
  }
  function avatarList(profile) {
      var list=document.createElement("div");
      list.setAttribute("class","list-group-item list-group-item-action");
      var leading=document.createElement("img");
      leading.setAttribute("class",".circle-image.sml");
      leading.src=profile.url!=undefined?profile.url:"";
      leading.alt="";

      var title=document.createElement("div");
      list.appendChild(leading);
      list.appendChild(title);
  }
  
  function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + 
    "Longitude: " + position.coords.longitude); 

  }
  
  function getGeocode(search="",exec=()=>{},view,tag='suggestionBox',list='suggestions',meeting=""){
    console.log(search)
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${search.replace("\\s","+")}&key=${APIs.map}`)
    .then(function(response) {
           return response.json();
       }).then(function(json) {
           console.log(json);
           if(json.length<=0)
     document.getElementsByClassName(tag)[0].style="none";
     else document.getElementsByClassName(tag)[0].style="";
           document.getElementsByClassName(list)[0].innerHTML="";
            json.results.forEach(s => {
                var link=document.createElement("button");
                link.setAttribute("class","list-group-item list-group-item-action")
                link.textContent=`${s.address_components[2].long_name.toUpperCase()}, ${s.formatted_address}`;
                link.style.fontSize="10px";
                link.style.fontFamily="Helvetica";
                link.addEventListener("click",()=>{
                   console.log(s.lon,s.lat,s.formatted_address)
                   
                    exec(Number(s.geometry.location.lat),Number(s.geometry.location.lng),s.formatted_address);
                    document.getElementsByClassName(list)[0].innerHTML="";
                   

                })
                if(meeting=="")
             {
                 document.getElementsByClassName(list)[0].appendChild(link);
            }
            });
        
       });
 }

function moveToLocation(lat, lng){
    const center = new google.maps.LatLng(lat, lng);
    // using global variable:
    map.panTo(center);
  }
  function zoomPan(lat,lng){
    const center = new google.maps.LatLng(lat, lng);
    // Back to default zoom
    map.panTo(center); // Pan map to that position
    setTimeout("map.setZoom(14)",1000); 
  }
  function addMarker(lat,lng,id,icon,drag=undefined,click=toggleBounce,anim= google.maps.Animation.DROP){
      console.log("adding marker",icon);
    marker = new google.maps.Marker({
        map: map,
        draggable: drag!=undefined,
        animation:anim,
        icon:icon,
        position: {lat: lat, lng: lng}
      });
      markers[id]=marker;
      
      marker.addListener('click', click);
      marker.addListener('drag',drag)
     
      markers[id].setMap(map)
    
  }
  function placeMarker(marker){
    addMarker(marker.position.lat,marker.position.lng,marker.id,true)
  }

function removeMarker(markerId) { 
    if(markers[markerId]){
        markers[markerId].setMap(null);
        delete markers[markerId];
    }
}
  function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

function toDegreesMinutesAndSeconds(coordinate) {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    return degrees + "°" + minutes + "\"" + seconds;
}

function convertDMS(lat, lng) {
    var latitude = toDegreesMinutesAndSeconds(lat);
    var latitudeCardinal = lat >= 0 ? "N" : "S";

    var longitude = toDegreesMinutesAndSeconds(lng);
    var longitudeCardinal = lng >= 0 ? "E" : "W";

    return latitude + " " + latitudeCardinal + "\n" + longitude + " " + longitudeCardinal;
}

function ParseDMS(input) {
    var parts = input.split(/[^\d\w]+/);
    var lat = ConvertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
    var lng = ConvertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
}
var thread;
function startThread(func){
    thread= setInterval(() => {
        func();
    }, 1000);
}
function endThread(params) {
    clearInterval();
}
const momento= function(){
    this
};
//
//
//deprecated
function dataToString(journey){
    var paths="";
    journey.paths.reverse();
    journey.paths.forEach(path=>{
        paths+=`${path.id},${path.lat},${path.lng}\n`
    })
    return `${journey.name},${journey.color},${journey.paths.length},${journey.return},${journey.key}\n${paths}`;
}
//
//
// use nodeDataToString
function  nodeDataToString(){
    var finalString="";
    var i=0;
   
    NodePath.forEach(node=>{
          if(i==0)node.journey.key=node.journey.key+"-main"
        console.log(node,'-- journey');
       finalString += dataToString(node.journey)+"-- Path End --\n";
       i++;
    });
    return finalString;
}
//saving...
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}
function uploadFile(func){
   document.getElementById('fileuploader').addEventListener('click',()=>{loadFileAsText(func,'fileuploader')})
   document.getElementById('fileuploader').click()
}
function loadFileAsText(func, f='loadInput'){
    console.log(f);
    document.getElementById(f) 
    .addEventListener('change', function() { 
    var n=this.files[0].name;
  
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        var result;
       
        if(n.includes(".txt")){
          
           
            var textFromFileLoaded = fileLoadedEvent.target.result;
            func(textFromFileLoaded,n); 
            uploadedFiles.push(
                {
                    filename:n,
                    data:JSON.stringify( textFromFileLoaded, null, 2)
                }
            );
         }
         else if(n.includes(".json")){
           
               result = JSON.parse(fileLoadedEvent.target.result);
              var formatted = JSON.stringify(result, null, 2);
            
            //       document.getElementById('result').value = formatted;
           func(formatted,n)
        //    uploadedFiles.push(
        //     {
        //         filename:n,
        //         data:JSON.stringify( formatted, null, 2)
        //     })
         }
        
    };
  
    fileReader.readAsText(this.files[0]); });
  }
  var icons=[
    'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    'https://www.freeiconspng.com/uploads/red-location-icon-map-png-4.png'
]
var selectedIcon="";
var anchor_x=12;
var anchor_y=32;
var icon_w=24;
var icon_h=32;

function loadIcons(){
    $("#icon-box").html('')
  icons.forEach(icon=>{
      var cont=new HContainer("icon-h grow")
      cont.setHeight("40px");
      cont.setWidth("40px");
      
      cont.add(new HImage().createImg(icon,"100%","100%","contain"));
      console.log(cont);
      $("#icon-box").append(cont.getDiv())
      if(selectedIcon==icon){
          cont.getDiv().style.border="1px lightblue dashed";
          cont.getDiv().style.borderRadius="100px"
          cont.getDiv().style.padding="5px"
      }
      cont.onClick(()=>{
          selectedIcon=icon;
          //currentWayPoint.icon=icon;
          if(currentWayPoint!=undefined){
          currentWayPoint.icon = {
            url: selectedIcon,
            // This marker is 20 pixels wide by 32 pixels high.
            scaledSize: new google.maps.Size(icon_w, icon_h),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(anchor_x,anchor_y)
          };
       
          
          $('#icon-adder').hide();
          $('#icon-modifier').show();
          $('#anchor-x').on('change',()=>{
              anchor_x=$('#anchor-x').val();
              modifyIcon()
          });
          $('#anchor-y').on('change',()=>{
            anchor_y=$('#anchor-y').val();
            modifyIcon()
        });
        $('#icon-w').on('change',()=>{
            icon_w=$('#icon-w').val();
            modifyIcon()
        })
        $('#icon-h').on('change',()=>{
            icon_h=$('#icon-h').val();
            modifyIcon()
        })
        modifyIcon()
          
        }
          loadIcons();
      })
      
  });
  var newIcon=new Center("circleBtn dashedBorder grow");
  newIcon.setHeight('30px')
  newIcon.setWidth('30px')
  newIcon.add(new HLabel("+","","",new FontSetting("20px","black")).getDiv());
  $('#icon-box').append(newIcon.getDiv());

  newIcon.onClick(()=>{
      $('#icon-adder').show();
      $('#icon-modifier').hide();

  })
}
function lockInRatio(){
    var widthOnePercent = imageOriginWidth / 100;
        var heightOnePercent = imageOriginHeight / 100;
        var imageCurrentWidth = $(imageSelector).width();
var imageCurrentPercent = imageCurrentWidth / widthOnePercent;
}
function modifyIcon(){
    currentWayPoint.icon = {
        url: selectedIcon,
        // This marker is 20 pixels wide by 32 pixels high.
        scaledSize: new google.maps.Size(icon_w, icon_h),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(anchor_x,anchor_y)
      };
      removeMarker(currentWayPoint.id)
          addMarker(currentWayPoint.lat, currentWayPoint.lng,currentWayPoint.id,currentWayPoint.icon,(e)=>{
            //console.log("dragging..");
            currentWayPoint.lat=e.latLng.lat();
            currentWayPoint.lng=e.latLng.lng(); 
            currentWayPoint.title="Checkpoint "+WayPoints.length+1; 
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentWayPoint.lat},${currentWayPoint.lng}&key=${APIs.map} `)
            .then(function(response) {
                   return response.json();
               }).then(function(json) {
                  
                   document.getElementById("meeting-loc").value=json.results[0].formatted_address
                })
            
             
        },null,null);
}
function calcDistance(mk1,mk2){
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.lat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.lat* (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng-mk1.lng) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
  
}
function updateLoadedFiles(text,ext){
    searchRegExp = /\\n/g;
    text=text.replace(searchRegExp,"\n")
    var box=new HContainer("","ubox");
        var overlaybox=new HStack("overlay","");
        var overlay=new Center();
        overlaybox.setWidth("80px");
        overlaybox.setHeight("100px");
        overlaybox.add(overlay.getDiv())
        var vbox=new VBox("centered-col");
        var label=new HLabel(text,"","",new FontSetting("2.5px","grey"));
        var label2=new HLabel(ext,"","",new FontSetting("8px","grey"));
        box.setWidth("80px");
        box.setHeight("100px");
        
        box.addAll([label.getDiv(),overlaybox.getDiv()]);

        vbox.addAll([box.getDiv(),label2.getDiv()])
        label2.getDiv().style.textAlign="center"
        document.getElementById("loaded").appendChild(vbox.getDiv());
        if(ext.includes("txt"))parseFile(text);//else parseJson(text)
        var n=JourneyIndex;
        JourneyView[`${n}`]=false;
        click(overlay)
        function click(div) {
            const icon=new HIcon("fa","","fa-eye","20px","black") 
            const icon2=new HIcon("fa","","fa-eye-slash","20px","black")
            icon.hide()
            icon2.hide()

            div.addAll([icon.getDiv(),icon2.getDiv()]);
            box.onClick(()=>{
                console.log("click "+n);
                if(JourneyView[`${n}`]==false){
                    JourneyView[`${n}`]=true;
                    icon.show();
                    icon2.hide()
                   
                    
                }
                else {
                    JourneyView[`${n}`]=false
                    icon2.show();
                    icon.hide()
                }
                drawPolyLinesFromStored();
            })
        }
}

var cameraFocus={
    zoom:12,
    lnglat:{}
}
function exportProject(){
    cameraFocus.lnglat={
        lat:map.getCenter().lat(),
        lng:map.getCenter().lng(),
    }
    cameraFocus.zoom=map.getZoom();
    var tempM=[];
    for (const [k, m] of Object.entries(markers)) {
        tempM.push(
            {
                position:m.getPosition(),
                icon:m.getIcon(),
                draggable:m.getDraggable(),
                id:m.id
            }
        )
    }
    var nodes=[];
    NodePath.forEach(n=>{
        nodes.push({
            'journey':n.journey,
            'id':n.id
        })
    })
    var data={
        filename:"",
        polylineDrawer:{
           currentJourney:nodes,
           currentNode:currentNode
        },
        uploadedFiles:uploadedFiles,
        checkpoints:{
            waypoints:WayPoints,
            waypointsView:WayPointsView
        },
        cameraFocus:cameraFocus,
        markers:tempM,
        icons:icons
    }
    console.log(data);
   // uploadedFiles.clear();
    var filename = prompt("Please enter project name", "Project name");
    data.filename=filename;
        if (filename != null) {
            download(JSON.stringify(data),filename+".json",'octet/stream')
        }
        else{
            download(JSON.stringify(data),`${new Date().toLocaleDateString().replace(" ","_")}_project.json`,'octet/stream')
        }
}
window.onload = function() {
    var reloading = localStorage.getItem("import");
    if (reloading) {
        localStorage.removeItem("import");
        importProject();
    }
}

function onimport() {
    localStorage.setItem("import", "true");
    document.location.reload();
}
function importProject(){
   
    uploadedFiles=[];
    console.log('importing');
    try {
        uploadFile(
            (txt,ext)=>{
                var json=JSON.parse(txt);
                moveToLocation(json.cameraFocus.lnglat.lat,json.cameraFocus.lnglat.lng);
                map.setZoom(json.cameraFocus.zoom);
                 currentNode=json.currentNode;

                 NodePath=[];
                 json.polylineDrawer.currentJourney.forEach(
                     cj=>{
                             
                            var temp = new google.maps.Polyline({
                                        path:[],
                                        strokeColor:activeColor,
                                    strokeOpacity: 1.0,
                                        strokeWeight: 3,
                                    
                                });
                                poly=temp;
                                poly.setMap(map)
                         NodePath.push(
                             {
                                 "journey":cj.journey,
                                 "id":cj.id,
                                 "polyline":temp
                             }
                         )
                     }
                 );
                 Journey={
                     name:"",
                     color:activeColor,
                     return:false,
                 }
                 if(json.polylineDrawer.currentJourney[currentNode]!=undefined)
                Journey=json.polylineDrawer.currentJourney[currentNode];
                updateNodeElem();
                $('#journeyTitle').val(Journey.name)
                $('#pColor').val(Journey.color)
                document.getElementById("pcolor-sample").style.backgroundColor=Journey.color;
                $('#journey-type').attr('checked',Journey.return)
                drawPolylines();
                json.uploadedFiles.forEach(e=>{
                    updateLoadedFiles(e.data,e.filename)
                })
        
                json.markers.forEach(m=>{placeMarker(m)});
                
                WayPoints=json.checkpoints.waypoints;
                WayPointsView=json.checkpoints.waypointsView;
               

                icons=json.icons;
                loadIcons();
                waypointsetup()
                console.log("imported succesfully");

                
            }
        )
        
    } catch (error) {
     console.log("An error Occured");   
    }
    
}
