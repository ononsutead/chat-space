$(function(){
  function buildHTML(message){
    image = (message.image.url) ? ` <img src ="${message.image.url}">` : ""; //三項演算子を使ってmessage.imageにtrueならHTML要素、faiseなら空の値を代入。
    var html = `<div class="message" data-message-id="${message.id}"> 
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                        ${message.content}
                    </p>  
                    ${image}
                  </div>
                </div>`
    return html;
  }
  
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      
        var html = buildHTML(message);
        $('.messages').append(html);
        $('.new_message')[1].reset();
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })

    .fail(function(){
      alert("エラー")
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);
     })
  });
  
    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        last_message_id = $('.message:last').data("message-id");
        $.ajax({
          url: "api/messages",
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = '';
          messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML); 
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
          })
        })
        .fail(function() {
          alert('更新に失敗しました');
        });  
    };
    }
    setInterval(reloadMessages, 3000);
});
