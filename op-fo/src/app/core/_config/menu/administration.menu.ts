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
              page: '/verify-nid-process-docs',
              translate: "MENU.AGENT"
            },
            {
              title: 'BILLTYPE',
              page: '/verify-nid-process-docs',
              translate: "MENU.BILLTYPE"
            },
            {
                title: 'FEE_MODEL',
                page: '/verify-nid-process-docs',
                translate: "MENU.FEE_MODEL"
            },
            {
                title: 'TARIFF',
                page: '/verify-nid-process-docs',
                translate: "MENU.TARIFF"
            },
            {
                title: 'TARIFF_CHARGES',
                page: '/verify-nid-process-docs',
                translate: "MENU.TARIFF_CHARGES"
            },
       
    ]
}