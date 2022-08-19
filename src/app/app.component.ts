import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'family-pos-website';
    links = [
        {
            name: '清單',
            path: '/dashboard',
        },
        {
            name: '新增',
            path: '/create',
        },
    ];
    activeLink: string = '/';

    constructor() {}

    ngOnInit(): void {}
}
