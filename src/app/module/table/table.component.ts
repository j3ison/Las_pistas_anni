import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { tap } from 'rxjs';
import { TableColumn } from './model/table-column';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { DataGlobalService } from '../view-data/services/data-global.service';
import { SearchTableService } from './service/search-table.service';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogService } from '../dialog/service/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
// import * as XLSX from 'xlsx';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  dataSource = new MatTableDataSource<any>
  tableDisplayColumns: String[] = [];
  tableColumns: TableColumn[] = []
  Showdelete: boolean = false;
  private matDialogRef!: MatDialogRef<DialogComponent>;

  itemAction: TemplateRef<any> | null = null;
  itemCreate: TemplateRef<any> | null = null;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataUpdate: any = {}
  btnClickItemRow: boolean = true;

  selection = new SelectionModel<any>(true, []);

  onSelect() {
    // this.select.emit(this.selection.selected);
  }


  //Comentario de Jurgen: Pongan la columna de Idcliente tambien

  @Input() set data(data: any) {
    this.dataSource.data = data;
  }

  @Input() set columns(columns: TableColumn[]) {
    this.tableColumns = columns

    this.tableDisplayColumns = this.tableColumns.map(col => col.def)

  }

  item: any
  showInfo = true;
  showDelete = false;

  @Input() set buttonShowUpdate(ShowInfo: boolean) {

    this.showInfo = ShowInfo

  }

  @Input() set buttonShowDelete(ShowDelete: boolean) {
    if (ShowDelete) {
      this.showDelete = ShowDelete
    }
  }

  @Input() set setItemACtion(itemAction: TemplateRef<any>) {
    this.itemAction = itemAction
  }

  @Input() set setItemCreation(itemCreate: TemplateRef<any>) {
    this.itemCreate = itemCreate
  }

  @Output() selectItemsCell: EventEmitter<any>;
  @Output() selectItemsCellDelete: EventEmitter<any>;
  @Output() selectItemsCellInfo: EventEmitter<any>;

  constructor(private cdr: ChangeDetectorRef,
    private dataGlobalservice: DataGlobalService,
    private search: SearchTableService,
    private dialogService: DialogService) {

    this.selectItemsCell = new EventEmitter();
    this.selectItemsCellDelete = new EventEmitter();
    this.selectItemsCellInfo = new EventEmitter();
  }

  ngOnInit(): void {
    // console.log(this.item)


  }

  ngAfterViewInit() {

    // console.log(this.dataGlobalservice.getItemView())

    this.dataGlobalservice.$itemView.subscribe(item => {
      this.item = item;
      if (item) {
        this.btnClickItemRow = false;
      } else {
        this.btnClickItemRow = true;
      }
      this.cdr.detectChanges()
    })

    this.dataSource.paginator = this.paginator;


    this.search.text$.subscribe(text => {
      // console.log(text)
      this.applyFilter(text)
    })

  }



  getTypeData(data: any): boolean {
    if (typeof data === "object") {
      return true;
    }
    return false;
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  applyFilter(event: Event) {

    if (event && event.target) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  getActiveClass(active: any): string {
    // console.log(this.item)
    if (!this.item) return ''
    return active == this.item ? 'active' : '';
  }

  selectItem(item: any) {
    // this.selectItemsCell.emit(undefined);
    if (item == this.dataUpdate) {
      this.btnClickItemRow = true;
      this.dataUpdate = undefined;
      this.dataGlobalservice.setItemView(null);
      return
    }
    this.btnClickItemRow = false;
    this.dataUpdate = item;
    this.dataGlobalservice.setItemView({ ...item });
    if (this.itemAction)
      this.openDialogWithTemplate(this.itemAction)
  }

  btnClickUpdate() {
    if (this.itemCreate)
      this.openDialogWithTemplate(this.itemCreate)
    // this.dataGlobalservice.setItemView(this.dataUpdate)
    // this.selectItemsCell.emit(this.dataUpdate);
  }

  btnClickDelete() {
    this.selectItemsCellDelete.emit(this.dataUpdate);
  }

  btnClickInfo() {
    // this.dataGlobalservice.setItemView(this.dataUpdate)
    this.selectItemsCellInfo.emit(this.dataUpdate);
  }

  btnClickExport() {
    // console.log(this.dataSource.data);
    // console.log(this.tableColumns);
    // this.exportToExcel();
  }


  openDialogWithTemplate(template: TemplateRef<any>) {
    this.matDialogRef = this.dialogService.openDialogWithTemplate({ template });

    this.matDialogRef.afterClosed().subscribe((res) => {
      this.btnClickItemRow = true;
      this.dataUpdate = undefined;
      this.dataGlobalservice.setItemView(null);
    });
  }

  cancelDialogResult() {
    this.matDialogRef.close()
  }

}
