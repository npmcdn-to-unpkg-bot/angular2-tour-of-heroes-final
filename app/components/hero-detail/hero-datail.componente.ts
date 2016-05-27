import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';

import {Hero} from "./../../model/hero";
import {HeroService} from "./../../service/hero.service.ts";

@Component({
    selector: 'my-hero-detail',
    inputs: ['hero'],
    templateUrl: './app/components/hero-detail/hero-detail.component.html',
    styleUrls: ['./app/components/hero-detail/hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

    @Input()
    public hero: Hero;

    @Output()
    public close = new EventEmitter();

    public error: any;
    public navigated = false;

    constructor(
        private heroService: HeroService,
        private routeParams: RouteParams) {
    }

    ngOnInit() {

        if (this.routeParams.get('id') !== null) {
            let id = +this.routeParams.get('id');
            this.navigated = true;
            this.heroService.getHero(id)
                .then(hero => this.hero = hero);
        } else {
            this.navigated = false;
            this.hero = new Hero();
        }

    }

    save() {
        this.heroService
            .save(this.hero)
            .then(hero => {
                this.hero = hero; // saved hero, w/ id if new
                this.goBack(hero);
            }).catch(error => this.error = error); // TODO: Display error message
    }

    goBack(savedHero: Hero = null) {
        this.close.emit(savedHero.toString());
        if (this.navigated) { window.history.back();
        }
    }

}
