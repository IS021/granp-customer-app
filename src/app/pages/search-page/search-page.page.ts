import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-serach-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SerachPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
