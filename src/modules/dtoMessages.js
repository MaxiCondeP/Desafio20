export class MessageDTO{
    
    constructor(message){
        this.email=message.author.email;
        this.message= message.text;
        this.date=message.date;
        this.avatar=message.author.avatar;
    }
}