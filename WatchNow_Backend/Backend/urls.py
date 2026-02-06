
from django.urls import path
from . views import  (RegisterUser,Movie, User_Watchlist, User_Favourite, Add_Watchlist_Movie, Add_Favourite_Movie, Remove_Watchlist_Movie, 
  Remove_Favourite_Movie, Search_Movie, Profile, LogoutView )
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path("register/", RegisterUser.as_view()),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path("logout/", LogoutView.as_view(), name="logout"),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', Profile.as_view(), name='user-profile'),
    path('', Movie.as_view(),name="Movieslist"),
    path("movies/search/", Search_Movie.as_view()),
    path('watchlist/' , User_Watchlist.as_view(),name="Watchlist"),
    path('add/watchlist/', Add_Watchlist_Movie.as_view(),name="Add-Watchlist"),
    path('remove/watchlist/<int:pk>/',Remove_Watchlist_Movie.as_view(),name="Remove-Watchlist"),
    path('favourite/', User_Favourite.as_view(),name="Favourite"),
    path('add/favourite/', Add_Favourite_Movie.as_view(),name="Add-favourite-movies"),
    path('remove/favourite/<int:pk>/', Remove_Favourite_Movie.as_view(),name="Remove-favourite-movies"),
]