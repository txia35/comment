from rest_framework import viewsets, status
from rest_framework.response import Response
from django.utils import timezone
from .models import Comment
from .serializers import CommentSerializer


class CommentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing comments.
    Provides list, create, retrieve, update, and delete operations.
    """
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def create(self, request, *args, **kwargs):
        """
        Create a new comment from Admin user with current timestamp.
        """
        data = request.data.copy()
        data['author'] = 'Admin'
        data['date'] = timezone.now()

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        """
        Update an existing comment (edit text).
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        """
        Partially update a comment (PATCH).
        """
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)
