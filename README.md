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
  'id': string, //id for user
  'ingredients': ['eggplant', 'beef'],
  'location': {
    'lat': float,
    'lon': float,
  },
  'cuisine': string,
  'max_guests': int, //zero means does not want to be a host
}
```


**Definition of a request body for instantiating a user. The user data is extracted from facebook.**
```javascript
user = {
  'id': string,
  'email': string,
  'first_name': string,
  'last_name': string,
  'fb_link': string,
  'small_image_url': string,
  'fb_token': string,
  'age_range': {
    'max': int,
    'min': int
  },
  'gender': 'male' | 'female' // I guess
}
```
