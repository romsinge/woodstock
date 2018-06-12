const RESOURCES = {
  "WoodTypes": [
    {
      id: "0",
      name: 'Chêne',
      price: 130,
      weight: 30
    },
    {
      id: "1",
      name: 'Hêtre',
      price: 35,
      weight: 10
    },
    {
      id: "2",
      name: 'Frêne',
      price: 100,
      weight: 20
    }
  ],
  "Stocks": [
    {
      id: "0",
      quantity: 3,
      woodTypeId: "2",
      priceTotal: 300,
      weightTotal: 60
    }
  ],
  "Providers": [
    {
      id: "0",
      name: "SIMC",
      email: "simc@simc.fr",
      address: "14 rue bertrand, 13002 Marseille"
    }
  ],
  "Clients": [
    {
      id: "0",
      name: "Mme Michu",
      email: "michu@orange.fr",
      address: "12 rue de l'avoine, 13001 Marseille"
    }
  ],
  "PurchaseOrders": [
    {
      dateCreation: new Date(),
      quantity: 2,
      priceTotal: 167,
      weightTotal: 684,
      woodTypeId: "1",
      clientId: "0"
    }
  ],
  "BuyingOrders": [
    {
      id: "0",
      dateCreation: new Date(),
      quantity: 2,
      priceTotal: 167,
      weightTotal: 684,
      woodTypeId: "1",
      providerId: "0"
    }
  ]
}

export default RESOURCES;