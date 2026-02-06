from django.contrib import admin
from .models import  Movies, Watchlist, Favourite


admin.site.register(Movies)
class MovieAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "release_date", "director", "genre", "rating") 
admin.site.register(Watchlist)
admin.site.register(Favourite)