import json
from pathlib import Path
from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_datetime
from comments.models import Comment


class Command(BaseCommand):
    help = 'Load comments from JSON file into the database'

    def handle(self, *args, **options):
        # Get the path to the JSON file
        json_path = Path(__file__).resolve().parent.parent.parent.parent / 'comments.json'

        # Load the JSON data
        with open(json_path, 'r') as f:
            data = json.load(f)

        # Clear existing comments
        Comment.objects.all().delete()
        self.stdout.write(self.style.WARNING('Cleared existing comments'))

        # Create comments from JSON data
        comments_created = 0
        for comment_data in data['comments']:
            Comment.objects.create(
                author=comment_data['author'],
                text=comment_data['text'],
                date=parse_datetime(comment_data['date']),
                likes=comment_data['likes'],
                image=comment_data.get('image', '')
            )
            comments_created += 1

        self.stdout.write(
            self.style.SUCCESS(f'Successfully loaded {comments_created} comments')
        )
