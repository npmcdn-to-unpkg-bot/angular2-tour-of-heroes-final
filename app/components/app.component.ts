/**
 * Created by Maycon Ribeiro on 26/05/2016.
 */
import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';

import {HeroService} from "./../service/hero.service.ts";
import {HeroesComponent} from "./heroes/heroes.component.ts";
import {DashBoardCompenent} from "./dashboard/dashboard.component.ts";
import {HeroDetailComponent} from "./hero-detail/hero-datail.componente.ts";

@Component({
    selector: 'my-app',
    template: ` <h1>{{title}}</h1>
                <nav>
                  <a [routerLink]="['Dashboard']">Dashboard</a>
                  <a [routerLink]="['Heroes']">Heroes</a>
                </nav>
                <router-outlet></router-outlet>
              `,
    styleUrls: ['./app/components/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HeroService
    ]
})

@RouteConfig([
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashBoardCompenent,
        useAsDefault: true
    },
    {
        path: '/detail/:id',
        name: 'HeroDetail',
        component: HeroDetailComponent
    },
    {
        path: '/heroes',
        name: 'Heroes',
        component: HeroesComponent
    }

])

export class AppComponent {
    title = 'Tour of Heroes';
}