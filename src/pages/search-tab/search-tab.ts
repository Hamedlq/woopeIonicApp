import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { serverUrl } from '../../Globals';
import { StorePage } from '../store-page/store-page';
import { ReturnStatement } from '@angular/compiler';
import { timestamp } from 'rxjs/operators';
import { SearchModel } from './SearchModel';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { DataProvider } from '../../providers/data/data';
@Component({
  selector: 'page-search-tab',
  templateUrl: 'search-tab.html'
})
export class SearchTabPage {
  valueSearch: string = '';
  Like: any = "like";
  page: any;
  profile: any;
  baseUrl: any;
  categoryzone: boolean;
  categoris: boolean;
  filter: boolean;
  zones: boolean;
  MenuList: any[];
  ZoneList: any[];
  TempZoneList: any[];
  ZoneName: any[];
  CategoryName: string;
  SortList: any[];
  searchzoneList: any[];
  SelectedZone?: string[];
  SelectedCategoryId: string;
  SelectedSort: string;
  Items = [];
  searchview: boolean;
  model: SearchModel;
  typeDate = new Date().getTime();
  typestate: number;
  typeCheck: number;
  constructor(
    public data: DataProvider,
    private http: HttpClient,
    public navParams: NavParams,
    public navCtrl: NavController,
    public app: App) {
    this.typeDate = new Date().getTime();
    this.typestate = 1;
    this.typeCheck = 0;
    this.searchview = true;
    this.SelectedCategoryId = this.data.paramData;
    this.SelectedZone = [];
    this.categoryzone = true;
    this.categoris = true;
    this.zones = true;
    this.filter = false;
    this.ZoneName = ['انتخاب محله'];
    this.CategoryName = 'انتخاب دسته بندی';
    this.profile = navParams.get('profile');
    this.page = 0;
    this.baseUrl = serverUrl;
    var body = new HttpParams().append('pageNumber', this.page).append('query', this.valueSearch).append('CategoryId', this.SelectedCategoryId);
    this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.Items = <any>data;
        console.log(this.Items);
      });
    this.http.request('Post', this.baseUrl + 'api/Branch/GetCategories', { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.MenuList = <any>data;
        this.MenuList.forEach(item => {
          if (item['id'] == this.SelectedCategoryId) {
            this.CategoryName = item['name'];
          }
        });
      });

    var body = new HttpParams().append('cityId', '1')
    this.http.request('Post', this.baseUrl + 'api/Location/GetAllActiveZones', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.ZoneList = <any>data;
        this.TempZoneList = this.ZoneList;
        this.searchzoneList = this.ZoneList
      });
    this.http.request('Post', this.baseUrl + 'api/Store/SortingItems', { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.SortList = <any>data;
      });
  }
  ionViewWillEnter() {
    this.http.request('Post', this.baseUrl + 'api/Branch/GetCategories', { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.MenuList = <any>data;
        this.MenuList.forEach(item => {
          if (item['id'] == this.SelectedCategoryId) {
            this.CategoryName = item['name'];
          }
        });
      });
    this.page = 0;
    this.SelectedCategoryId = this.data.paramData;
    var body = new HttpParams().append('pageNumber', this.page).append('query', this.valueSearch).append('CategoryId', this.SelectedCategoryId);
    this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.Items = <any>data;
        console.log(this.Items);
      });
    this.searchview = true;
    this.categoryzone = true;
    this.categoris = true;
    this.zones = true;
  }
  searchBox(ev) {
    if (this.valueSearch != "") {
      document.querySelector(".back").classList.add("checkzoneHide");
      this.page = 0;
      var body = new HttpParams();
      this.SelectedZone.forEach(id => {
        body = body.append('Zones', id);
      });
      body = body.append('query', this.valueSearch).append('pageNumber', this.page).append('CategoryId', this.SelectedCategoryId).append("SortType", this.SelectedSort);
      this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
        .subscribe(data => {
          this.Items = <any>data;
          console.log(this.Items);
        });
    }
    else {
      document.querySelector(".back").classList.remove("checkzoneHide");
    }
    if (ev.target.className === "button-inner") {
      this.valueSearch = "";
      this.page = 0;
      var body = new HttpParams();
      this.SelectedZone.forEach(id => {
        body = body.append('Zones', id);
      });
      body = body.append('query', this.valueSearch).append('pageNumber', this.page).append('CategoryId', this.SelectedCategoryId).append("SortType", this.SelectedSort);
      this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
        .subscribe(data => {
          this.Items = <any>data;
          console.log(this.Items);
        });
      document.querySelector(".back").classList.remove("checkzoneHide");
    }
  }
  storeclick(store) {
    this.app.getRootNav().setRoot(StorePage, { store: store, profile: this.profile });
  }
  doInfinite(infiniteScroll) {
    this.searchview = false;
    this.page++;
    setTimeout(() => {
      var body = new HttpParams();
      this.SelectedZone.forEach(id => {
        body = body.append('Zones', id);
      });
      body = body.append('query', this.valueSearch).append('pageNumber', this.page).append('CategoryId', this.SelectedCategoryId).append("SortType", this.SelectedSort);
      this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
        .subscribe(data => {
          let newitems = <any>data;
          console.log(newitems);
          if (newitems.length > 1) {
            for (let i = 0; i < newitems.length; i++) {
              this.Items.push(newitems[i]);
            }
          }
        });
      infiniteScroll.complete();
    }, 500);
  };
  likeFerst(itam) {
    if (itam.isFollowed == true) {
    }
  };

  like(store, event) {
    var body = new HttpParams().append('branchId', store.storeId);
    this.http.request('Post', this.baseUrl + 'api/Store/FollowStore', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
      });
    event.target.classList.toggle('like');
  };
  choosecategory() {
    if (this.SelectedCategoryId != null) {
      document.getElementById('cardCat' + this.SelectedCategoryId).classList.add('elementinCadrmenuselected');
      document.getElementById('ch' + this.SelectedCategoryId).classList.remove('checkcatHide');
      document.getElementById('un' + this.SelectedCategoryId).classList.add('checkcatHide');
    }
    this.categoryzone = false;
    this.categoris = false
    this.filter = true;
  };
  choosezone() {
    if (this.SelectedZone.length != 0) {
      for (var i = 0; i < this.SelectedZone.length; i++) {
        for (var j = 0; j < this.ZoneList.length; j++) {
          if (this.ZoneList[j].id == this.SelectedZone[i]) {
            this.ZoneList.splice(0, 0, this.ZoneList[j]);
            this.ZoneList.splice(++j, 1)
            break;
          }
        }
      }
    };
    this.categoryzone = false;
    this.zones = false;
    this.filter = true;
  }
  back() {
    this.ZoneName = [];
    this.ZoneList.forEach(item => {
      this.SelectedZone.forEach(jtem => {
        if (item['id'] == jtem) {
          this.ZoneName.push(item['name'])
        }
      })
    });
    if (this.ZoneName.length == 0) {
      this.ZoneName = ['انتخاب محله'];
    }
    this.categoryzone = true;
    this.categoris = true
    this.zones = true;
    this.filter = false;
  }
  searchzone(event) {
    this.searchzoneList.forEach((item) => {
      if (event.value != "") {
        if (item['name'].includes(event.value)) {
          document.getElementById('card' + item['id']).classList.remove('checkzoneHide');
        }
        else {
          document.getElementById('card' + item['id']).classList.add('checkzoneHide');
        }
      }
      else {
        this.ZoneList.forEach(item => {
          document.getElementById('card' + item['id']).classList.remove('checkzoneHide');
        });
      }
    });
  }
  SelectZone(zoneId) {
    this.searchview = false;
    let selected = false;
    if (this.SelectedZone.length != 0) {
      this.SelectedZone.forEach((item, index) => {
        if (item == zoneId) {
          this.SelectedZone.splice(index, 1);
          selected = true;
          document.getElementById('card' + zoneId).classList.remove('elementinCadrmenuselected');
          document.getElementById(zoneId).classList.add('checkzoneHide');
          document.getElementById('u' + zoneId).classList.remove('checkzoneHide');
          var body = new HttpParams();
          this.SelectedZone.forEach(id => {
            body = body.append('Zones', id);
          });
          this.page = 0;
          body = body.append('query', this.valueSearch).append('pageNumber', this.page).append('CategoryId', this.SelectedCategoryId).append("SortType", this.SelectedSort);
          this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
            .subscribe(data => {
              this.Items = <any>data;
              console.log(this.Items)
            });
          return selected;
        }
      });
      if (!selected) {
        this.SelectedZone.push(zoneId)
        document.getElementById('card' + zoneId).classList.add('elementinCadrmenuselected');
        document.getElementById(zoneId).classList.remove('checkzoneHide');
        document.getElementById('u' + zoneId).classList.add('checkzoneHide');
        var body = new HttpParams();
        this.SelectedZone.forEach(id => {
          body = body.append('Zones', id);
        });
        this.page = 0;
        body = body.append('query', this.valueSearch).append('pageNumber', this.page).append('CategoryId', this.SelectedCategoryId).append("SortType", this.SelectedSort);
        this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
          .subscribe(data => {
            this.Items = <any>data;
            console.log(this.Items)
          });
      }
    }
    else {
      this.SelectedZone.push(zoneId);
      document.getElementById('card' + zoneId).classList.add('elementinCadrmenuselected');
      document.getElementById(zoneId).classList.remove('checkzoneHide');
      document.getElementById('u' + zoneId).classList.add('checkzoneHide');
      var body = new HttpParams();
      this.SelectedZone.forEach(id => {
        body = body.append('Zones', id);
      });
      this.page = 0;
      body = body.append('query', this.valueSearch).append('pageNumber', this.page).append('CategoryId', this.SelectedCategoryId).append("SortType", this.SelectedSort);
      this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
        .subscribe(data => {
          this.Items = <any>data;
          console.log(this.Items)
        });
    }
  }
  backpressed() {
    this.app.getRootNav().setRoot(TabsControllerPage);
  }
  SelectSort(id) {
    this.searchview = false;
    if (this.SelectedSort != null && this.SelectedSort != id) {
      document.getElementById('cardi' + this.SelectedSort).classList.remove('elementinCadrSortselected');
      // document.getElementById('cs' + this.SelectedSort).classList.add('checksortHide');
      // document.getElementById('us' + this.SelectedSort).classList.remove('checksortHide');
      this.SelectedSort = id;
      document.getElementById('cardi' + this.SelectedSort).classList.add('elementinCadrSortselected');
      // document.getElementById('cs' + this.SelectedSort).classList.remove('checksortHide');
      // document.getElementById('us' + this.SelectedSort).classList.add('checksortHide');
      var body = new HttpParams();
      this.SelectedZone.forEach(id => {
        body = body.append('Zones', id);
      });
      this.page = 0;
      body = body.append('query', this.valueSearch).append('pageNumber', this.page).append('CategoryId', this.SelectedCategoryId).append("SortType", this.SelectedSort);
      this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
        .subscribe(data => {
          this.Items = <any>data;
          console.log(this.Items)
        });
    }
    else if (this.SelectedSort == id) {
      document.getElementById('cardi' + this.SelectedSort).classList.remove('elementinCadrSortselected');
      // document.getElementById('cs' + this.SelectedSort).classList.add('checksortHide');
      // document.getElementById('us' + this.SelectedSort).classList.remove('checksortHide');
      this.SelectedSort = null;
      var body = new HttpParams();
      this.SelectedZone.forEach(id => {
        body = body.append('Zones', id);
      });
      this.page = 0;
      body = body.append('query', this.valueSearch).append('pageNumber', this.page).append('CategoryId', this.SelectedCategoryId).append("SortType", this.SelectedSort);
      this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
        .subscribe(data => {
          this.Items = <any>data;
          console.log(this.Items)
        });
    }
    else {
      this.SelectedSort = id;
      document.getElementById('cardi' + this.SelectedSort).classList.add('elementinCadrSortselected');
      // document.getElementById('cs' + this.SelectedSort).classList.remove('checksortHide');
      // document.getElementById('us' + this.SelectedSort).classList.add('checksortHide');
      var body = new HttpParams();
      this.SelectedZone.forEach(id => {
        body = body.append('Zones', id);
      });
      this.page = 0;
      body = body.append('query', this.valueSearch).append('pageNumber', this.page).append('CategoryId', this.SelectedCategoryId).append("SortType", this.SelectedSort);
      this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
        .subscribe(data => {
          this.Items = <any>data;
          console.log(this.Items)
        });
    }
  }
  SelectCat(id) {
    this.searchview = false;
    if (this.SelectedCategoryId != null) {
      document.getElementById('cardCat' + this.SelectedCategoryId).classList.remove('elementinCadrmenuselected');
      document.getElementById('ch' + this.SelectedCategoryId).classList.add('checkcatHide');
      document.getElementById('un' + this.SelectedCategoryId).classList.remove('checkcatHide');
      this.SelectedCategoryId = id;
      this.MenuList.forEach(item => {
        if (item['id'] == this.SelectedCategoryId) {
          document.getElementById('cardCat' + this.SelectedCategoryId).classList.add('elementinCadrmenuselected');
          document.getElementById('ch' + this.SelectedCategoryId).classList.remove('checkcatHide');
          document.getElementById('un' + this.SelectedCategoryId).classList.add('checkcatHide');
          this.CategoryName = item['name'];
        }
      });
      var body = new HttpParams();
      this.SelectedZone.forEach(id => {
        body = body.append('Zones', id);
      });
      this.page = 0;
      body = body.append('query', this.valueSearch).append('pageNumber', this.page).append('CategoryId', this.SelectedCategoryId).append("SortType", this.SelectedSort);
      this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
        .subscribe(data => {
          this.Items = <any>data;
          console.log(this.Items)
        });
    }
    else {
      this.SelectedCategoryId = id;
      this.MenuList.forEach(item => {
        if (item['id'] == this.SelectedCategoryId) {
          document.getElementById('cardCat' + this.SelectedCategoryId).classList.add('elementinCadrmenuselected');
          document.getElementById('ch' + this.SelectedCategoryId).classList.remove('checkcatHide');
          document.getElementById('un' + this.SelectedCategoryId).classList.add('checkcatHide');
          this.CategoryName = item['name'];
        }
      });
      var body = new HttpParams();
      this.SelectedZone.forEach(id => {
        body = body.append('Zones', id);
      });
      this.page = 0;
      body = body.append('query', this.valueSearch).append('pageNumber', this.page).append('CategoryId', this.SelectedCategoryId).append("SortType", this.SelectedSort);
      this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
        .subscribe(data => {
          this.Items = <any>data;
          console.log(this.Items)
        });

    }
  }
}



