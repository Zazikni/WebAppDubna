from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, PostViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('', include(router.urls)),
]
