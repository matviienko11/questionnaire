import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Paginator} from "../../interfaces/paginator.interface";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() pageSizeOptions: number[];
  @Input() totalLength: number;
  @Input() pageSize: number;
  @Output() pagination: EventEmitter<any> = new EventEmitter();
  index: number = 0;
  isDisabledPrev: boolean = true;
  isDisabledNext: boolean
  totalPages: number;
  paginationObj = {};
  isChanged: boolean;
  pagesArr: any[] = [];
  button: Paginator;

  constructor() { }

  ngOnInit(): void {
  }

  handleButtonsDisplay() {
    this.pagesArr = [];
    for (let i = 0; i < this.totalPages; i++) {

      if (i === this.index) {
        this.button = {
          value: i,
          isActive: true
        }
      } else {
        this.button = {
          value: i,
          isActive: false
        }
      }
      this.pagesArr.push(this.button)
    }
    if (this.totalPages > 8) {
      let delta;
      const newArr = this.pagesArr.slice(1, -1);
      const arrEnd = this.pagesArr[this.pagesArr.length - 1];
      const arrStart = this.pagesArr[0];
      const dottedBtn = {
        value: "...",
        isActive: true
      }
      if(this.index <= 3) {
        delta = this.pagesArr.slice(0, this.index + 3);
        this.pagesArr = [...delta, dottedBtn, arrEnd];
        return;
      }
      if(this.index >= 3 && this.index <= this.pagesArr.length - 5) {
        delta = newArr.slice(this.index - 3, this.index + 2);
        this.pagesArr = [arrStart,  dottedBtn, ...delta, dottedBtn, arrEnd];
        return;
      }
      if(this.index >= this.pagesArr.length - 5) {
        delta = this.pagesArr.slice(this.index - 2, this.pagesArr.length);
        this.pagesArr = [arrStart,  dottedBtn, ...delta];
        return;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.index = 0;
    this.paginationInfo;
    this.handleButtonsDisplay();

    if (this.totalPages === 1) {
      this.isDisabledPrev = true;
      this.isDisabledNext = true;
      return;
    }
    if (this.totalPages !== 1) {
      this.isDisabledPrev = true;
      this.isDisabledNext = false;
    }
    if (changes.pageSize?.currentValue !== changes.pageSize?.previousValue) {
      this.isChanged = true;
    } else {
      this.isChanged = false;
    }

    if (this.isChanged) {
      this.index = 0;
      this.isDisabledPrev = true;
      this.isDisabledNext = false;
    }
  }

  private get paginationInfo() {
    this.totalPages = Math.ceil(this.totalLength / this.pageSize)
    return this.paginationObj = {
      totalPages: this.totalPages,
      pageSize: this.pageSize,
      index: this.index
    }
  }

  onPageSelect(item: Paginator) {
    this.index = item.value;
    this.pagination.emit({...this.paginationObj, index: item.value});
    if (this.index !== 0 && this.index !== this.totalPages) {
      this.isDisabledPrev = false;
      this.isDisabledNext = false;
    }
    if (this.index === 0) {
      this.isDisabledPrev = true;
      this.isDisabledNext = false;
    }
    if (this.index + 1 === this.totalPages) {
      this.isDisabledPrev = false;
      this.isDisabledNext = true;
    }
    this.pagesArr.forEach((btn) => {
      btn.isActive = false;
    })
    item.isActive = true;
    this.handleButtonsDisplay();
  }

  handlePageSizeChange() {
    this.index = 0;
    this.pagination.emit({...this.paginationInfo});
  }

  handlePrev() {
    this.index--
    this.isDisabledNext = false
    this.paginationInfo;
    this.handleButtonsDisplay()
    this.pagination.emit({...this.paginationInfo});
    if (this.index === 0) return this.isDisabledPrev = true;
    return;
  }

  handleNext() {
    this.index++;
    this.isDisabledPrev = false;
    this.paginationInfo;
    this.handleButtonsDisplay()
    this.pagination.emit({...this.paginationInfo});
    if ((this.index + 1) === this.totalPages) return this.isDisabledNext = true;
    return;
  }

}
