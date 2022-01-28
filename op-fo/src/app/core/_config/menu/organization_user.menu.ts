export const organizationUserMenuModule = {
    title: 'ORGANIZATION_USER',
    root: true,
    alignment: 'left',
    toggle: 'click',
    translate: 'MENU.ORGANIZATION_USER',
    page: '/center',
    submenu: [
           {
                title: 'ISSUE_BILL',
                page: '/issue-bill',
                translate: "MENU.ISSUE_BILL"
            },
            {
                title: 'CONFIRM_BILL_PAYMENT',
                page: '/confirm-bill-payment',
                translate: "MENU.CONFIRM_BILL_PAYMENT"
            },
            {
              title: 'STATEMENT',
              page: '/user-statement',
              translate: "MENU.STATEMENT"
            },
       
    ]
}