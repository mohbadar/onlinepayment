export const administrationMenuModule = {
    title: 'Administration',
    root: true,
    alignment: 'left',
    toggle: 'click',
    translate: 'MENU.ADMINISTRATION',
    page: '',
    submenu: [
           {
                title: 'PROVINCE',
                page: '/province',
                translate: "MENU.PROVINCE"
            },
            {
              title: 'Organization',
              page: '/organization',
              translate: "MENU.ORGANIZATION"
            },
            {
              title: 'CENTER',
              page: '/center',
              translate: "MENU.CENTER"
            },
            {
              title: 'AGENT_MANAGEMETNNT',
              page: '/agent',
              translate: "MENU.AGENT",     
            },
            {
              title: 'BILLTYPE',
              page: '/bill-type',
              translate: "MENU.BILLTYPE"
            },
            {
                title: 'FEE_MODEL',
                page: '/fee-model',
                translate: "MENU.FEE_MODEL"
            },

            {
              title: 'THIRD_PARTY_INTEGRATION',
              page: '/third-party-integration',
              translate: "MENU.THIRD_PARTY_INTEGRATION"
          },

            
            // {
            //     title: 'TARIFF',
            //     page: '/tariff',
            //     translate: "MENU.TARIFF"
            // },
            // {
            //     title: 'TARIFF_CHARGES',
            //     page: '/tariff-charges',
            //     translate: "MENU.TARIFF_CHARGES"
            // },
       
    ]
}