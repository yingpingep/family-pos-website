import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { PosOperatorService } from '@services/pos-operator/pos-operator.service';

@Injectable({
    providedIn: 'root',
})
export class UpdateOrderGuard implements CanActivate {
    constructor(
        private posOperator: PosOperatorService,
        private router: Router
    ) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const id = parseInt(route.paramMap.get('id')!);
        if (isNaN(id)) {
            return false;
        }

        return this.posOperator
            .getOrderById(id)
            .pipe(
                map((order) =>
                    !!order
                        ? true
                        : this.router.createUrlTree(['/', 'dashboard'])
                )
            );
    }
}
