export const centerManagerMenuModule = {
    title: 'CENTER_MANAGER',
    root: true,
    alignment: 'left',
    toggle: 'click',
    translate: 'MENU.CENTER_MANAGER',
    page: '/center',
    submenu: [
           {
                title: 'MONITORING',
                page: '/center-manager-monitoring',
                translate: "MENU.REPORTING"
            },
            // {
            //     title: 'RECONCILIATION',
            //     page: '/store-nid-process-docs',
            //     translate: "MENU.RECONCILIATION"
            // },
            // {
            //   title: 'STATEMENT',
            //   page: '/center-manager-statement',
            //   translate: "MENU.STATEMENT"
            // },
       
    ]
}