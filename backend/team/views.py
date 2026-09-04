from rest_framework.viewsets import ModelViewSet
from .models import TeamMember
from .serializers import TeamMemberSerializer


class TeamMemberViewSet(ModelViewSet):
    serializer_class = TeamMemberSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return TeamMember.objects.all()
        return TeamMember.objects.filter(published=True)
