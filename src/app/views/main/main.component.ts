import {Component, OnInit} from '@angular/core';
import {NgbConfig} from "@ng-bootstrap/ng-bootstrap";
import {QuestionType} from "../../../types/question.type";
import {Router, Routes} from "@angular/router";
import {Observable} from "rxjs";

declare var $: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  popupObserver$!: Observable<any>;
  popupTimer: boolean = false;

  constructor(private router: Router) {
    this.popupObserver$ = new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.popupTimer = true)
      }, 10000)
    })
  }

  ngOnInit() {
    this.popupObserver$.subscribe((param: boolean) => {
      return param;
    })
  }

  public questions: QuestionType[] = [
    {
      title: 'Собираете ли вы подарочные боксы?',
      text: 'Да, у нас есть такая услуга. Мы можем собрать подарочный бокс на любой вкус, объем и стоимость!'
    },
    {
      title: 'Сколько у вас разновидностей чая?',
      text: 'На данный момент у нас 6 разновидностей чая.'
    },
    {
      title: 'В какой срок осуществляется доставка?',
      text: 'Доставка осуществляется в течении 3х дней.'
    },
    {
      title: 'У вас обновляется ассортимент?',
      text: 'Каждый месяц у нас появляются новые чаи.'
    },
    {
      title: 'Какого объема у вас пачки чая?',
      text: '25 / 50 / 100 гр'
    },
  ]

  navigateCatalog() {
    this.router.navigate(['catalog'])
  }

  closePopup() {
    $('.popup').hide();
  }

}
