writeCode

Insert the data present in users.json into local mongodb database using `mongoimport` into a database called sample and collection named as users.

mongoimport --db sample --collection users --file '/Users/abhi/Work/express_js/TA-AC-BACKEND-mongodb-indexes-and-aggregation-TMaaab/block-BMaaam/users.json' --jsonArray


Write aggregation queries to perform following tasks.

1. Find all users who are active.
> db.users.aggregate([{ $match: { isActive: true } },])

2. Find all users whose name includes `blake` case insensitive.

db.users.aggregate(
   [
     { $match: { $text: { $search: "blake" } } },
   ]
)



3. Find all males.
db.users.aggregate([{ $match: { gender: "male" } },])

4. Find all active males.
db.users.aggregate([{ $match: { gender: "male", isActive: true} },])


5. Find all active females whose age is >= 25.

db.users.aggregate(
   [
     {
       $project:
          {
            name: 1,
            age: 1,
            gender:1,
            isActive: 1,
            "eyeColor" : 1,
            ageGt25: { $gte: [ "$age", 25 ] },
            _id: 0
          }
     },
     {
       $match:
       {
        "ageGt25":true,
        "isActive" : true, 
        "gender" : "female"
       }
     }
   ]
)



6. Find all 40+ males with green eyecolor.
db.users.aggregate(
   [
     {
       $project:
          {
            name: 1,
            age: 1,
            gender:1,
            "eyeColor" : 1,
            ageGt40: { $gte: [ "$age", 40 ] },
            _id: 0
          }
     },
     {
       $match:
       {
         ageGt40:true,
         "eyeColor" : "green",
         "gender" : "male"
       }
     }
   ]
)

7. Find all blue eyed men working in 'USA'.

db.users.aggregate([{ $match: { "eyeColor" : "blue", "company.location.country" : "USA" } },])

8. Find all female working in Germany with green eyes and apple as favoriteFruit.

db.users.aggregate([{ $match: { gender:"female", "eyeColor" : "green", "favoriteFruit" : "apple" ,"company.location.country" : "Germany" } },]).pretty()


9. Count total male and females.

db.users.aggregate([{ $group: {_id: "$gender", count: { $sum: 1 }}}])


10. Count all whose eyeColor is green.

db.users.aggregate([
  { $match : { "eyeColor": "green"}},
  { $group: {_id: null, count: { $sum:1 }}}
]);

11. Count all 20+ females who have brown eyes.
db.users.aggregate([
  {
       $project:
          {
            name: 1,
            age: 1,
            gender:1,
            "eyeColor" : 1,
            ageGt20: { $gte: [ "$age", 20 ] },
            _id: 0
          }
  },
  { $match : { "ageGt20":true, "eyeColor":"brown"}},
  { $group: { _id: null, myCount: { $sum: 1 } } },

])

12. Count all occurences of all eyeColors.
    Something like:-


db.users.aggregate([
  { $group: {_id: "$eyeColor", count: { $sum:1 }}}
]);

```
blue -> 30
brown -> 67
green -> 123
```

13. Count all females whose tags array include `amet` in it.
db.users.aggregate([
  {
    $project: {
      "username" : "$name",
      gender:1,
      "has amet" : {
        $in: [ "amet", "$tags" ]
      }
    }
  },
  { $match: {
    "has amet" : true,
    "gender": "female"
  }},
  { $group: { _id: null, amet: { $sum: 1 } } },
])

14. Find the average age of entire collection
db.users.aggregate([
  {
    $group: {
      _id: null,
      avg_age: { $avg: "$age" },
    },
  },
]);



15. Find the average age of males and females i.e. group them by gender.
db.users.aggregate([
  {
    $group: {
      _id: "$gender",
      avg_age: { $avg: "$age" },
    },
  },
]); 

16. Find the user with maximum age.


db.users.aggregate([
    {
        $group: {
            _id: null,
            maxAge: {$max: "$age"}
        }
    }
])

17. Find the document with minimum age.

db.users.aggregate([
    {
        $group: {
            _id: null,
            minAge: {$min: "$age"}
        }
    }
])

18. Find the sum of ages of all males and females.
db.users.aggregate(
   [
     {
       $group:
         {
           _id: "$gender",
           totalAmount: { $sum: "$age" },
           count: { $sum: 1 }
         }
     }
   ]
)

19. Group all males by their eyeColor.

db.users.aggregate(
   [

     { $match: {"gender" : "male"}},
     {
       $group:
         {
           _id: "$eyeColor", 
           totalAmount: { $sum: "$age" },
           count: { $sum: 1 }
         }
     }
   ]
)

20. group all 30+ females by their age.

db.users.aggregate([
  { $match: {"gender" : "female"}},
  {
       $project:
          {
            name: 1,
            age: 1,
            gender:1,
            ageGt30: { $gte: [ "$age", 30 ] },
            _id: 0
          }
  },
  { $match : { "ageGt30":true}},
  { $group: { _id: "$age", count: { $sum: 1 } } },
])


21. Group all 23+ males with blue eyes working in Germany.
db.users.aggregate([
  { $match: {"gender" : "male", "eyeColor": "blue", "company.location.country" : "Germany"}},
  {
    $project:
      {
        name: 1,
        age: 1,
        gender:1,
        eyeColor:1,
        company:1,
        ageGt23: { $gte: [ "$age", 23 ] },
        _id: 0
      }
  },
  { $match : { "ageGt23":true}},
  { $group: { _id: "$age", count: { $sum: 1 } } },
])



22. Group all by tag names i.e. use \$unwind since tags are array.
db.users.aggregate([
  {
    $unwind: "$tags"
  },
  { $group: { _id: "$tags", count: { $sum: 1 } } },
])


23. Group all males whose favoriteFruit is `banana` who have registered before 2015.

db.users.aggregate(
   [
     { $match: {"gender" : "male", "favoriteFruit" : "banana", "registered": { $lte: new Date("2015/01/01") }}},
     {
       $group:
         {
           _id: null, 
           count: { $sum: 1 }
         }
     }
]) 

24. Group all females by their favoriteFruit.
db.users.aggregate(
   [

     { $match: {"gender" : "female"}},
     {
       $group:
         {
           _id: "$favoriteFruit", 
           count: { $sum: 1 }
         }
     }
   ]
)


25. Scan all the document to retrieve all eyeColors(use db.COLLECTION_NAME.distinct);
db.users.distinct("eyeColor")


26. Find all apple loving blue eyed female working in 'USA'. Sort them by their registration date in descending order.

db.users.aggregate([
  { $match: {"gender": "female", "favoriteFruit" : "apple", "eyeColor":"blue", "company.location.country" : "USA"}
  },
  {
    $sort: {
     registered : -1
    }
  },
])

27. Find all 18+ inactive men and return only the fields specified below in the below provided format

db.users.aggregate([
  { $match: {"gender" : "male", "isActive": false}},
  {
    $project:
      {
        name: 1,
        email: "$company.email",
        identity: {
          eye:"$eyeColor",
          phone:"$company.phone",
          location:"$company.location"
        },
        _id: 0
      }
  },
]).pretty()



```js
{
  name: "",
  email: '';
  identity: {
    eye: '',
    phone: '',
    location: ''
  }
}
```
