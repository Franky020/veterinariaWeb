import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'http://localhost:3000/vet/post';
  constructor(private http:HttpClient) { }


  getPosts(){
    return this.http.get<any>(this.url);
  }

  getPost(id:string){
    return this.http.get<any>(this.url+'/'+id);
  }

  addPost(
    title: string,
    description: string,
    image: File  ){
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', image);
    return this.http.post<any>(this.url, fd);
  }
  editPost(id:string, title:string, description:string, image:File ){
      
      const fd = new FormData();
      fd.append('id', id);
      fd.append('title', title);
      fd.append('description', description);
      fd.append('image', image);
      return this.http.put<any>(this.url+'/'+id, fd);
    }

  deletePost(id:string){
    return this.http.delete<any>(this.url+'/'+id);
  }
}
