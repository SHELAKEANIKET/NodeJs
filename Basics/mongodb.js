db.sales.aggregate([
  { $match: { quantity: 5 } },
  {
    $group: {
      _id: "$quantity",
      priceTotal: { $sum: "$price" },
      priceAverage: { $avg: "$price" },
    },
  },
]);

db.sales.aggregate([
  { $match: { price: { $gt: 25 } } },
  {
    $group: {
      _id: "$price",
      priceTotal: { $sum: "$price" },
    },
  },
  {
    $sort: { priceTotal: 1 },
  },
]);

db.sales.aggregate([
  {
    $project: {
      price: 1,
    },
  },
]);

db.sales.aggregate([
  {
    $project: {
      price: 1,
      discountedPrice: { $multiply: ["$price", 0.8] },
    },
  },
]);

db.sample.insertMany([
  {
    name: "doc 1",
    values: [12, 34, 23, 34, 12, 45, 56],
  },
  {
    name: "doc 2",
    values: [32, 35, 25, 54, 17, 67],
  },
  {
    name: "doc 3",
    values: [17, 44, 38, 15, 58, 76],
  },
  {
    name: "doc 1",
    values: [15, 23, 34, 10, 17, 27],
  },
  {
    name: "doc 1",
    values: [27, 37, 23, 38, 82, 43, 51],
  },
]);

db.sample.aggregate([
  {
    $project: {
      name: 1,
      myValues: {
        $filter: {
          input: "$values",
          as: "val",
          cond: { $gt: ["$$val", 30] },
        },
      },
    },
  },
]);
