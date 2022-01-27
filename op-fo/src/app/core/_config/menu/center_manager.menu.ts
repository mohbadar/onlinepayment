export const centerManagerMenuModule = {
    title: 'CENTER_MANAGER',
    root: true,
    alignment: 'left',
    toggle: 'click',
    translate: 'MENU.CENTER_MANAGER',
    page: '/agent',
    submenu: [
           {
                title: 'MONITORING',
                page: '/store-nid-process-docs',
                translate: "MENU.MONITORING"
            },
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
       
    ]
}