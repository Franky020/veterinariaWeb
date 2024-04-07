import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

//services
import { PostService } from '../../services/post.service';

//material elements
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule, MatPaginator, MatTableModule, MatFormFieldModule, CommonModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  displayedColumns: string[] = ['id', 'title','description', 'date', 'image','action'];
  dataSource: any;
  editData: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  isadd = false;
  isedit = false;

  posts: any;

  post = {
    id: '',
    title: '',
    description: '',
    date: '',
    image: ''
  }
  image: any;

  constructor(private postService: PostService, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.get_Posts();
  }

  get_Posts() {
    this.postService.getPosts().subscribe(res => {
      this.posts = res;
      this.dataSource = new MatTableDataSource<any>(this.posts.posts);
      this.dataSource.paginator = this.paginator;
    });
  }

  //form creation 
  postForm = this.builder.group({
    id: [{ value: 0, disabled: true }],
    title: ['', Validators.required],
    description: ['', Validators.required],
    image: ['', Validators.required]
  });

  addPost() {
    this.isadd = true;
    this.isedit = false;
  }
  backtolist() {
    this.get_Posts();
    this.isadd = false;
    this.isedit = false;

    this.postForm.reset();

  }

  savePost() {
    debugger;
      if(this.isadd){
        this.postService.addPost(
          this.post.title,
          this.post.description,
          this.image
        ).subscribe(res => {
          alert('Post agregado correctamente');
          this.backtolist();
        },
          err => {
            alert('Error agregando el post');
          });
      } else{
        this.postService.editPost(
          this.post.id,
          this.post.title,
          this.post.description,
          this.image
        ).subscribe(res => {
          alert('Post editado correctamente');
          this.backtolist();
        },
          err => {
            alert('Error editando el post');
          });
      
      }
  }



  fotoSeleccionada1(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.image = <File>event.target.files[0];
    }
  }

  showPostEdit(id: string) {
    this.postService.getPost(id).subscribe(res => {
      this.editData = res;
      this.post.image = res.post.image;

      this.postForm.setValue({
        id: this.editData.post._id,
        title: this.editData.post.title,
        description: this.editData.post.description,
        image: this.editData.post.image
        
      });
    });
    this.isedit = true;

  }

  deletePost(id: string) {
    if (confirm('¿Estás seguro de eliminar este post?')) {
      this.postService.deletePost(id).subscribe(res => {
        alert('Post eliminado correctamente');
        this.get_Posts()
       },
        err => {
          alert('Error eliminando el post');
      });
    }
  }

}
