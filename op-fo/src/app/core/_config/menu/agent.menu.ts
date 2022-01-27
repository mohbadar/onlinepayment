export const agentMenuModule = {
    title: 'AGENT',
    root: true,
    alignment: 'left',
    toggle: 'click',
    translate: 'MENU.AGENT',
    page: '/agent',
    submenu: [
           {
                title: 'BILL_PAYMENT',
                page: '/store-nid-process-docs',
                translate: "MENU.BILL_PAYMENT"
            },
            {
              title: 'SLIP',
              page: '/store-nid-process-docs',
              translate: "MENU.SLIP_PRINT"
            },
            {
              title: 'BALANCE_SHEET',
              page: '/find-nid-process-docs',
              translate: "MENU.BALANCE_SHEET"
            },
       
    ]
}