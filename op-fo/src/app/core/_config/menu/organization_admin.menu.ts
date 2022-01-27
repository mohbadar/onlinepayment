export const organizationAdminMenuModule = {
    title: 'ORGANIZATION_ADMIN',
    root: true,
    alignment: 'left',
    toggle: 'click',
    translate: 'MENU.ORGANIZATION_ADMIN',
    page: '/agent',
    submenu: [
           {
                title: 'RECONCILIATION',
                page: '/store-nid-process-docs',
                translate: "MENU.RECONCILIATION"
            },
            {
              title: 'STATEMENT',
              page: '/store-nid-process-docs',
              translate: "MENU.STATEMENT"
            },
            {
              title: 'MONITORING',
              page: '/find-nid-process-docs',
              translate: "MENU.BALANCE_SHEET"
            },
            {
                title: 'CENTER_USER_RELATION',
                page: '/find-nid-process-docs',
                translate: "MENU.CENTER_USER_RELATION"
            },
            {
                title: 'CENTER',
                page: '/find-nid-process-docs',
                translate: "MENU.CENTER"
            }
       
    ]
}