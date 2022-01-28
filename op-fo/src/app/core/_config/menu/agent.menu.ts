export const agentMenuModule = {
    title: 'AGENT',
    root: true,
    alignment: 'left',
    toggle: 'click',
    translate: 'MENU.AGENT',
    page: '/agent',
    submenu: [
            {
                title: 'AGENT_BILL_PAYMENT',
                page: '/bill-payment',
                translate: "MENU.AGENT_BILL_PAYMENT"
            },
            {
              title: 'AGENT_SLIP_PRINT',
              page: '/slip-print',
              translate: "MENU.AGENT_SLIP_PRINT"
            },
            {
              title: 'AGENT_BALANCE_SHEET',
              page: '/agent-balance-sheet',
              translate: "MENU.AGENT_BALANCE_SHEET"
            },
       
    ]
}