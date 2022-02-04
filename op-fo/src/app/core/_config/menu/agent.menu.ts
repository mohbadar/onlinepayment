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
              title: 'PAY_ONLINE_BILL',
              page: '/agent-online-bill-payment',
              translate: "MENU.PAY_ONLINE_BILL"
            },
       
            {
              title: 'AGENT_SLIP_PRINT',
              page: '/slip-print',
              translate: "MENU.AGENT_SLIP_PRINT"
            },
            {
              title: 'AGENT_BALANCE_SHEET',
              page: '/agent-balance-sheet',
              translate: "MENU.BALANCE_SHEET"
            },

        

            
    ]
}