$(function(){
  function buildHTML1(message){
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                     
                    </p>  
                  </div>
                </div>`
    return html;
  }
  function buildHTML2(message){
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}<br>
                      <img src ="${message.image.url}">
                    </p>  
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

      if( message.image.url == null){
        var html = buildHTML1(message);
      
        $('.messages').append(html)
        $('#message_content').val('')
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      } else{
        var html = buildHTML2(message);
      
        $('.messages').append(html)
        $('#message_content').val('')
        $('#message_image').val(null)
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});

      }
    
        
  
    })

    .fail(function(){
      alert("エラー")
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
    
  })
});