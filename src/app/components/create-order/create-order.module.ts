import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';

import { CreateLayoutComponent } from './create-layout/create-layout.component';
import { OrderPreviewComponent } from './order-preview/order-preview.component';
import { OrderPreviewContainer } from './order-preview/order-preview-container.component';
import { MenuItemCardComponent } from './menu-item-card/menu-item-card.component';

// Material
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
    declarations: [
        CreateLayoutComponent,
        MenuItemCardComponent,
        OrderPreviewComponent,
        OrderPreviewContainer,
    ],
    exports: [CreateLayoutComponent],
    imports: [
        CommonModule,
        MatDividerModule,
        MatTabsModule,
        MatCardModule,
        FormsModule,
        MatFormFieldModule,
        MatDialogModule,
        MatMenuModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        FlexModule,
        MatRippleModule,
    ],
})
export class CreateOrderModule {}
