import { Component, inject, Input, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieAltPipe } from '../../pipes/movie-alt.pipe';
import { MoviePosterPipe } from '../../pipes/movie-poster.pipe';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [MovieAltPipe, MoviePosterPipe],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MovieComponent implements OnInit{
  @Input({ required: true }) movieId!: string;
  movie!: Movie;
  movieService = inject(MovieService);

  ngOnInit(): void {
    this.movieService.getCurrentMovie(parseInt(this.movieId)).subscribe({
      next: (movie) => {
        if (!movie) return;
        this.movie = movie;
      },
      error: (err) => {
        console.error('Errore:', err);
      },
    });
//this.movieService.getCurrentMovie(parseInt(this.movieId));
}
}
