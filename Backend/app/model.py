class Users:

    def __init__(self):
        self.users = []

    def add_user(self, identifier, lat, lon, cuisine, max_guest=0,
                 ingredients=None):
        # find user if exists and update data
        # otherwise add new user to users
        pass

    def remove_user(self, identifier):
        # remove user by identifier
        pass


class User:

    def __init__(self, identifier, lat, lon, cuisine, max_guest=0,
                 ingredients=None):
        self.name = identifier
        self.location = [lat, lon]
        self.cuisine = cuisine
        self.max_guest = max_guest
        self.ingredients = ingredients

    def update(self, lat, lon, cuisine, max_guest=0, ingredients=None):
        self.location = [lat, lon]
        self.cuisine = cuisine
        self.max_guest = max_guest
        self.ingredients = ingredients if ingredients else []
