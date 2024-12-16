import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertifyService } from 'src/app/shared/alertify.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  providers: [MovieService]
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie;
  loading: boolean = false;
  userId : string
  movieList : string[] = []

  constructor(private movieService: MovieService,
              private activatedRoute: ActivatedRoute,
              private authService : AuthService,
              private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if(user){
        this.userId = user.id
        this.activatedRoute.params.subscribe(params => {
          this.loading = true;
          this.movieService.getMovieById(params["movieId"]).subscribe(data => {
            this.movie= data;

            this.movieService.getList(this.userId).subscribe(data => {
              this.movieList = data
              console.log(this.movieList)
            })

            this.loading = false;
          })
        })
      } 
    })
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
