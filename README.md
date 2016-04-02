# food-hack

## Backend API

**Definition of request body for a session. A session is created after a user went through the following steps:**

1. What kind of ingredients does he have (key: ingredients)
2. Where do you look for *cuisine* (key: location)
3. Which cuisine do you prefer? (key: cuisine)
4. How many guests could you host? (key: max_guests)

*2.* is currently optional.

```javascript
body = {
  'ingredients': ['eggplant', 'beef'],
  'location': {
    'lat': int,
    'lon': int,
  },
  'cuisine': '',
  'max_guests': int, //zero means does not want to be a host
}
```
