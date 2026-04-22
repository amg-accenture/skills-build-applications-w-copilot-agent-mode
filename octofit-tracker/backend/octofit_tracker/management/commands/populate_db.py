from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from octofit_tracker.models import Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Team Marvel')
        dc = Team.objects.create(name='Team DC')

        # Create Users
        tony = User.objects.create_user(username='ironman', email='tony@marvel.com', password='pass', team=marvel)
        steve = User.objects.create_user(username='captain', email='steve@marvel.com', password='pass', team=marvel)
        bruce = User.objects.create_user(username='hulk', email='bruce@marvel.com', password='pass', team=marvel)
        clark = User.objects.create_user(username='superman', email='clark@dc.com', password='pass', team=dc)
        brucew = User.objects.create_user(username='batman', email='bruce@dc.com', password='pass', team=dc)
        diana = User.objects.create_user(username='wonderwoman', email='diana@dc.com', password='pass', team=dc)

        # Create Workouts
        run = Workout.objects.create(name='Running', description='Run 5km')
        swim = Workout.objects.create(name='Swimming', description='Swim 1km')
        lift = Workout.objects.create(name='Weight Lifting', description='Lift 100kg')

        # Create Activities
        Activity.objects.create(user=tony, workout=run, duration=30)
        Activity.objects.create(user=steve, workout=swim, duration=45)
        Activity.objects.create(user=bruce, workout=lift, duration=60)
        Activity.objects.create(user=clark, workout=run, duration=25)
        Activity.objects.create(user=brucew, workout=lift, duration=50)
        Activity.objects.create(user=diana, workout=swim, duration=40)

        # Create Leaderboard
        Leaderboard.objects.create(user=tony, score=100)
        Leaderboard.objects.create(user=steve, score=90)
        Leaderboard.objects.create(user=bruce, score=80)
        Leaderboard.objects.create(user=clark, score=95)
        Leaderboard.objects.create(user=brucew, score=85)
        Leaderboard.objects.create(user=diana, score=88)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data'))
