import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {


  constructor(private http:HttpClient) { }
  getPosts(){
     return this.http.get<any[]>('/api/stories');
  }
  searchPosts(params: any){
   return this.http.get<any[]>('/api/Stories/Search',{params});
  }

}
