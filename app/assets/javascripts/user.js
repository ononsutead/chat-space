$(function() {

//appendAdduserのhtmlの内容を#user-search-resultの子要素の最後に追加する
var search_list = $("#user-search-result");


function appendAddUser(user) {
   var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
    }
//appendGroupuserのhtmlの内容を#chat-group-usersの子要素の最後に追加する
var group_user_list = $("#chat-group-users");

   function appendGroupUser(user_id, user_name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}' class='group__id'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    group_user_list.append(html);
  }
//appendNouserのhtmlの内容を#user-search-resultの子要素の最後に追加する "一致するユーザーがいません"
 function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">  
                  <p class="chat-group-user__name">${user}</p>  
                </div>` 
    search_list.append(html);
  }
//チャットメンバーの追加横のフォーム内でキーが押されたら以下の内容が発火する
   $(function() {
    $("#user-search-field").on("keyup", function() {
//フォーム内で打ち込まれた内容をinputする
      var input = $("#user-search-field").val();
      var users_ids = [];
      var i = 0;
      var users_length = $('.chat-group-user').length;
//グループに所属メンバーのIDをくりかえす      
      $(function() {
 
        // for文で初期値と繰り返しの条件式を指定
        for ( i ; i < users_length; i++) {
          var group_id = $('.group__id').eq(i).val();
          users_ids.push(group_id)
          console.log(users_ids)
       
        }
       
      });  
//usersコントローラのindexへ情報を送信する カレントユーザーとグループ内に所属するIDを除いて、入力した文字に該当するユーザを全て表示する
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input, users__ids: users_ids},
        dataType: 'json'
        
      })
      
      .done(function(users) {
        
//#user-search-resultの各要素の子要素を全て削除し、空にする
        $("#user-search-result").empty();
//文字が0でないならヒットする分だけappendAdduserを出力
        if (users.length !== 0) {
          users.forEach(function(user){
            appendAddUser(user);
          });
        }
//文字が0ならapendNOuserを出力
        else {
          appendNoUser("一致するユーザーがいません");
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    });

//function appendAddUser,追加ボタンが押されたら、appendAddUserのdate-user-id,#{usr.id}とate-user-name,#{usr.name}の値を取得
    $(document).on('click', '.chat-group-user__btn--add', function(){
      var user_id = $(this).attr('data-user-id');
      var user_name = $(this).attr('data-user-name');
      appendGroupUser(user_id, user_name);
      $(this).parent().remove();
    
    });
  
    $(document).on('click', '.user-search-remove', function()
    {
      $(this).parent().remove();
      });

  });
});