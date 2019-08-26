import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { serverUrl } from '../../Globals';
import { StorePage } from '../store-page/store-page';
import { ReturnStatement } from '@angular/compiler';
import { timestamp } from 'rxjs/operators';
import { SearchModel } from './earnMoneyModel';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { DataProvider } from '../../providers/data/data';
import { SplashSelectPage } from '../splash-select/splash-select';
import { ResponseStatus } from '../Enum/enum';
@Component({
  selector: 'earn-money-page',
  templateUrl: 'earn-money-page.html'
})
export class EarnMoneyPage {
  valueSearch: string = '';
  Like: any = "like";
  page: any;
  profile: any;
  baseUrl: any;
  categoris: boolean;
  filter: boolean;
  MenuList: any[];
  TempZoneList: any[];
  CategoryName: string;
  SortList: any[];
  SelectedCategoryId: string;
  SelectedSort: string;
  SelectedSortName: string;
  Items = [];
  searchview: boolean;
  model: SearchModel;
  typeDate = new Date().getTime();
  typestate: number;
  typeCheck: number;
  message: string;
  whatsapphref = "whatsapp://send?text=";
  smshref = "sms:''?body=";
  result: any;
  constructor(
    public data: DataProvider,
    private http: HttpClient,
    public navParams: NavParams,
    public navCtrl: NavController,
    public alertController: AlertController,
    public app: App) {
    this.typeDate = new Date().getTime();
    this.typestate = 1;
    this.typeCheck = 0;
    this.searchview = true;
    this.SelectedCategoryId = this.data.paramData;
    this.categoris = true;
    this.filter = false;
    this.CategoryName = 'انتخاب دسته بندی';
    this.SelectedSortName='مرتب سازی'
    this.profile = navParams.get('profile');
    this.page = 0;
    this.baseUrl = serverUrl;
    var body = new HttpParams().append('pageNumber', this.page).append('query', this.valueSearch).append('CategoryId', this.SelectedCategoryId).append("Shareable",'true');
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
    var body = new HttpParams().append('pageNumber', this.page).append('query', this.valueSearch).append('CategoryId', this.SelectedCategoryId).append("Shareable",'true');
    this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.Items = <any>data;
        console.log(this.Items);
      });
    this.searchview = true;
    this.categoris = true;
  }
  storeclick(store) {
    //this.app.getRootNav().setRoot(StorePage, { store: store, profile: this.profile ,view:"search"});
    //this.app.getRootNav().push(StorePage, { store: store, profile: this.profile ,view:"search"});
    let accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      let modal = document.querySelector('.modal');
      modal.classList.add('modal1');
      this.share(store)
    } else {
      this.navCtrl.push(SplashSelectPage);
    }
  }
  close() {
    let modal = document.querySelector('.modal');
    modal.classList.remove('modal1');
    modal.classList.add('modal');
    this.message = "";
    this.whatsapphref = "whatsapp://send?text=";
    this.smshref = "sms:''?body=";
  }
  share(store) {

    var body = new HttpParams()
      .append('branchId', store.storeId);
    this.http.request('Post', serverUrl + 'api/Store/GetUserStore', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        if (data['describeCountDiscountCode'] != null) {
          console.log(data['describeCountDiscountCode'])
          var body = new HttpParams().append('BranchId', store.storeId);
          this.http.request('Post', this.baseUrl + 'api/Store/ShareStore', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
            .subscribe(data => {
              this.result = data;
              this.message = data["message"];
              this.whatsapphref = this.whatsapphref + this.message;

              let whatsapp = document.querySelector('.whatssapp');
              whatsapp.setAttribute("href", this.whatsapphref);

              this.smshref = this.smshref + this.message;
              let sms = document.querySelector('.sms');
              sms.setAttribute("href", this.smshref);
            });
        }
      });

  }
  action() {
    if (this.result["status"] != ResponseStatus.Success) {
      event.preventDefault();
    }
  }
  doInfinite(infiniteScroll) {
    this.searchview = false;
    this.page++;
    setTimeout(() => {
      var body = new HttpParams();
      body = body.append('query', this.valueSearch).append('pageNumber', this.page).append('CategoryId', this.SelectedCategoryId).append("SortType", this.SelectedSort).append("Shareable",'true');
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
    this.categoris = false
    this.filter = true;
  };
  
  async choosesortdialog(){
    let radioObj=[];
    this.SortList.forEach(item => {
      radioObj.push({type:'radio',label:item.name,value:item.id,handler: () => {
        this.SelectedSortName=item.name;
        this.SelectedSort=item.id;
        this.newsearch();
        alert.dismiss()
      }})
    });

    const alert = await this.alertController.create({
      title: 'انتخاب کنید',
      inputs : radioObj,
    });

    await alert.present();
  }

  async choosecategorydialog(){
    let radioObj=[];
    this.MenuList.forEach(item => {
      radioObj.push({type:'radio',label:item.name,value:item.id,handler: () => {
        this.SelectedCategoryId=item.id;
        this.CategoryName=item.name;
        this.newsearch();
        alert.dismiss()
      }})
    });

    const alert = await this.alertController.create({
      title: 'انتخاب کنید',
      inputs : radioObj,

    });

    await alert.present();
  }
  newsearch(){
    console.log(this.valueSearch);
    var body = new HttpParams();
        this.page = 0;
        body = body.append('query', this.valueSearch).append('pageNumber', this.page).append('CategoryId', this.SelectedCategoryId).append("SortType", this.SelectedSort).append("Shareable",'true');
            this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
              .subscribe(data => {
                this.Items = <any>data;
                console.log(this.Items)
              });
  }

  
  backpressed() {
    //this.app.getRootNav().setRoot(TabsControllerPage);
    this.navCtrl.popTo(TabsControllerPage);
  }
  SelectSort(id) {
    this.searchview = false;
    if (this.SelectedSort != null && this.SelectedSort != id) {
      document.getElementById('cardi' + this.SelectedSort).classList.remove('elementinCadrSortselected');
      this.SelectedSort = id;
      document.getElementById('cardi' + this.SelectedSort).classList.add('elementinCadrSortselected');
      var body = new HttpParams();
      this.page = 0;
      body = body.append('query', this.valueSearch).append('pageNumber', this.page).append('CategoryId', this.SelectedCategoryId).append("SortType", this.SelectedSort).append("Shareable",'true');
      this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
        .subscribe(data => {
          this.Items = <any>data;
          console.log(this.Items)
        });
    }
    else if (this.SelectedSort == id) {
      document.getElementById('cardi' + this.SelectedSort).classList.remove('elementinCadrSortselected');
      this.SelectedSort = null;
      var body = new HttpParams();
      this.page = 0;
      body = body.append('query', this.valueSearch).append('pageNumber', this.page).append('CategoryId', this.SelectedCategoryId).append("SortType", this.SelectedSort).append("Shareable",'true');
      this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
        .subscribe(data => {
          this.Items = <any>data;
          console.log(this.Items)
        });
    }
    else {
      this.SelectedSort = id;
      document.getElementById('cardi' + this.SelectedSort).classList.add('elementinCadrSortselected');
      var body = new HttpParams();
      this.page = 0;
      body = body.append('query', this.valueSearch).append('pageNumber', this.page).append('CategoryId', this.SelectedCategoryId).append("SortType", this.SelectedSort).append("Shareable",'true');
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
      this.page = 0;
      body = body.append('query', this.valueSearch).append('pageNumber', this.page).append('CategoryId', this.SelectedCategoryId).append("SortType", this.SelectedSort).append("Shareable",'true');
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
      this.page = 0;
      body = body.append('query', this.valueSearch).append('pageNumber', this.page).append('CategoryId', this.SelectedCategoryId).append("SortType", this.SelectedSort).append("Shareable",'true');
      this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
        .subscribe(data => {
          this.Items = <any>data;
          console.log(this.Items)
        });
    }
  }
}



