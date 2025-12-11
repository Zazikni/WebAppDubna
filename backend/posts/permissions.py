from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Разрешение: изменять/удалять объект может только владелец (author).
    """

    def has_object_permission(self, request, view, obj):
        # безопасные методы — всем
        if request.method in permissions.SAFE_METHODS:
            return True
        return getattr(obj, 'author', None) == request.user
