from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from .models import Team, User, Workout, Activity, Leaderboard

class APITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.team = Team.objects.create(name='Test Team')
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='pass', team=self.team)
        self.workout = Workout.objects.create(name='Test Workout', description='Test Desc')
        self.activity = Activity.objects.create(user=self.user, workout=self.workout, duration=10)
        self.leaderboard = Leaderboard.objects.create(user=self.user, score=50)

    def test_api_root(self):
        response = self.client.get(reverse('api-root'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('users', response.data)

    def test_users_endpoint(self):
        response = self.client.get(reverse('user-list'))
        self.assertEqual(response.status_code, 200)

    def test_teams_endpoint(self):
        response = self.client.get(reverse('team-list'))
        self.assertEqual(response.status_code, 200)

    def test_workouts_endpoint(self):
        response = self.client.get(reverse('workout-list'))
        self.assertEqual(response.status_code, 200)

    def test_activities_endpoint(self):
        response = self.client.get(reverse('activity-list'))
        self.assertEqual(response.status_code, 200)

    def test_leaderboard_endpoint(self):
        response = self.client.get(reverse('leaderboard-list'))
        self.assertEqual(response.status_code, 200)
