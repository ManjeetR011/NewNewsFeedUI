import { Component,Inject,NgModule,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsApiService } from './my-newsapp-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  posts: any[] = [];
  searchString = '';
  page = 1;
  
  constructor(private http: HttpClient, private apiService: NewsApiService) {

  }

  ngOnInit() {
    this.apiService.getPosts()
    .subscribe({
      next: (result) => {
        this.posts = result;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => console.info('Get post completed')
    });
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveData();
  }

  retrieveData(): void {
    let params: any = {}
    params["searchString"] = this.searchString;
    params["pageNum"] = this.page;
    this.apiService.searchPosts(params)
    .subscribe({
     next: (data) => {
     this.posts = data;
    console.log(data);
     },
    error: (err) => {
     console.log(err);
    }
    });
  }
  searchPosts(): void {
      this.page = 1;

    this.retrieveData();
  }
}
interface Post {
  authorId: string;
  author: string;
  count: number;
}
