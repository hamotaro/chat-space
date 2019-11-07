$(function(){
  function buildHTML(message){
    var html = `<div class="message" data-id=${message.id}>
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
  var buildMessageHTML = function(message) {
    var image_url = (message.image)? `<image class="message-lower__image" src="${message.image}">`:"";
    var content_text = (message.content)? `<p class="message-lower__text">
                                             ${message.content}
                                           </p>`:"";
    if (message.content && message.image) {
      var html = `<div class="message" data-id= ${message.id} >
        <div class="message-upper-info"> 
          <div class="message-upper-info__talker">
            ${message.user_name}
          </div> 
          <div class="message-upper-info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">`
          content_text
          image_url
        `</div>
      </div>`
    } else if (message.content) {
      var html = `<div class="message" data-id=${message.id}>
        <div class="message-upper-info">
          <div class="message-upper-info__talker">
           ${message.user_name}
          </div>
          <div class="message-upper-info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">`
          content_text
          image_url
        `</div>
        </div>
      </div>`
    } else if (message.image) {
      var html = `<div class="message" data-id=${message.id}h>
        <div class="message-upper-info">
          <div class="message-upper-info__talker">
            ${message.user_name}
          </div>
          <div class="message-upper-info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">`
          content_text
          image_url
        `</div>
      </div>`
      
    } 
    return html;
  };

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
      $('.messages').append(html)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.submit-btn').removeAttr("disabled");
      $('#new_message')[0].reset();
      
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
  })
  var reloadMessages = function() {
    var last_message_id = $('.message:last').data('id');
    var href = 'api/messages#index{format: "json"}'
    $.ajax({
      url: href,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message) {
        insertHTML = buildMessageHTML(message);
        $('.messages').append(insertHTML)
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
      })
      .fail(function() {
        alert('error');
      });
  };
  setInterval(reloadMessages, 5000);
});