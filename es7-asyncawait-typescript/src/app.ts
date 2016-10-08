import 'babel-polyfill';
import { Film, Composer } from './Movie';
import * as $ from 'jquery';
import angular from 'angular';


async function run() {
    let composers: Array<Composer> = [];
    composers.push(
        new Composer('James', 'Horner', [
            new Film('Legends of the Fall'),
            new Film('An American Tail'),
            new Film('Apollo 13'),
            new Film('Braveheart')
        ]),
        new Composer('Danny', 'Elfman', [
            new Film('Batman'),
            new Film('The Family Man'),
            new Film('Alice in Wonderland')
        ])
    );


    // $('.container')
    //     .append(getComposerNames(composers))
    //     .append(getComposerFilms(composers));

    $('.container')
        .append(await getComposerNamesAsync(composers, 2000) + '')
        .append(await getComposerFilmsAsync(composers, 1000) + '');
}



/**
 * Does some stuff, ya know?
 * @param {Array<Composer>} composers
 * list of film composers
 * @param {number} delay
 * Milliseconds for timeout
 * @returns {Promise<string>}
 */
async function getComposerNamesAsync(composers: Array<Composer>, delay: number): Promise<string> {
    return await timeout(() => {
        let html: Array<string> = [''];
        composers.forEach(c => {
            html.push(`<div>${c.firstName} ${c.lastName}</div>`);
        });
        return html.join('');
    }, delay);
}

async function getComposerFilmsAsync(composers: Array<Composer>, delay: number): Promise<string> {
    return await timeout(() => {
        let html: Array<string> = [''];
        composers.forEach(c => {
            c.films.forEach(f => {
                html.push(`<div>${f.title}</div>`);
            });
        });
        return html.join('');
    }, delay);
}

function timeout(func: Function, delay: number): any {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(func());
        }, delay);
    });
}


function getComposerNames(composers: Array<Composer>): string {
    let html: Array<string> = [''];
    composers.forEach(c => {
        html.push(`<div>${c.firstName} ${c.lastName}</div>`);
    });
    return html.join('');
}

function getComposerFilms(composers: Array<Composer>): string {
    let html: Array<string> = [''];
    composers.forEach(c => {
        c.films.forEach(f => {
            html.push(`<div>${f.title}</div>`);
        });
    });
    return html.join('');
}


run();