import { KeycloakService } from 'keycloak-angular';
import { pdaMenuModule } from "./menu/pda.menu";

export class MenuConfig {

  constructor(private keycloakService: KeycloakService){}

  public defaults: any = {
    header: {
      self: {},
      items: [
        {
          title: "Home",
          root: true,
          alignment: "left",
          page: "",
          translate: "MENU.HOME",
        },


      ],
    },
    aside: {
      self: {},
      items: [
        {
          title: "Home",
          root: true,
          alignment: "left",
          page: "",
          translate: "MENU.HOME",
        },
      ],
    },
  };

  public get configs(): any {
    // Add all the menu modules to the main array

    
    if(this.keycloakService.isUserInRole('pda_view_module'))
    {
      this.defaults.header.items.splice(1, 0, pdaMenuModule);
      this.defaults.aside.items.splice(1, 0, pdaMenuModule);
    }

   
    this.defaults.header.items = this.prepareComponentsUrls(
      this.defaults.header.items
    );

    return this.defaults;
  }

  // Recursively add the parent's page url to the child's page url
  private prepareComponentsUrls(jObject, identifier = "") {
    return jObject.map((obj) => {
      if (obj.hasOwnProperty("page")) {
        obj.page = identifier + obj.page;
        if (obj.hasOwnProperty("submenu")) {
          obj.submenu = this.prepareComponentsUrls(obj.submenu, obj.page);
        }
      }

      return obj;
    });
  }
}
