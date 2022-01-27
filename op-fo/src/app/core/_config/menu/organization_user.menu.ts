export const organizationUserMenuModule = {
    title: 'ORGANIZATION_USER',
    root: true,
    alignment: 'left',
    toggle: 'click',
    translate: 'MENU.ORGANIZATION_USER',
    page: '/agent',
    submenu: [
           {
                title: 'ISSUE_BILL',
                page: '/store-nid-process-docs',
                translate: "MENU.ISSUE_BILL"
            },
            {
                title: 'CONFIRM_BILL_PAYMENT',
                page: '/store-nid-process-docs',
                translate: "MENU.CONFIRM_BILL_PAYMENT"
            },
            {
              title: 'STATEMENT',
              page: '/store-nid-process-docs',
              translate: "MENU.STATEMENT"
            },
       
    ]
}