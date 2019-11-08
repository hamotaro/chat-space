class Api::MessagesController < ApplicationController
  skip_before_action :index, only: users
  def index
    group = Group.find(params[:group_id])
    last_message_id = params[:id].to_i
    @messages = group.messages.includes(:user).where("id > #{last_message_id}")
    respond_to do |format| 
      format.html 
      format.json
    end
  end
end