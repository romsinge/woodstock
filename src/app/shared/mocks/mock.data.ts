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
  ]
}

export default RESOURCES;