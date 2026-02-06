from rest_framework import serializers
from .models import Movies,Favourite,Watchlist
from django.contrib.auth import get_user_model

User = get_user_model()

# **************************************** USER ****************************************

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already registered")
        return value

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already taken")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email','password']   

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

# **************************************** MOVIES ****************************************

class MoviesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movies
        fields = '__all__'

class WatchlistSerializer(serializers.ModelSerializer):
    movie = MoviesSerializer(read_only=True) 
    movie_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Watchlist
        fields = ['id', 'movie', 'movie_id', 'added_at']


    def get_movie(self, obj):
        return {
            "id": obj.movie.id,
            "title": obj.movie.title,
            "released_date": obj.movie.released_date,
            "image_link": obj.movie.image_link,
            "rating": obj.movie.rating,
            "genre": obj.movie.genre,
            "duration": obj.movie.duration,
            "director": obj.movie.director,
        }

class FavouriteSerializer(serializers.ModelSerializer):
    movie = MoviesSerializer(read_only=True)
    movie_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Favourite
        fields = ['id', 'movie', 'movie_id', 'added_at']

    def get_movie(self, obj):
        return {
            "id": obj.movie.id,
            "title": obj.movie.title,
            "released_date": obj.movie.released_date,
            "image_link": obj.movie.image_link,
            "rating": obj.movie.rating,
            "genre": obj.movie.genre,
            "duration": obj.movie.duration,
            "director": obj.movie.director,
        }