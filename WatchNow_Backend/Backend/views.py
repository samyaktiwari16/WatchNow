from django.shortcuts import render
from .models import Movies, Watchlist, Favourite 
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer, UserSerializer, MoviesSerializer, WatchlistSerializer, FavouriteSerializer,UserProfileSerializer
from rest_framework import generics,status
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model

User = get_user_model()

# **************************************** USER VIEWS ****************************************

class RegisterUser(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]

class Profile(generics.ListCreateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()

    def get_object(self):
        return self.request.user

class LogoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")

            if not refresh_token:
                return Response(
                    {"error": "Refresh token is required"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(
                {"message": "Logout successful"},
                status=status.HTTP_205_RESET_CONTENT
            )

        except Exception as e:
            return Response(
                {"error": "Something went wrong"},
            )
# **************************************** END ****************************************


# **************************************** MOVIES VIEWS ****************************************

class Movie(generics.ListAPIView):
    serializer_class = MoviesSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Movies.objects.all()

        genre = self.request.query_params.get("genre")
        search = self.request.query_params.get("search")

        if genre:
            queryset = queryset.filter(genre__icontains=genre)

        if search:
            queryset = queryset.filter(title__icontains=search)

        return queryset
        
class Search_Movie(generics.ListAPIView):
    serializer_class = MoviesSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        query = self.request.query_params.get("search", "")
        return Movies.objects.filter(
            Q(title__icontains=query) |
            Q(director__icontains=query)
        )

class User_Watchlist(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        watchlist =  Watchlist.objects.filter(user=request.user)
        serializer = WatchlistSerializer(watchlist, many=True)
        return Response(serializer.data)


class Add_Watchlist_Movie(generics.ListCreateAPIView):
    serializer_class = WatchlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Watchlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        movie = serializer.validated_data.get('movie')
        user = self.request.user

        if Watchlist.objects.filter(user=user, movie=movie).exists():
            raise ValidationError({"message": "Movie already in watchlist"})

        serializer.save(user=user)

class Remove_Watchlist_Movie(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        movie_id = self.kwargs.get("movie_id")
        watchlist_item = Watchlist.objects.filter(
            user=request.user, 
        ).first()

        if watchlist_item:
            watchlist_item.delete()
            return Response(
                {"message": "Movie removed from watchlist"},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"error": "Movie not found in your watchlist"},
                status=status.HTTP_404_NOT_FOUND
            )


class User_Favourite(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FavouriteSerializer
 
    def get_queryset(self):
        return Favourite.objects.filter(user=self.request.user)

class Add_Favourite_Movie(generics.ListCreateAPIView):
    serializer_class = FavouriteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Favourite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        movie = serializer.validated_data.get('movie')
        user = self.request.user
        if Favourite.objects.filter(user=user, movie=movie).exists():
            return Response(
                {"message":"Movie already in favourite"},
                status=status.HTTP_200_OK
            
            )
        serializer.save(user=user)

class Remove_Favourite_Movie(generics.DestroyAPIView):
    serializer_class = FavouriteSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        movie_id = self.kwargs.get("movie_id")
        favourite_item = Favourite.objects.filter(
            user=request.user, 
        ).first()

        if favourite_item:
            favourite_item.delete()
            return Response(
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                status=status.HTTP_404_NOT_FOUND
            )
    # **************************************** END ****************************************


