import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { SquareComponent } from './square/square.component';
import { PiecesComponent } from './pieces/pieces.component';
import { RightSidebarComponent } from './sider-bar/right-sidebar/right-sidebar.component';

const components = [BoardComponent, RightSidebarComponent];

const modules: any = [];
@NgModule({
  declarations: [...components, SquareComponent, PiecesComponent],
  imports: [CommonModule],
  exports: [...components, ...modules],
})
export class ComponentsModule {}
