import { NgModule } from "@angular/core";
import { MovieCreateComponent } from "./movie-create/movie-create.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { MovieFilterPipe } from "./movie-filter.pipe";
import { MoviesHomeComponent } from "./movies-home/movies-home.component";
import { MoviesComponent } from "./movies.component";
import { SummaryPipe } from "./summary.pipe";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MoviesRoutingModule } from "./movies-routing.module";
import { CategoriesModule } from "../category/categories.module";
import { SharedModule } from "../shared/shared.module";
import { MyListComponent } from './my-list/my-list.component';


@NgModule({
    declarations : [
        MoviesComponent,
        MovieDetailsComponent,
        SummaryPipe,
        MovieFilterPipe,
        MovieCreateComponent,
        MoviesHomeComponent,
        MyListComponent,
    ],
    imports :[
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        MoviesRoutingModule,
        CategoriesModule,
        SharedModule
    ],
    exports : [
        MoviesComponent,
        MovieDetailsComponent,
        SummaryPipe,
        MovieFilterPipe,
        MovieCreateComponent,
        MoviesHomeComponent,
        MyListComponent,
    ]
})
export class MoviesModule {

}