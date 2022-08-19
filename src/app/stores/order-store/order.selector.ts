import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrder from '@store/order-store/order.reducer';
import { Order } from '@models/order';

export const selectOrderState = createFeatureSelector<fromOrder.State>(
    fromOrder.ordersFeatureKey
);

export const selectOrderEntities = createSelector(
    selectOrderState,
    (state) => state.entities
);

export const selectOrderList = createSelector(
    selectOrderState,
    (state) => Object.values(state.entities) as Order[]
);
