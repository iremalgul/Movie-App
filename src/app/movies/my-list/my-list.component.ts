import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css'],
  providers: [MovieService]
})
export class MyListComponent implements OnInit {

  title = "My List";
  movieList : string[] = []
  userId: string;
  loading: boolean = false;
  movies: Movie[] = [];  
  filterText: string = "";
  FilteredMovies: Movie[] = [];
  error: any;
  
  constructor( 
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private alertify: AlertifyService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (user) {
        this.userId = user.id;
          
        this.loading = true;
          
          // Kullanıcının listesinde bulunan film ID'lerini alıyoruz
        this.movieService.getList(this.userId).subscribe(data => {
          this.movieList = data;  // Gelen film ID'lerini movieList'e atıyoruz
          

          // Tüm film verilerini aynı anda almak için forkJoin kullanıyoruz
        const movieRequests = this.movieList.map(movieId =>
          this.movieService.getMovieById(movieId)
        );

        forkJoin(movieRequests).subscribe(movies => {
          this.movies = movies;
          this.FilteredMovies = [...this.movies];
          console.log("Loaded movies:", this.movies); // Burada ID'leri kontrol edin
          this.loading = false;
        });

            // Her bir film ID'si için film verilerini alıyoruz
          // this.movieList.forEach(movieId => {
          //   this.movieService.getMovieById(movieId).subscribe(movie => {
          //     this.movies.push(movie);  // Filmleri movies dizisine ekliyoruz
          //     });
          //   });
  
            //this.loading = false;
        });
      }
    });
  }


  removeFromList(movie: Movie){
    this.movieService
    .removeFromList({ userId: this.userId, movieId: movie.id })
    .subscribe(() => {
      this.alertify.error(movie.title + ' listeden çıkarıldı.');

      // movies dizisinden çıkarılan filmi kaldır
      this.movies = this.movies.filter(m => m.id !== movie.id);
      this.FilteredMovies = this.FilteredMovies.filter(m => m.id !== movie.id);
    });
  }

  getButtonState(movie: Movie){
    return this.movieList.findIndex(m => m === movie.id) > -1
  }

  onInputChange() {
    const filter = this.filterText.toLowerCase();
    this.FilteredMovies = this.filterText
      ? this.movies.filter(m =>
          m.title.toLowerCase().includes(filter) ||
          m.description.toLowerCase().includes(filter)
        )
      : this.movies;
  }
    
}
