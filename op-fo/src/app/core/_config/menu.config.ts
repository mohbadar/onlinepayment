import { KeycloakService } from 'keycloak-angular';
import { pdaMenuModule } from "./menu/pda.menu";
import { administrationMenuModule } from "./menu/administration.menu";
import { agentMenuModule } from "./menu/agent.menu";
import { organizationAdminMenuModule } from "./menu/organization_admin.menu";
import { organizationUserMenuModule } from "./menu/organization_user.menu";
import { centerManagerMenuModule } from "./menu/center_manager.menu";


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

    if(this.keycloakService.isUserInRole('administration_module_view')){
      this.defaults.header.items.splice(1, 0, administrationMenuModule);
      this.defaults.aside.items.splice(1, 0, administrationMenuModule);
    }

    if(this.keycloakService.isUserInRole('agent_module_view'))
    {
      this.defaults.header.items.splice(1, 0, agentMenuModule);
      this.defaults.aside.items.splice(1, 0, agentMenuModule);
    }

    if(this.keycloakService.isUserInRole('organization_admin_module_view')){
      this.defaults.header.items.splice(1, 0, organizationAdminMenuModule);
      this.defaults.aside.items.splice(1, 0, organizationAdminMenuModule);
    }

    if(this.keycloakService.isUserInRole('organization_user_module_view')){
      this.defaults.header.items.splice(1, 0, organizationUserMenuModule);
      this.defaults.aside.items.splice(1, 0, organizationUserMenuModule);
    }

    if(this.keycloakService.isUserInRole('center_manager_module_view')){
      this.defaults.header.items.splice(1, 0, centerManagerMenuModule);
      this.defaults.aside.items.splice(1, 0, centerManagerMenuModule);
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
