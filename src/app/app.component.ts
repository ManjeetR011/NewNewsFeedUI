import { Component,ViewChild,AfterViewInit,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsApiService } from './my-newsapp-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, AfterViewInit {
  public displayedColumns = ['Title', 'Author', 'News Article Link'];
  constructor(private http: HttpClient, private apiService: NewsApiService) {

  }
  public dataSource = new MatTableDataSource<Post>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.apiService.getPosts()
    .subscribe({
      next: (result) => {
        this.dataSource.data = result;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => console.info('Get post completed')
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
export interface Post{
  id: string;
  title: string;
  url: URL;
}

