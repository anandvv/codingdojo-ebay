# Mongo DB

### Mongo DB vs SQL terminology

| Database Type                                | Sql           | MongoDB       |
| -------------------------------------------- |:-------------:| -------------:|
| Database                                     | Schema        | Database (DB) |
| Collection of related records                | tables        |   Collections |
| Each one record in the collection of records | Row/Record    |   Document    |

### Practice assignment

Create a new db
```
use my_first_db
```

Insert into db (Will create collection if not existing)
```
db.students.insert({name: "Leon", home_state: "CA", lucky_number: 6, birthday: {month: 6, day: 6, year: 1992}})
db.students.insert({name: "Kim", home_state: "WA", lucky_number: 54, birthday: {month: 4, day: 20, year: 1996}})
db.students.insert({name: "George", home_state: "CA", lucky_number: 14, birthday: {month: 4, day: 16, year: 1993}})
db.students.insert({name: "Jason", home_state: "WA", lucky_number: 100, birthday: {month: 3, day: 30, year: 1992}})
db.students.insert({name: "Josie", home_state: "NY", lucky_number: 0, birthday: {month: 1, day: 13, year: 1990}})
```

Find students with home_state as "CA" or "WA"
```
db.students.find({"home_state":/CA|WA/})
```

Find records with lucky_number > 3
```
db.students.find({"lucky_number":{ $gt: 3} })
```

Find records with lucky_number <= 10
```
db.students.find({"lucky_number":{ $lte: 10} })
```

Find records with lucky_number between 1 and 9 (inclusive)
```
db.students.find({"lucky_number":{ $lte: 9, $gte: 1} })
```

Update all student documents with new field "interests" having interest: coding, brunch, MongoDB
```
db.students.updateMany( {}, {$set: {interests: ['coding', 'brunch', 'MongoDB']} }  )
```

Add a unique interest to the interest array for one of the students
```
db.students.update({"name":"Leon"},{$push:{"interests":"NodeJS"}})
db.students.update({"name":"George"},{$push:{"interests":"Taxes"}})
```

Remove an interest from the interest array
```
db.students.update({"name":"George"},{$pop:{"interests":"Taxes"}})
```

Remove all students with home state from CA
```
db.students.remove({"home_state": "CA"})
```

Remove student by name
```
db.students.remove({"name": "Kim"}, {justOne: true})
```

Remove one student with lucky number greater than 5
```
db.students.remove({"lucky_number": {$gt:5}}, {justOne: true})
```

Add a field to each student collection called 'number_of_belts' and set it to 0.
```
db.students.updateMany( {}, {$set: {number_of_belts: 0} }  )
```

Increment this field by 1 for all students in Washington (Seattle Dojo).
```
db.students.updateMany({"home_state":"WA"},{$inc:{"number_of_belts": 1}})
```

Rename the 'number_of_belts' field to 'belts_earned'
```
db.students.update({}, {$rename:{'number_of_belts':'belts_earned'}},{multi:true})
```

Remove the 'lucky_number' field.
```
db.students.update({},{$unset:{"lucky_number":1}},{multi:true})
```

Add a 'updated_on' field, and set the value as the current date.
```
db.students.updateMany( {}, {$currentDate: {updated_on: true } } )
```
