# KPSS Job Aggregation Platform Deployment

## GitHub Actions Automation

This project includes automated scrapers configured as a GitHub Action.

### Setup Instructions

1. **GitHub Repository:** Push your code to a GitHub repository.
2. **Secrets:** In your GitHub repository, go to **Settings > Secrets and variables > Actions**.
3. **New Repository Secret:** Add the following secrets:
   - `SUPABASE_URL`: Your Supabase Project URL.
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key (Found in Supabase API settings).
4. **Trigger:** The scraper will run automatically at 06:00 and 15:00 UTC daily, or can be triggered manually via the "Actions" tab in GitHub.
