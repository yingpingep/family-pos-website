import { Menu } from '@models/menu';
import { Observable } from 'rxjs';

export type GetMenuResponse = Observable<{ menu: Menu }>;
