import csv
from pathlib import Path

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from api.models import County

User = get_user_model()


class Command(BaseCommand):
    help = "Seed minimal users/data for JMeter performance tests"

    def handle(self, *args, **options):
        base_dir = Path(__file__).resolve().parents[4]
        csv_path = base_dir / "tests" / "performance tests" / "test_data" / "users.csv"

        if csv_path.exists():
            with csv_path.open(newline="", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    email = (row.get("email") or "").strip()
                    password = (row.get("password") or "").strip()
                    username = (row.get("username") or "").strip()
                    if not email:
                        continue

                    user = User.objects.filter(email=email).first()
                    if user:
                        # Keep credentials aligned with CSV for CI runs
                        user.username = username or user.username
                        if password:
                            user.set_password(password)
                        user.save()
                        self.stdout.write(f"Updated perf user: {email}")
                    else:
                        user = User(email=email, username=username or None)
                        user.set_password(password or "password")
                        user.save()
                        self.stdout.write(self.style.SUCCESS(f"Created perf user: {email}"))
                    # User.email is unique; seed one account per unique email
                    break
        else:
            self.stdout.write(self.style.WARNING(f"Perf users CSV not found: {csv_path}"))

        if not County.objects.exists():
            County.objects.create(county_name="Test County")
            self.stdout.write(self.style.SUCCESS("Created reference county"))
        else:
            self.stdout.write("Reference county data already present")

        self.stdout.write(self.style.SUCCESS("Performance seed complete"))
