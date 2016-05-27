/**
 * Created by Maycon Ribeiro on 26/05/2016.
 */
import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {HEROES} from "./../mocks/mock-heroes-deprecated";
import {Hero} from "./../model/hero";

@Injectable()
export class HeroService {

    private heroesUrl = 'app/heroes'; //URL to web api

    constructor(private http: Http){};

    /**
     * Busca assincrona mais rapida
     * @returns {Promise<Hero[]>}
     */
    /**getHeroes() {
        return Promise.resolve(HEROES);
    } */

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        //console.error('An error ocurred', error);
        return Promise.reject(error.message || error);
    }

    /**
     * Busca sincrona mais demorada
     * @returns {Promise<Hero[]>}
     */
    getHeroesSlowly() {
        return new Promise<Hero[]>(resolve => setTimeout(()=>resolve(HEROES), 2000)); //2 segundos
    }

    getHero(id: number) {
        return Promise.resolve(HEROES).then(heroes => heroes.filter(hero => hero.id === id)[0]);
    }


    // Add new Hero
    private post(hero: Hero): Promise<Hero> {
        let headers = new Headers({
            'Content-Type': 'application/json'});

        return this.http
            .post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    // Update existing Hero
    private put(hero: Hero) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.heroesUrl}/${hero.id}`;

        return this.http
            .put(url, JSON.stringify(hero), {headers: headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    delete(hero: Hero) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.heroesUrl}/${hero.id}`;

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    }

    save(hero: Hero): Promise<Hero>  {
        if (hero.id) {
            return this.put(hero);
        }
        return this.post(hero);
    }
}