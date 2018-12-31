# angular-nestjs
angular nestjs application
img = >page d'accueil 
img3 => ajout d'un user (il doit entrer son nom et son email puis valider le formulaire)
img6 => afficher le post ajoute 
img4 => liste des post si vous cliquer sur supprimer le post va etre supprimer
img2 => ajout d'un post pour un utilisateur 
img5 => liste des users si vous cliquer sur supprimer l'utilisateur va etre supprimer

Cote serveur 
*********************** app module ***************************************
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UsersModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
service => ensemble des tâches nécessaires au fonctionnement de l'application
*************************users service //constructeur methode...*********************
export class UsersService {
  private users: User[] = [];

  constructor() {
    this.users = new Array(100)
      .fill(1)
      .map((e, i) => {
        return {
          id: i + 1,
          name: faker.name.findName(),
          email: faker.internet.email(),
        };
      });
  }
  public getAll(): User[] {
    return this.users;
  }
  public getById(id: number): User {
    const user = this.users.find(users => users.id == id);
    return user;
  }
  public remove(id: number): any {
    this.users = this.users.filter(users => users.id !== id);
    return id;
  }
  public save(user: User): User {
    const userl = this.users.length;
    if (this.users.length > 0) {
      user.id = (this.users[userl - 1].id + 1);
    } else {
      user.id = 1;
    }
    this.users.push(user);
    return user;}}
******************************** User Component ************************************************
export class UsersController {
  constructor(private userService: UsersService) {
  }
  @Get()
  getAll(): User[] {
    return this.userService.getAll();
  }
  @Get(':id')
  findOne(@Param('id') id): User {
    return this.userService.getById(id);
  }
  @Delete(':id')
  remove(@Param('id') id) {
    return this.userService.remove(id);
  }
  @Post()
  add(@Body() user: User): User {
    // console.log(user);
    return this.userService.save(user);
  }
}

Cote Client
*********************** app module ***************************************
// declaration des components user post.....
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    UsersComponent,
    UserMainComponent,
    PostsComponent,
    AddPostsComponent,
    MainPostComponent,
    UserAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTableModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})


