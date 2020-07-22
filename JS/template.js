
class FontSetting{
    constructor(fontSize="14px",color="white",family="helvetica",weight="normal")
    {
        this.family=family;
        this.color=color;
        this.size=fontSize;
        this.weigth=weight;
    }
    get getSetting(){
        return {
            "size":this.size,
            "color":this.color,
            "family":this.family,
            "weight":this.weight
        }
    }
     setSetting(){
        switch(key){
            case "size":this.size=value;break;
            case "color":this.color=value;break;
            case "family":this.family=value;break;
            case "weight":this.weight=value;break;
            default:break;
        }
    }
}
class HElement{
    constructor(c,id){
        
        this.c=c;
        this.id=id;

    }
    setHeight(height){
        
    }
    setWidth(width){

    }
    addNewClass(classname){
        this.c=" "+classname;
    }
    removeClass(classname){
        this.c.replace(classname,"")
    }
    addAll(parent,children=[]){
        children.forEach(elem=>{
            parent.appendChild(elem);
        });
    }
    add(parent,child){
        parent.appendChild(child);
    }
    onClick(action){}
    clear(){
     
    }
    
}
class HContainer extends HElement{
    constructor(c,id){
        super(c,id);
        this.c=c;
        this.id=id;
      
        this.createDiv();
    }
     setAlignment(alignment){
        this.alignment=alignment;
        this.cont.setAttribute("class",this.c);
    }
    createDiv(alignment){

        var div=document.createElement("div");

        div.setAttribute("class",this.c);
        div.setAttribute("id",this.id);
        this.cont=div;
    }
    getDiv(){
        return this.cont;
    }
    addAll(children=[]){
        children.forEach(elem=>{
            this.cont.appendChild(elem);
        });
    }
    add(child){
        this.cont.appendChild(child);
    }
    setHeight(height){
        this.cont.style.height=height;
    }
    setWidth(width){
        this.cont.style.width=width;
    }
    onClick(action){
        this.cont.addEventListener("click",action)
    }
    clear(){
        this.cont.innerHTML=""
    }
    hide(){
        this.cont.style.display="none"
    }
    show(){
        this.cont.style.display="block"
    }
    
}
class HBox extends HElement{
    constructor(c="",id="",alignment="space-between"){
        super(c,id);
        this.c=c;
        this.id=id;
        this.alignment=alignment;
        this.createDiv(this.alignment);
    }
    setAlignment(alignment="space-between"){
        this.alignment=alignment;
        this.hbox.setAttribute("class",this.c+" "+alignment+"-row flex-wrap");
    }
    createDiv(alignment){

        var div=document.createElement("div");
        div.setAttribute("class",!this.c.includes("sp")?this.c+" "+this.alignment+"-row":"_row");
        div.setAttribute("id",this.id);
      
        this.hbox=div;
    }
    getDiv(){
        return this.hbox;
    }
    setPadding(val){
        this.hbox.style.padding=val+"px";
    }
    setPaddingLTRB(left,right,top,bottom){
        this.hbox.style.paddingLeft=left+"px";
        this.hbox.style.paddingRight=right+"px";
        this.hbox.style.paddingTop=top+"px";
        this.hbox.style.paddingBottom=bottom+"px";
    }
    setBackgroundImage(image){
        this.hbox.style.backgroundImage=image;
    }
    setBackgroundColor(color){
        this.hbox.style.backgroundColor=color;
    }
    setBackgroundSize(size="cover")
    {
        this.hbox.style.backgroundSize=size
    }
    setBackgroundBlend(blendmode){
        this.hbox.style.backgroundBlendMode=blendmode;
    }
    setFilter(filter){
        this.hbox.style.filter=filter
    }
    addAll(children=[]){
        children.forEach(elem=>{  
            if(this.c.includes("sp")){
            var spacing=this.c.split("-")[1];
            
            elem.style.marginRight=spacing+"px";
        }
            this.hbox.appendChild(elem);
        });
    }
    add(child){
        this.hbox.appendChild(child);
    }
    setWidth(width){
        this.hbox.style.width=width;
    }
    setHeight(height){
        this.hbox.style.height=height;
    }
    clear(){
        this.hbox.innerHTML=""
    }
    hide(){
        this.hbox.style.display="none"
    }
    show(){
        this.hbox.style.display="block"
    }
    onClick(action){
        this.hbox.addEventListener("click",action)
    }
   
}
class VBox extends HElement{
    constructor(c,id,alignment="space-between"){
        super(c,id);
        this.c=c;
        this.id=id;
        this.alignment=alignment;
        this.createDiv(this.alignment);
    }
    set setAlignment(alignment="space-between"){
        this.alignment=alignment;
        this.flex.setAttribute("class",this.c+" "+alignment+"-row flex-wrap");
    }
    setPadding(val){
        this.vbox.style.padding=val+"px";
    }
    setPaddingLTRB(left,right,top,bottom){
        this.vbox.style.paddingLeft=left+"px";
        this.vbox.style.paddingRight=right+"px";
        this.vbox.style.paddingTop=top+"px";
        this.vbox.style.paddingBottom=bottom+"px";
    }
    setWidth(width){
        this.vbox.style.width=width;
    }
    setHeight(height){
        this.vbox.style.height=height;
    }
    createDiv(alignment){

        var div=document.createElement("div");
        div.setAttribute("class",this.c+" "+alignment+"-col");
        div.setAttribute("id",this.id);
       this.vbox=div;
    }
    getDiv(){
        return this.vbox;
    }
    setBackgroundImage(image){
        this.vbox.style.backgroundImage=image;
    }
    setBackgroundColor(color){
        this.vbox.style.backgroundColor=color;
    }
    setBackgroundSize(size="cover")
    {
        this.vbox.style.backgroundSize=size
    }
    setBackgroundBlend(blendmode){
        this.vbox.style.backgroundBlendMode=blendmode;
    }
    setFilter(filter){
        this.vbox.style.filter=filter
    }
    addAll(children=[]){
        children.forEach(elem=>{
            this.vbox.appendChild(elem);
        });
    }
    add(child){
        this.vbox.appendChild(child);
    }
    clear(){
        this.vbox.innerHTML=""
    }
    hide(){
        this.vbox.style.display="none"
    }
    show(){
        this.vbox.style.display="block"
    }
    onClick(action){
        this.vbox.addEventListener("click",action)
    }
    
}
class FlexBox extends HElement{
    constructor(c,id,alignment="space-between"){
        super(c,id);
        this.c=c;
        this.id=id;
        this.alignment=alignment;
        this.createDiv(this.alignment);
    }
    setAlignment(alignment="space-between"){
        this.alignment=alignment;
        this.flex.setAttribute("class",this.c+" "+alignment+"-row flex-wrap");
    }
    createDiv(alignment){

        var div=document.createElement("div");
        div.setAttribute("class",this.c+" "+alignment+"-row flex-wrap");
        div.setAttribute("id",this.id);
       this.flex=div;
    }
    setBackgroundImage(image){
        this.flex.style.backgroundImage=image;
    }
    setBackgroundColor(color){
        this.flex.style.backgroundColor=color;
    }
    setBackgroundSize(size="cover")
    {
        this.flex.style.backgroundSize=size
    }
    setBackgroundBlend(blendmode){
        this.flex.style.backgroundBlendMode=blendmode;
    }
    setFilter(filter){
        this.flex.style.filter=filter
    }
    getDiv(){
        return this.flex;
    }
    setHeight(height){
        this.flex.style.height=height;
    }
    setWidth(width){
        this.flex.style.width=width;
    }
    addAll(children=[]){
        children.forEach(elem=>{
            this.flex.appendChild(elem);
        });
    }
    add(child){
        this.flex.appendChild(child);
    }
    clear(){
        this.flex.innerHTML=""
    }
    onClick(action){
        this.flex.addEventListener("click",action)
    }
}

class HStack extends HElement{
    constructor(c,id,z_index){
        super(c,id);
        this.c=c;
        this.id=id;
        this.z_index=z_index;
        this.createDiv(this.alignment);
    }
    clear(){
        this.stack.innerHTML=""
    }
    
    createDiv(){

        var div=document.createElement("div");
        div.setAttribute("class",this.c);
        div.setAttribute("style","z-index: "+this.z_index+";position:absolute");
        div.setAttribute("id",this.id);
       this.stack=div;
    }
    setHeight(height){
        this.stack.style.height=height;
    }
    setWidth(width){
        this.stack.style.width=width;
    }
    getDiv(){
        return this.stack;
    }
    setBackgroundImage(image){
        this.stack.style.backgroundImage=image;
    }
    setBackgroundPosition(pos="center"){
        this.stack.style.backgroundPosition=pos;
    }
    setBackgroundColor(color){
        this.stack.style.backgroundColor=color;
    }
    setBackgroundSize(size="cover")
    {
        this.stack.style.backgroundSize=size
    }
    setBackgroundBlend(blendmode){
        this.stack.style.backgroundBlendMode=blendmode;
    }
    setFilter(filter){
        this.stack.style.filter=filter
    }
    addAll(children=[]){
        children.forEach(elem=>{
            this.stack.appendChild(elem);
        });
    }
    setAlignment(alignment="auto"){
        this.divider.style.margin=alignment;
    }
    add(child){
        this.stack.appendChild(child);
    }
    onClick(action){
        this.stack.addEventListener("click",action)
    }
}
class RelativeBox extends HElement{
    constructor(c,id,z_index){
        super(c,id);
        this.c=c;
        this.id=id;
        this.z_index=z_index;
        this.createDiv(this.alignment);
    }
    
    createDiv(){

        var div=document.createElement("div");
        div.setAttribute("class",this.c);
        div.setAttribute("style","z-index: "+this.z_index+";position:relative");
        div.setAttribute("id",this.id);
       this.res=div;
    }
    getDiv(){
        return this.res;
    }
    setBackgroundImage(image){
        this.res.style.backgroundImage=image;
    }
    setBackgroundColor(color){
        this.res.style.backgroundColor=color;
    }
    setBackgroundSize(size="cover")
    {
        this.res.style.backgroundSize=size
    }
    setBackgroundBlend(blendmode){
        this.res.style.backgroundBlendMode=blendmode;
    }
    setFilter(filter){
        this.res.style.filter=filter
    }
    addAll(children=[]){
        children.forEach(elem=>{
            this.res.appendChild(elem);
        });
    }
    add(child){
        this.res.appendChild(child);
    }
    setHeight(height){
        this.res.style.height=height;
    }
    setWidth(width){
        this.res.style.width=width;
    }
    onClick(action){
        this.res.addEventListener("click",action)
    }
    clear(){
        this.res.innerHTML=""
    }
}
class HImage extends HElement{
    constructor(c,id){
        super(c,id);
        this.c=c;
        this.id=id;
    }
    createImg(src,w="100%",h="100%",fit="cover",position="center"){
        var img=document.createElement("img");
        img.src=src;
        img.alt="";
        img.style.width=w;
        img.style.height=h;
        img.style.objectFit=fit;
        img.style.objectPosition=position;
        img.style.borderRadius="inherit"
        img.setAttribute("class",this.c);
        img.setAttribute("id",this.id);
        this.img=img
        return img;

    }
    getDiv(){
        return this.img
    }
}

class HCanvas extends HElement{
    constructor(c,id){
        super(c,id);
        this.c=c;
        this.id=id;
        this.createCanvas();
    }
    createCanvas(){
        var canvas=document.createElement("canvas");
    
        canvas.setAttribute("class",this.c);
        canvas.setAttribute("id",this.id);
        this.canvas= canvas;

    }
    addAll(children=[]){
        children.forEach(elem=>{
            this.canvas.appendChild(elem);
        });
    }
    add(child){
        this.canvas.appendChild(child);
    }
    getDiv(){
        return this.canvas;
    }
}
class HTextfield extends HElement{
    constructor(value="",c,id,hint,setting=new FontSetting()){
        super(c,id);
        this.c=c;
        this.id=id;
        this.value=value;
        this.hint=hint;
        this.createTextField(this.value,this.hint);
        this.setFontStyle(setting)
    }
     setText(value=""){
        this.value=value;
        this.textfield.value=this.value;
    }
     getText(){
        return this.textfield.value;
    }
    setHint(value=""){
      
        this.textfield.placeholder=value;
    }
     getHint(){
        return this.textfield.placeHolder;
    }
    setHeight(height){
        this.textfield.style.height=height;
    }
    setWidth(width){
        this.textfield.style.width=width;
    }
    setTextColor(color){
        this.textfield.style.color=color
    }
    setTextAlignment(align){
        this.textfield.style.textAlign=align
    }
   
    setFontStyle(setting=new FontSetting()){
        this.textfield.style.fontSize=setting.size;
        this.textfield.style.color=setting.color;
        this.textfield.style.fontFamily=setting.family;
        this.textfield.style.fontWeight=setting.weight;
       
    }
    onTyping(action){
            this.textfield.addEventListener("keyup",action)
    }
    clearText(){
        this.textfield.value="";
    }

    createTextField(hint=""){
        var input=document.createElement("input");
        input.setAttribute("type","text");
        input.setAttribute("placeholder",hint);
        input.setAttribute("class",this.c);
        input.setAttribute("id",this.id);
        input.value=this.value;
       this.textfield=input;


    }
    createPasswordField(hint=""){
        var input=document.createElement("input");
        input.setAttribute("type","password");
        input.setAttribute("placeholder",hint);
        input.setAttribute("class",this.c);
        input.setAttribute("id",this.id);
        input.value=this.value;
        this.textfield=input;
        

    }
   
    createNumberField(min,max,hint=""){
        var input=document.createElement("input");
        input.setAttribute("type","number");
        input.setAttribute("min",min);
        input.setAttribute("max",max);
        input.setAttribute("placeholder",hint);
        input.setAttribute("class",this.c);
        input.setAttribute("id",this.id);
        input.value=this.value;
        this.textfield=input;
        

    }
    getDiv(){
        return this.textfield;
    }
}
class HTextarea extends HElement {
    constructor(value, c, id, hint, setting = new FontSetting()) {
        super(c, id);
        this.c = c;
        this.id = id;
        this.value = value;
        this.hint = hint;
        this.createTextArea(this.value, this.hint);
        this.setFontStyle(setting)
    }
    set setText(value = "") {
        this.value = value;
        this.textfield.value = this.value;
    }
    get getText() {
        return this.textfield.value;
    }
    set setHint(value = "") {
        this.value = value;
        this.textfield.placeholder = this.value;
    }
    get getHint() {
        return this.textfield.placeHolder;
    }
    setHeight(height) {
        this.textfield.style.height = height + "px";
    }
    setWidth() {
        this.textfield.style.width = width + "px";
    }
    setTextColor(color) {
        this.textfield.style.color = color
    }
    setTextAlignment(align) {
        this.textfield.style.textAlign = align
    }
    setFontStyle(setting = new FontSetting()) {
        this.textfield.style.fontSize = setting.size;
        this.textfield.style.color = setting.color;
        this.textfield.style.fontFamily = setting.family;
        this.textfield.style.fontWeight = setting.weight;

    }
    clearText() {
        this.textfield.value = "";
    }

    createTextArea(hint = "") {
        var input = document.createElement("textarea");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", hint);
        input.setAttribute("class", this.c);
        input.setAttribute("id", this.id);
        input.value = this.value;
        this.textfield = input;


    }
    
    getDiv() {
        return this.textfield;
    }
}
class Center extends HElement{
    constructor(c,id){
        super(c,id);
        this.c=c;
        this.id=id;
        this.createDiv()
    }
    createDiv(){

        var div=document.createElement("div");
        div.style.width="100%";
        div.style.height="100%";
        
        div.setAttribute("class"," centered-row");
        var div2=document.createElement("div");
        div2.setAttribute("class"," centered-col");
        
        div.appendChild(div2);
        

       this.cen=document.createElement("div");
       this.cen.style.width="100%";
       this.cen.style.height="100%"
       this.center=document.createElement("div");
       div2.appendChild(this.center);
       this.cen.setAttribute("class",this.c+"");
       this.cen.setAttribute("id",this.id);
       this.cen.appendChild(div);
    }
    getDiv(){
        return this.cen;
    }
    setHeight(height){
        this.cen.style.height=height;
    }
    setWidth(width){
        this.cen.style.width=width;
    }
    addAll(children=[]){
        children.forEach(elem=>{
            this.center.appendChild(elem);
        });
    }
    add(child){
        console.log(child);
        this.center.appendChild(child);
    }
    onClick(action){
        this.cen.addEventListener("click",action)
    }

}
class HIcon extends HElement{
    constructor(c,id,icon,size="14px",color="white"){
        super(c,id);
        this.c=c;
        this.id=id;
        this.icon=icon;
        this.size=size;
        this.color=color;
        this.createIcon(this.icon,this.size,this.color)
    }
    createIcon(icon,fontSize,color){
        var i=document.createElement("i");
        i.setAttribute("class",this.c+" "+icon);
        i.setAttribute("id",this.id);
        i.style.fontSize=fontSize;
        if(color!="css")
        i.style.color=color;
        
       
        this.ic=i;
    }
    setHeight(height){
        this.ic.style.height=height;
    }
    setWidth(width){
        this.ic.style.width=width;
    }
    getDiv(){
        return this.ic;
    }
    onClick(action){
        this.ic.addEventListener("click",action)
    }
    hide(){
        this.ic.style.display="none";
    }
    show(){
        this.ic.style.display="block";
    }
}
 class HButton extends HElement{
     constructor(value, c, id, setting = new FontSetting()) {
         super(c, id);
         this.c = c;
         this.id = id;
         this.value = value;
         this.createButton(this.value);
         if(setting!="css")
         this.setFontStyle(setting)
     }  
    createButton(){
        var button = document.createElement("button");
        button.setAttribute("class", "btn "+this.c);
        button.setAttribute("id", this.id);

        button.textContent = this.value;
        this.btn = button;
    }
    applyCutom(){
        this.btn.classList.remove("btn");
    }
    onClick(action){
        this.btn.addEventListener("click",action)
    }
     setFontStyle(setting = new FontSetting()) {
         this.btn.style.fontSize = setting.size;
         this.btn.style.color = setting.color;
         this.btn.style.fontFamily = setting.family;
         this.btn.style.fontWeight = setting.weight;

     }
     setHeight(height) {
        this.btn.style.height = height;
    }
    setWidth(width) {
        this.btn.style.width = width ;
    }
     getDiv(align) {
         this.btn.style.textAlign = align;
         return this.btn;
     }
}
class HCircleButton extends HButton{
    constructor(value,c,id,setting=new FontSetting()){
        super(value,c, id,setting);
       
        this.btn.setAttribute("class","btn circle-btn "+this.c);
    }
    applyIcon(icon=new HIcon()){
        this.btn.innerHTML=icon.getDiv();
    }
 

}
class HLabel extends HElement{
    constructor(value,c,id,setting=new FontSetting(),special=false){
        super(c,id);
        this.c=c;
        this.id=id;
        this.value=value;
        this.createLabel(this.value);
        if(setting!="css")
        this.setFontStyle(setting);
        this.special=special;
    }
    setFontStyle(setting=new FontSetting()){
        this.lbl.style.fontSize=setting.size;
        this.lbl.style.color=setting.color;
        this.lbl.style.fontFamily=setting.family;
        this.lbl.style.fontWeight=setting.weight;
       
    }
    createLabel(value=""){
        var label=document.createElement("label");
        label.setAttribute("class",this.c);
        label.setAttribute("id",this.id);
        
        if(!this.special)label.textContent=value;
        else {
            label.setAttribute('style', 'white-space: pre;');
        }
        this.lbl=label;
    }
    setText(text){
       this.lbl.textContent.replace("\\n","\\r\\n")
         
        this.lbl.textContent=text;
    }
    setAlignment(alignment="center"){
        this.lbl.style.textAlign=alignment;
    }
    setSpacing(spacing='normal'){
        this.lbl.style.letterSpacing=spacing;
    }
    getDiv(align){
        this.lbl.style.textAlign=align;
        return this.lbl;
    }
    addNewClass(classname){
       
        this.lbl.classList.add(classname)
    }
    removeClass(classname){
        this.lbl.classList.remove(classname)
    }
    fullWidth(){
        this.lbl.style.width="100%"
    }
    setWidth(width){
        this.lbl.style.width=width;
    }
    setStyle(style){
        this.lbl.style.fontStyle=style;
    }
}
class HDivider extends HElement{
    constructor(c,id,width="100%",height="1px",color="color"){
        super(c,id);
        this.c=c;
        this.id=id;
        this.width=width;
        this.height=height;
        this.color=color;
        this.createDivider();
        
    }
   
   
    createDivider(){
        var divider=document.createElement("div");
        divider.setAttribute("class",this.c);
        divider.setAttribute("id",this.id);
        
        divider.style.width=this.width;
        divider.style.height=this.height;
        divider.style.backgroundColor=this.color;
        divider.style.borderRadius=this.radius;

        this.divider=divider;
        this.setAlignment();
    }
    setWidth(width){
        this.divider.style.width=this.width;
    }
    setHeight(height){
        this.divider.style.height=this.height;
    }
    setColor(color){
        this.divider.style.color=this.color;
    }
    setBorderRadius(radius){
        this.divider.style.borderRadius=this.radius;
    }
    setAlignment(alignment="auto"){
        this.divider.style.margin=alignment;
    }
    setSpacing(spacing='normal'){
        this.divider.style.letterSpacing=spacing;
    }
    
    getDiv(align){
        this.divider.style.textAlign=align;
        return this.divider;
    }
    fullWidth(){
        this.divider.style.width="100%"
    }
    addNewClass(classname){
       
        this.divider.classList.add(classname)
    }
    removeClass(classname){
        this.divider.classList.remove(classname)
    }
}
class HListTile extends HElement{
    constructor(c="",id="",alignment="left",leading=new HContainer(),title=new HContainer(),subtitle= new HContainer(),trailing=new HContainer()){
        super(c,id);
        this.c=c;
        this.id=id;
        this.alignment=alignment;
        this.leading=leading;
        this.title=title;
        this.subtitle=subtitle;
        this.trailing=trailing;
        this.createDiv(this.alignment,this.leading,this.title,this.subtitle,this.trailing);
    }
    setAlignment(alignment="left"){
        this.alignment=alignment;
        this.listTile.setAttribute("class",this.c+" "+alignment+"-row flex-wrap");
    }
    createDiv(alignment="left"){

        var div=new HBox(this.c+" "+"left-row",this.id,this.alignment)
        var div2=new HBox(" space-between-row",this.id,"space-between")
        div2.setWidth("100%");
        div2.setAlignment("space-between");
       

        var vbox=new VBox("centered-col");
        vbox.addAll([this.title.getDiv(),this.subtitle.getDiv()])

        var center=new VBox("","","centered")
        div2.addAll([vbox.getDiv()])
        this.leading.getDiv().style.margin="15px"
        if(this.leading)
        div.addAll([this.leading.getDiv(),div2.getDiv()])
        else
        div.addAll([div2.getDiv()])
        if(this.trailing)
        {
            center.add(this.trailing.getDiv())
            div.add(center.getDiv())
        
        }
       div.getDiv().style.width="100%"

      
        this.listTile=div.getDiv();
    }
    getDiv(){
        return this.listTile;
    }
    setPadding(val){
        this.listTile.style.padding=val+"px";
    }
    setPaddingLTRB(left,right,top,bottom){
        this.listTile.style.paddingLeft=left+"px";
        this.listTile.style.paddingRight=right+"px";
        this.listTile.style.paddingTop=top+"px";
        this.listTile.style.paddingBottom=bottom+"px";
    }
    setBackgroundImage(image){
        this.listTile.style.backgroundImage=image;
    }
    setBackgroundColor(color){
        this.listTile.style.backgroundColor=color;
    }
    setBackgroundSize(size="cover")
    {
        this.listTile.style.backgroundSize=size
    }
    setBackgroundBlend(blendmode){
        this.listTile.style.backgroundBlendMode=blendmode;
    }
    setFilter(filter){
        this.listTile.style.filter=filter
    }
    addAll(children=[]){
        children.forEach(elem=>{  
            if(this.c.includes("sp")){
            var spacing=this.c.split("-")[1];
            
            elem.style.marginRight=spacing+"px";
        }
            this.listTile.appendChild(elem);
        });
    }
    add(child){
        this.listTile.appendChild(child);
    }
    setWidth(width){
        this.listTile.style.width=width;
    }
    setHeight(height){
        this.listTile.style.height=height;
    }
    onClick(action){
        this.listTile.addEventListener("click",action)
    }

}
class HSlider extends HElement{
    constructor(value, c, id,max) {
        super(c, id);
        this.c = c;
        this.id = id;
        this.max=max;
        this.value = value;
        this.createSlider();
       
    }  
    createSlider(){
       var slider=new HContainer("range-slider");

       var span = document.createElement("span");
       span.setAttribute("id", "seek-obj-container");
       var progress = document.createElement("input");
       progress.setAttribute("class","range-slider__range")
       progress.setAttribute("type","range")
       progress.setAttribute("id", "slider");
       progress.setAttribute("value", this.value);
       progress.setAttribute("max", this.max);
       progress.setAttribute("step", "1");
       //.appendChild(progress);
       slider.add(progress)
       

      
       this.slider = {"element":slider.getDiv(),"progress":progress};
   }
   setValue(value){
    this.slider.progress.setAttribute("value", this.value);
   }
   setMax(value){
    this.slider.progress.setAttribute("max", this.value);
   }
   getValue(){
       return this.slider.progress.value;
   }
   onClick(action){
       this.slider.addEventListener("click",action)
   }
    
    getDiv() {
        
        return this.slider.element;
    }
}

class HVideo extends HElement{
    constructor(src,c,id,width,height){
        super(c,id);
        this.c=c;
        this.id=id;
        this.width=width;
        this.height=height;
      
        this.createVideo()
    }
    createVideo(){
        var video=document.createElement("video");
        this.source=document.createElement("source");
        this.source.src=this.src;this.source.type="video/mp4"

        video.appendChild(this.source)
        video.setAttribute("class",this.c+" ");
        video.setAttribute("id",this.id);
        video.setAttribute("width",this.width);
        video.setAttribute("height",this.height)
        
        this.video=video;
    }
    setSource(src){
        this.source.src=src;

    }
    setHeight(height){
        this.video.style.height=height;
    }
    setWidth(width){
        this.video.style.width=width;
    }
    setMaxHeight(height){
        this.video.style.maxHeight=height;
    }
    setMaxWidth(width){
        this.video.style.maxWidth=width;
    }
    getDiv(){
        return this.video;
    }
    addAll(children=[]){
        children.forEach(elem=>{  
            if(this.c.includes("sp")){
            var spacing=this.c.split("-")[1];
            
            elem.style.marginRight=spacing+"px";
        }
            this.video.appendChild(elem);
        });
    }
    add(child){
        this.video.appendChild(child);
    }
    onClick(action){
        this.video.addEventListener("click",action)
    }
}