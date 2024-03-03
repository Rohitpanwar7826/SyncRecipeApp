require "test_helper"

class LiveRecipesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get live_recipes_index_url
    assert_response :success
  end
end
