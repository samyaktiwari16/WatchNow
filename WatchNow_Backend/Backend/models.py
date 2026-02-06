from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15, blank=True)
    bio = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username

class Movies(models.Model):
    title = models.CharField(max_length=100)
    released_date = models.DateField()
    duration = models.PositiveIntegerField(help_text="Duration in minutes")
    director = models.CharField(max_length=100)
    image_link = models.URLField(blank=True, null=True)
    rating = models.FloatField(null=True, blank=True)
    genre = models.CharField(max_length=50,default='Action')
    class Meta:
        verbose_name = "Movie"           
        verbose_name_plural = "Movies"

    def __str__(self):
        return f"The name of movie is {self.title} and it is {self.genre} movie and released on {self.released_date}"
    
class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movies, on_delete=models.CASCADE, db_column='movies_id')
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Watchlist"           
        verbose_name_plural = "Watchlist"
        constraints = [
            models.UniqueConstraint(
                fields=["user", "movie"],
                name="unique_user_movie_watchlist"
            )
        ]

    def __str__(self):
        return f"{self.user} added {self.movie} to watchlist"

class Favourite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movies, on_delete=models.CASCADE, db_column='movies_id')
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Favourite"           
        verbose_name_plural = "Favourite"
        constraints = [
            models.UniqueConstraint(
                fields=["user", "movie"],
                name="unique_user_movie_favourite"
            )
        ]

    def __str__(self):
        return f"{self.user} added {self.movie} to favourite"


