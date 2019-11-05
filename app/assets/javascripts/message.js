$(function(){
  function buildHTML(message){
    var html = `<div class="message">
                  <div class="message-upper-info">
                    <div class="message-upper-info__talker">
                    ${message.user_name}
                    </div>
                    <div class="message-upper-info__date">
                    ${message.created_at}
                    </div>
                  </div>
                  <div class="message-lower">
                    <p class="message-lower__text">
                      ${message.content}
                    </p>
                  </div>
                    ${message.image?
                      `<img class="message-lower__image" src= ${message.image}>` :''
                    }`
                
                
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      console.log(html)
      $('.messages').append(html)
      $('#message_content').val('')
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.submit-btn').removeAttr("disabled");
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
  })
  
})