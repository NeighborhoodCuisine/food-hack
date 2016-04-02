class User:

    def __init__(self, identifier, lat, lon, cuisine, max_guest=0,
                 ingredients=[]):
        self.name = identifier
        self.location = [lat, lon]
        self.cuisine = cuisine
        self.max_guest = max_guest
        self.ingredients = ingredients
