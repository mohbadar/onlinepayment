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
              title: 'AGENT',
              page: '/agent',
              translate: "MENU.AGENT"
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
                title: 'TARIFF',
                page: '/tariff',
                translate: "MENU.TARIFF"
            },
            {
                title: 'TARIFF_CHARGES',
                page: '/tariff-charges',
                translate: "MENU.TARIFF_CHARGES"
            },
       
    ]
}