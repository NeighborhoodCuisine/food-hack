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

cuisine_options = [african, chinese, japanese, korean, vietnamese, thai, indian, british, 
  irish, french, italian, mexican, spanish, middle eastern, jewish, american, cajun, 
  southern, greek, german, nordic, eastern european, caribbean, or latin american]
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
## Inspiration
Don't we all know the situation: You are home alone,  standing in front of the fridge and looking at the ingredients you have no idea how to use. Even less so if it means cooking all by yourself. 
Or picture this: a student in a new city, wanting to get to know new people, but without any motivation to go partying or starting up Tinder. 
We want to help people in these situations all while doubling down on wasting food.

## What it does
We built a lightweight mobile app - for iOS and Android - to get them - **the neighbors** -  together and cook a tasty meal - **Neighborhood Cuisine** style -, all while using ingredients they already had at home; and also show the few ingredients of that fancy recipe which might be missing.
The app analyses the locations of the users and the ingredients they supply to group them to recipes and enables them to find each other on Facebook to organise their lunch or dinner. It also has a host option to make sure there always is a location available for the group to cook at.

## How we built it
The backend is powered by _flask, python_ and utilizes the **spoonacular api** to search their recipe database for the ingredients supplied by the neighbors and to find missing ingredients. It is also responsible for filtering the possible matches based on their respective locations. After receiving the user data it is matching active users. In case of success it then sends the fitting group, recipe, missing ingredients and host location to the frontend for each user to access. At the moment Facebook is the only possible login option, so users can use Messenger to communicate after having been matched.
The frontend takes care of the login process, displaying the states the app is in (ready, pending), offering a list to add ingredients to and an option to host a cooking session Neighborhood Cuisine style (with a maximal guest amount). It is written using the JavaScript framework React Native for cross platform development.

## Challenges we ran into
On many occasions we had to step shorter than we would have liked, because of the limitations the short time span imposed on us. We identified multiple possibilities to further the scope of the app that sadly just didn't make the cut after us realising what lied in our reach in 24 hours and which features where the most important to us. 
There also were plenty of possibilities to fume over unexplainable error messages and bugs, but luckily we could fix almost all of them in the end.
Some team members weren't as proficient using some of the technologies as others, but and all in all it was a very good learning experience.
For one team member it was the first time at a hackathon and as if that wasn't enough he also wasn't quite able to get all the development tools running in an appropriate time frame (partly due to his malicious hardware), but the team found other uses for his talent (like typing this report).

## Accomplishments that we're proud of
Bringing social aspects into play by having a full fledged Facebook login and profile integration. 
Following the consumption conscious spirit of foodHacks by finding ways to combine available resources.

## What we learned
How to not setup an Ubuntu distribution for React Native development.
How to use React Native for cross platform development.
Flask, Rest APIs and http requests development practices.
The huge possibilities with the endless amount of free open apis out there.

## What's next for Neighborhood Cuisine
Better matching algorithm.
Better organisational features for groups.
More sophisticated filters for users - e.g. allergens, vegan.
User feedback for recipes and other people.
Performance and scalability improvements. 
