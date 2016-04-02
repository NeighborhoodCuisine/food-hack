class ActiveUsers:

    def __init__(self):
        self.users = []

    def __repr__(self):
        return str(self)

    def __str__(self):
        return str(self.users)

    def add_user(self, data):
        for user in self.users:
            if user.merge(data):
                return

        self.users.append(User(data))

    def remove_user(self, identifier):
        for user in self.users:
            if user.name == identifier:
                self.users.remove(user)
                break

    def joined_ingredients(self):
        ingredients = [u.ingredients for u in self.users]
        ingredients = [i for u in ingredients for i in u]
        ingredients = [i.lower() for i in ingredients]
        return list(set(ingredients))


class User:

    def __init__(self, data):
        self.name = data.get('user')
        self.location = [data.get('location').get('lat', 0),
                         data.get('location').get('lon', 0)]
        self.cuisine = data.get('cuisine', '')
        self.max_guest = data.get('max_guests', 0)
        self.ingredients = data.get('ingredients', [])

    def __repr__(self):
        return str(self)

    def __str__(self):
        ident = self.name + ': '
        ident += ', '.join([self.cuisine, str(self.max_guest)] + self.ingredients)
        ident += ' location: ' + str(self.location[0]) + ', ' + str(self.location[1])
        return ident

    def merge(self, data):
        if self.name != data.get('user'):
            return False
        else:
            self.location = [data.get('lat'), data.get('lon')]
            self.cuisine = data.get('cuisine')
            self.max_guest = data.get('max_guests')
            self.ingredients = data.get('ingredients')
            return True
