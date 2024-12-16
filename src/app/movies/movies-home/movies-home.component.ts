import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-movies-home',
  templateUrl: './movies-home.component.html',
  styleUrls: ['./movies-home.component.css']
})
export class MoviesHomeComponent implements OnInit {

  showCategories: boolean = true;
  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.updateShowCategories();
    });

    // İlk yüklemede de kontrol edin
    this.updateShowCategories();
  }


  private updateShowCategories(): void {
    const currentRoute = this.router.url;

    // 'create' ve 'details' rotalarını kontrol et
    this.showCategories = 
      !currentRoute.includes('/create') && 
      !currentRoute.match(/\/movies\/[^\/]+$/); // Tüm geçerli movieId'leri yakala
  }
}
