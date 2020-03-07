import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdeaService, Idea } from 'src/app/services/idea.service';
import { ToastController } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.page.html',
  styleUrls: ['./idea-details.page.scss'],
})
export class IdeaDetailsPage implements OnInit {

  idea: Idea = {
    name: '',
    notes: '',
  };
  constructor(private activatedRoute: ActivatedRoute, private ideaService: IdeaService,
    private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
    let id =this.activatedRoute.snapshot.paramMap.get('id');
    if (id){
      this.ideaService.getIdea(id).subscribe(idea => {
        this.idea = idea;
      });
    }
  }

  addIdea(){
    this.ideaService.addIdea(this.idea).then(() =>{
      this.router.navigateByUrl('/');
      this.showToast('Nota agregada');
    }, err => {
      this.showToast('Hubo un problema agregando tu idea :(');
    });
  }

  deleteIdea(){
    this.ideaService.deleteIdea(this.idea.id).then(() =>{
      this.router.navigateByUrl('/');
      this.showToast('Nota eliminada');
    }, err => {
      this.showToast('Hubo un problema en la eliminacion de tu idea :(');
    });
  }

  updateIdea(){
    this.ideaService.updateIdea(this.idea).then(() =>{
      this.showToast('Nota actualizada');
    }, err => {
      this.showToast('Hubo un problema en la actualizacion de tu idea :(');
    });
  }


  showToast(msg){
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
