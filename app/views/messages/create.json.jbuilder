json.content @message.content
json.user_name @message.user.name
json.user_id @message.user_id
json.group_id @message.group_id
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.image @message.image.url
