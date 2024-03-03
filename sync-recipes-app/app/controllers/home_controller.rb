class HomeController < ApplicationController
  def index
  end

  def start_broad_cast_random_recipie
    RandomRecipieBroadCastJob.perform_later
    flash[:Random_RECIPE] = "Background job start for random recipies"
    redirect_to root_path
  end

  def stop_broad_cast_random_recipie
    RandomRecipieBroadCastJob.perform_later
  end

  def start_live_recipe
    LiveRecipeJob.perform_later()
    flash[:Live_RECIPE] = "STARTED LIVE RECIPE'S....!"
    redirect_to root_path
  end
end
