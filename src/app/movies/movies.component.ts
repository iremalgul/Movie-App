import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from './movie.model';
import { AlertifyService } from '../shared/alertify.service';
import { MovieService } from './movie.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MovieService]
})
export class MoviesComponent implements OnInit {

  title = "Film Listesi";
  movies: Movie[] = [];
  FilteredMovies: Movie[] = [];
  userId : string
  movieList : string[] = []

  filterText: string = "";
  error: any;

  loading: boolean = false;

  constructor(
    private alertify: AlertifyService,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private authService : AuthService) {
  }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if(user){
        this.userId = user.id
        this.activatedRoute.params.subscribe(params => {

          this.loading = true;
    
          this.movieService.getMovies(params["categoryId"]).subscribe(data => {
            this.movies = data;
            this.FilteredMovies = this.movies;
  
            this.movieService.getList(this.userId).subscribe(data => {
              this.movieList = data
              console.log(this.movieList)
            })
  
  
            this.loading = false;
          }, error => {
            this.error = error;
            this.loading = false;
          });
        });
      }
      
    })

    
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

  addToList($event: any, movie: Movie) {
    if($event.target.classList.contains('btn-primary')) {
      $event.target.innerText = "Listeden Çıkar";
      $event.target.classList.remove('btn-primary');
      $event.target.classList.add('btn-danger');

      this.movieService
        .addToMyList({userId: this.userId, movieId: movie.id})
        .subscribe(() => this.alertify.success(movie.title + ' listene eklendi'))
    
      
    } else {
      $event.target.innerText = "Listeye Ekle";
      $event.target.classList.remove('btn-danger');
      $event.target.classList.add('btn-primary');

      this.movieService
        .removeFromList({userId: this.userId, movieId: movie.id})
        .subscribe(() => this.alertify.error(movie.title + ' listeden çıkarıldı.'))
      
    }
  }

  getButtonState(movie: Movie){
    return this.movieList.findIndex(m => m === movie.id) > -1
  }



}
