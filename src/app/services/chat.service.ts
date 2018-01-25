import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import {Observable} from 'rxjs/Observable';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthService} from '../services/auth.service';
import * as  firebase from 'firebase/app';

//model import
import {ChatMessage} from '../models/chat-message.models';




@Injectable()
export class ChatService {

  user:any;
  ChatMessages: FirebaseListObservable<ChatMessage[]>;
  chatMessage: ChatMessage;
  userName : Observable<string>;

  constructor(
     private db: AngularFireDatabase,
     private afAuth: AngularFireAuth) {
    // this.afAuth.authState.subscribe(auth =>{
    //   if(auth !==undefined && auth !== null)
    //   {
    //     this.user = auth;
    //   }
    // });

   }

sendMessage(msg: string)
{
  const timestamp = this.getTimeStamp();
  const email = this.user.email;
  this.ChatMessages = this.getMessages();
  this.ChatMessages.push({
    message:msg,
    timeSent: timestamp,
    userName: this.userName,
    email: email
  });
  console.log("messages send");

}

getTimeStamp()
{
  const now = new Date();
  const date = now.getUTCFullYear() + '/' +
               (now.getUTCMonth()+1) + '/' +
               now.getUTCDate();

  const time = now.getUTCHours() + '/' +
              (now.getUTCMinutes()+1) + '/' +
              now.getUTCSeconds();
  return (date + ' '+ time);
}

getMessages(): FirebaseListObservable<ChatMessage[]>{

  return this.db.list('messages',{
    query:{
      limitToLast:25,
      orderByKey: true
    }
  });
}

}
