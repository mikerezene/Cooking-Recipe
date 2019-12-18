export class Recipe{
    id:String;
    title:String;
    username:String;
    discription:String;
    step0:String;
    step1:String;
    step2:String;
    step3:String;
    step4:String;
    step5:String;
    rate:number;
    imagePath1:String;
    imagePath2:String;
    imagePath3:String;
    imagePath4:String;
    imagePath5:String;
    imagePath6:String;
    arrayStar: Number[];
    arrayNoStar: Number[];

constructor(id:String,title:String,username:String,discription:String,step0:String,step1:String,step2:String,
step3:String,step4:String,step5:String,
rate:number,imagePath1:String,imagePath2:String,imagePath3:String,imagePath4:String,imagePath5:String,imagePath6:String){
    this.id = id;
    this.title = title;
    this.username = username;
    this.discription = discription;
    this.step0 = step0;
    this.step1 = step1;
    this.step2 = step2;
    this.step3 = step3;
    this.step4 = step4;
    this.step5 = step5;
    this.rate = rate;
    this.imagePath1 = imagePath1;
    this.imagePath2 = imagePath2;
    this.imagePath3 = imagePath3;
    this.imagePath4 = imagePath4;
    this.imagePath5 = imagePath5;
    this.imagePath6 = imagePath6;
    
}


}

