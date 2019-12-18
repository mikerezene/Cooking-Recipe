export class ProfileModel{
    public id:string;
    public username: string;
    public password: string;
    public firstname:string;
    public lastname:string;
    public about:string;
    public imagePath:string


 constructor(id:string,username:string,password:string,firstname:string,lastname:string,about:string,imagePath:string){
this.id = id,
this.username = username,
this.password = password,
this.firstname = firstname,
this.lastname = lastname,
this.about = about
this.imagePath = imagePath;

 }

}