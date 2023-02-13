import { Component,OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../services/auth.service';
import { DataStorageService } from '../services/data-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit,OnDestroy {
  constructor(private data: DataStorageService,private auth:AuthService) {}
isAuthenticated=false
private userSub:Subscription

  ngOnInit(): void {
    this.userSub=this.auth.user.subscribe(user=>{
      this.isAuthenticated=!!user
      console.log(!user);
      console.log(!!user);

      
    })
  }


  saveResponse() {
    this.data.storeRecipes();
  }

  fetchResponse() {
    this.data.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    
  }
}
