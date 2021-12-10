import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../../../core/services/api";
import { LocalStorageService } from "../../services/local-storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private localStorageService: LocalStorageService
  ) {}
  categories: any = [];
  ngOnInit() {
    this.getAllCategory();
  }

  private getAllCategory() {
    if (this.localStorageService.getLocalStorage("categories")) {
      this.categories = JSON.parse(
        this.localStorageService.getLocalStorage("categories")
      );
    } else {
      this.categoryService.listCategories().subscribe((result) => {
        console.log(result?.data);
        this.categories = result?.data;
        this.localStorageService.setLocalStorage(
          "categories",
          JSON.stringify(result?.data)
        );
      });
    }
  }
  updatemenu() {
    /*   if (document.getElementById('responsive-menu').checked == true) {
      document.getElementById('menu').style.borderBottomRightRadius = '0';
      document.getElementById('menu').style.borderBottomLeftRadius = '0';
    }else{
      document.getElementById('menu').style.borderRadius = '0px';
    } */
  }
}
