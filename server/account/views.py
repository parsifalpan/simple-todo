from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import (
    login as django_login,
    authenticate,
    logout as django_logout,
)
from google.oauth2 import id_token
from google.auth.transport import requests

from account.serializers import (
    LoginSerializer,
    ChangePasswordSerializer,
    UserDetailSerializer,
    GoogleAuthSerializer,
    EditProfileSerializer
)


class AccountViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['POST'])
    def login(self, request):
        serializer = LoginSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password']
        )

        if user is None:
            return Response({'detail': 'wrong username or password'}, status=status.HTTP_406_NOT_ACCEPTABLE)

        django_login(request, user)
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def google_auth(self, request):
        serializer = GoogleAuthSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = serializer.validated_data['id_token']
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), '690489001243-5spb7ars2v8uk7aae8eq89vgmbf43t26.apps.googleusercontent.com')
            userid = idinfo['sub']

            user = User.objects.filter(username=userid).first()
            if user is None:
                user = User.objects.create_user(
                    username=userid,
                    email=idinfo['email'],
                    first_name=idinfo['given_name'],
                    last_name=idinfo['family_name'],
                )

            django_login(request, user)
            return Response(status=status.HTTP_200_OK)
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['POST'])
    def logout(self, request):
        django_logout(request)
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def register(self, request):
        serializer = LoginSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            User.objects.create_user(
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password'],
            )
        except Exception as e:
            return Response({'detail': 'username already exists'}, status=status.HTTP_406_NOT_ACCEPTABLE)

        user = authenticate(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password']
        )
        if user is None:
            return Response({'detail': 'wrong username or password'}, status=status.HTTP_406_NOT_ACCEPTABLE)

        django_login(request, user)
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def change_password(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if not serializer.is_valid():
            error = 'wrong parameters'
        elif not request.user.check_password(serializer.validated_data['old_password']):
            error = 'wrong old password'
        else:
            success = 'change password succeed'
            request.user.set_password(serializer.validated_data['new_password'])
            request.user.save()
            return Response(data={'detail': success}, status=status.HTTP_202_ACCEPTED)
        return Response(data={'detail': error}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['GET'])
    def user(self, request):
        if (not request.user) or (not request.user.is_authenticated):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer = UserDetailSerializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=['POST'])
    def edit_profile(self, request):
        if (not request.user) or (not request.user.is_authenticated):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer = EditProfileSerializer(data=request.data)
        if serializer.is_valid():
            User.objects.filter(id=request.user.id).update(
                email=serializer.validated_data['email'],
                first_name=serializer.validated_data['first_name'],
                last_name=serializer.validated_data['last_name'],
            )
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
