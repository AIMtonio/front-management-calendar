// angular import
import { Component, OnInit } from '@angular/core';



// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-sample-page',
  imports: [SharedModule],
  templateUrl: './events-management.component.html',
  styleUrls: ['./events-management-component.scss']
})
export default class SamplePageComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}


