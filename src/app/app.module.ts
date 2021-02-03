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
import { AttributeListComponent } from './project-board/board/properties/attribute-list/attribute-list.component';
import { TextAttributeComponent } from './project-board/board/properties/attribute-list/text-attribute/text-attribute.component';
import { NumberAttributeComponent } from './project-board/board/properties/attribute-list/number-attribute/number-attribute.component';
import { EnumAttributeComponent } from './project-board/board/properties/attribute-list/enum-attribute/enum-attribute.component';
import { CostAttributeComponent } from './project-board/board/properties/attribute-list/cost-attribute/cost-attribute.component';
import { ComponentTreeComponent } from './project-board/board/properties/component-tree/component-tree.component';
import { ToastrModule } from 'ngx-toastr';
import { EvaluationComponent } from './project-board/evaluation/evaluation.component';
import { ReplacementDialogComponent } from './project-board/evaluation/replacement-dialog/replacement-dialog.component';
import { InputDialogComponent } from './project-board/evaluation/input-dialog/input-dialog.component';
import { EdgePropertiesComponent } from './project-board/board/edge-properties/edge-properties.component';
import { EdgeAttributeListComponent } from './project-board/board/edge-properties/edge-attribute-list/edge-attribute-list.component';
import { MetaAttributeListComponent } from './project-board/board/meta-attribute-list/meta-attribute-list.component';

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
    CreditsComponent,
    AttributeListComponent,
    TextAttributeComponent,
    NumberAttributeComponent,
    EnumAttributeComponent,
    CostAttributeComponent,
    ComponentTreeComponent,
    EvaluationComponent,
    ReplacementDialogComponent,
    InputDialogComponent,
    EdgePropertiesComponent,
    EdgeAttributeListComponent,
    MetaAttributeListComponent
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
    MatAutocompleteModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateProjectDialogComponent,
    EditProjectDialogComponent,
    CreateGraphDialogComponent,
    EditGraphDialogComponent,
    ReplacementDialogComponent,
    InputDialogComponent],
})
export class AppModule { }
