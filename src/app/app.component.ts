import {Component, HostListener} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AppService} from "./app.service";
import {subscribeOn} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cars-app';
  priceForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    car: ['', Validators.required],
  })
  carsData: any;
  /*carsData = [
    {
      image: "1.png",
      name: "Lamborghini Huracan Spyder",
      transmission: "Автомат",
      engine: 5.2,
      year: 2019
    },
    {
      image: "2.png",
      name: "Chevrolet Corvette",
      transmission: "Автомат",
      engine: 6.2,
      year: 2017
    },
    {
      image: "3.png",
      name: "Ferrari California",
      transmission: "Автомат",
      engine: 3.9,
      year: 2010
    },
    {
      image: "4.png",
      name: "Lamborghini Urus",
      transmission: "Автомат",
      engine: 4.0,
      year: 2019
    },
    {
      image: "5.png",
      name: "Audi R8",
      transmission: "Автомат",
      engine: 5.2,
      year: 2018
    },
    {
      image: "6.png",
      name: "Chevrolet Camaro",
      transmission: "Автомат",
      engine: 2.0,
      year: 2019
    },
    {
      image: "7.png",
      name: "Maserati Quattroporte",
      transmission: "Автомат",
      engine: 3.0,
      year: 2018
    },
    {
      image: "8.png",
      name: "Dodge Challenger",
      transmission: "Автомат",
      engine: 6.4,
      year: 2019
    },
    {
      image: "9.png",
      name: "Nissan GT-R",
      transmission: "Автомат",
      engine: 3.8,
      year: 2019
    },
  ];*/

  constructor(private fb: FormBuilder, private appService: AppService) {
  }
ngOnInit(){
    this.appService.getData().subscribe(carsData=>this.carsData = carsData)
}
  goScroll(target: HTMLElement, car?: any) {
    target.scrollIntoView({behavior: "smooth"});
    if (car) {
      this.priceForm.patchValue({car: car.name});
    }
  }

  trans: any;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.trans = {transform: 'translate3d(' + ((e.clientX * 0.3) / 8) + 'px,' + ((e.clientY * 0.3) / 8) + 'px,0px)'};
  }

  bgPos: any;

  @HostListener('document:scroll', ['$event'])
  onScroll() {
    this.bgPos = {backgroundPositionX: '0' + (0.3 * window.scrollY) + 'px'};
  }

  onSubmit() {
    if (this.priceForm.valid) {

      this.appService.sendQuery(this.priceForm.value)
        .subscribe(
          {
            next: (response: any) => {
              alert(response.message);
              this.priceForm.reset();
            },
            error: (response) => {
              alert(response.error.message);
            }
          }
        );

    }
  }
}
