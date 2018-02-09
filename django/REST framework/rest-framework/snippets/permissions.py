from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of on object to edit it
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        # so we'll alwaysallow GET, HEAD or OPTIONS requests
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippets
        return obj.owner == request.user
