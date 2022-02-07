import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { TagDTO } from 'src/app/core/models/models';
import { TagService } from 'src/app/core/services/tag.service';
import { Constants } from 'src/app/shared/helpers/constants';


export class Badge {
  name: string;
  caption: string;
  icon: string;

  constructor() {
    this.name = '';
    this.caption = '';
    this.icon = '';
  }
}


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {


  itemsLoaded: boolean;
  items: TagDTO[];
  badges: Badge[];
  searchField: string;
  player: string;
  playerLoaded: boolean;
  modalPlayer: any;
  loaded: boolean;
  filtersEnabled: boolean;
  resultsFound: boolean;

  defaultImage=Constants.DEFAULT_IMG;

  formFilters = this.fb.group({
    dateType: [''],
    fromDate: [''],
    toDate: [''],
    sortType: [''],
    show: [''],
    movie: [''],
    clip: [''],
    game: [''],
    elementsCount: [''],
  });

  constructor(private tagService: TagService,
    public router: Router,
    private fb: FormBuilder) {

    this.loaded = false;
    this.items = [];
    this.badges = [];
    this.itemsLoaded = false;
    this.searchField = ''
    this.player = '';
    this.playerLoaded = false;
    this.filtersEnabled = false;
    this.resultsFound = false;

    this.formFilters.setValue({
      dateType: 1,
      fromDate: '',
      toDate: '',
      sortType: 1,
      show: false,
      movie: false,
      clip: false,
      game: false,
      elementsCount: 20,
    });

  }

  ngOnInit(): void {
    this.getItems();
    this.formFilters.valueChanges
      .subscribe(data => {
        this.formFiltersChanged(data, false);
      });
  }

  getItems(): any {
    this.loaded = false;
    // const url = environment.urlNews;
    /*    setTimeout(() => {
          this.itemsService.getItems(url)
            .subscribe(
              items => {
                this.items = items;
                this.loaded = true;
              }
            );
        }, 500); */
    // this.itemsService.getItems(url)
    //   .subscribe(
    //     items => {
    //       this.items = items;
    //       this.loaded = true;
    //     }
    //   );
    this.tagService.listTags().pipe(finalize(() => {
      this.loaded = true;
    })).subscribe((items => {
      this.items = items.data;
    }));
  }

  filterTag(tag: TagDTO,searchField:any) {
    return tag?.name==searchField;
  }

  formFiltersChanged(data: any, closingBadge: boolean) {
    this.badges = [];
    if (data["movie"]) {
      this.badges.push({ name: 'movie', caption: 'Movie', icon: 'fas fa-film' })
    };
    if (data["show"]) {
      this.badges.push({ name: 'show', caption: 'Show', icon: 'fas fa-desktop' });
    };
    if (data["clip"]) {
      this.badges.push({ name: 'clip', caption: 'Clip', icon: 'fas fa-volume-up' })
    };
    if (data["game"]) {
      this.badges.push({ name: 'game', caption: 'Game', icon: 'fab fa-playstation' })
    };
    if (!closingBadge) {
      this.closeFilters();
    }
    this.getItems();
  }

  closeFilters() {
    this.filtersEnabled = !this.filtersEnabled;
    var collapse = document.getElementById('collapseFilters')
    // new bootstrap.Collapse(collapse, { hide: true });
  }

  addItem() {
    this.router.navigate(['/news', 0]);
  }


  closeBadge(badge: string) {
    this.closeFilters();
  }

  openTrailer(item: any, id: any) {
    this.player = item.youtubeLink;
    this.playerLoaded = true;
    // if (this.modalPlayer === undefined) {
    //   this.modalPlayer = new bootstrap.Modal(document.getElementById('newsModal'), {
    //     keyboard: true
    //   })
    //   let selectPlayer = document.getElementById('newsModal')
    //   selectPlayer?.addEventListener('show.bs.modal', this.onShowModal.bind(this));
    //   selectPlayer?.addEventListener('hidden.bs.modal', this.onCloseModal.bind(this));
    // }
    this.modalPlayer?.show();
  }

  onShowModal() {
  }

  onCloseModal() {
    this.player = '';
    this.playerLoaded = false;
  }

  onHandleKeyDown(event: any) {
    if (event.keyCode === 13) {
      this.onSearch();
    }
  }

  onSearch() {
    this.getItems();
  }

  onLoading(event: any) {
  }

  loadError(event: any) {
  }

}
