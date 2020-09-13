import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatRadioModule,
  MatTooltipModule,
  MatSortModule,
  MatAutocompleteModule,
} from '@angular/material';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateProjectDialogComponent } from './project-dashboard/create-project-dialog/create-project-dialog.component';
import { EditProjectDialogComponent } from './project-dashboard/edit-project-dialog/edit-project-dialog.component';
import { ProjectBoardComponent } from './project-board/project-board.component';
import { DiagramComponent } from './project-board/diagram/diagram.component';
import { CatalogComponent } from './project-board/catalog/catalog.component';
import { CatalogContentComponent } from './project-board/catalog/catalog-content/catalog-content.component';
import { GraphListComponent } from './project-board/graph-list/graph-list.component';
import { CreateGraphDialogComponent } from './project-board/graph-list/create-graph-dialog/create-graph-dialog.component';
import { BoardComponent } from './project-board/board/board.component';
import { TruncatePipe } from './truncate.pipe';
import { EditGraphDialogComponent } from './project-board/graph-list/edit-graph-dialog/edit-graph-dialog.component';
import { MenuComponent } from './menu/menu.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommandBarComponent } from './command-bar/command-bar.component';
import { PropertiesComponent } from './project-board/board/properties/properties.component';
import { LicensesComponent } from './licenses/licenses.component';
import { CreditsComponent } from './credits/credits.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectDashboardComponent,
    PageNotFoundComponent,
    CreateProjectDialogComponent,
    EditProjectDialogComponent,
    ProjectBoardComponent,
    DiagramComponent,
    CatalogComponent,
    CatalogContentComponent,
    GraphListComponent,
    CreateGraphDialogComponent,
    BoardComponent,
    TruncatePipe,
    EditGraphDialogComponent,
    MenuComponent,
    ToolbarComponent,
    CommandBarComponent,
    PropertiesComponent,
    LicensesComponent,
    CreditsComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatRadioModule,
    MatTooltipModule,
    MatSortModule,
    FlexLayoutModule,
    DragDropModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateProjectDialogComponent,
    EditProjectDialogComponent,
    CreateGraphDialogComponent,
    EditGraphDialogComponent],
})
export class AppModule { }
