var todo=function($){function e(e,t,n){return void 0===t&&(t=""),data={value:e,id:t},"closed"===n&&(data.checked="checked",data.disabled="disabled"),Mustache.render(y,data)}function t(){if(""===$("#list").html().trim())return void n("Cheatin' Huh?");if(confirm("Are you sure you want to delete all your To-Do Items?!?!"))return $.each($(".item"),function(e,t){s(t,!1)}),n("All Items Removed"),!0}function n(e){v.append('<p class="success">'+e+"</p>");var t;window.setTimeout(function(){t=v.find(".success").last(),t.addClass("in"),window.setTimeout(function(){t.removeClass("in"),window.setTimeout(function(){t.remove()},500)},2e3)},50)}function i(){$('.item input[type="text"]').off(),$('.item input[type="text"]').on("keyup",{"this":this},function(){clearInterval(x);var e=this;x=setTimeout(function(){var t=$(e).attr("data-id"),i=_.escape($(e).val());$.ajax({type:"POST",url:"/index.php",data:{_wpnonce:f,todo_item_edit:t,value:i,author:p},success:function(e){"success"===e&&n("Item Successfully Synced!")}})},500)})}function a(t){t.preventDefault();var a=_.escape(l.val().substring(0,140));d.prepend(e(a)),l.val("");var s=$('.item input[type="text"]').first();$.ajax({type:"POST",url:"/index.php",data:{author:p,todo_item_add:$(s).val(),_wpnonce:f},success:function(e){e=JSON.parse(e),$(s).attr("id","todo-id-"+e.id),$(s).attr("data-id",e.id),n("Item Successfully Added!")}}),i()}function s(e,t){var i;i="item"===$(this).attr("class")?$(this):"item"===$(e).attr("class")?$(e):$(this).parent("li");var a=i.children('input[type="text"]').attr("data-id");console.log(a),$.ajax({type:"POST",url:"/index.php",data:{_wpnonce:f,todo_item_delete:a,author:p},success:function(e){return"success"===e&&(i.slideUp(300),window.setTimeout(function(){i.remove()},1e3)),!1!==t?(n("Item Successfully Removed!"),!0):void 0}})}function o(){var e=$(this).siblings('input[type="text"]'),t=$(this).siblings('input[type="text"]').attr("data-id");$(e).prop("disabled")?($(e).prop("disabled",!1),$.ajax({type:"POST",url:"/index.php",data:{_wpnonce:f,todo_item_finished:t,author:p,finished:!1},success:function(e){n("Item Successfully Updated!")},error:function(e){alert("Something went wrong :( Try again later")}})):($(e).prop("disabled",!0),$.ajax({type:"POST",url:"/index.php",data:{_wpnonce:f,todo_item_finished:t,author:p,finished:!0},success:function(e){n("Item Successfully Updated!")},error:function(e){alert("Something went wrong :( Try again later")}}))}function r(){var e=$(".username").html().trim();$(".username").html('<form id="username-form"><input type="text" value="'+e+'" id="edit-username" /></form>'),$("#nickname-save").on("click",u),$("#username-form").on("submit",function(e){e.preventDefault(),u()}),$(".edit-profile").addClass("editing"),$("#edit-username").focus()}function u(){var e=_.escape($("#edit-username").val().trim());$(".username").html(e),w.html("Edit Profile"),$.ajax({type:"POST",url:"/index.php",data:{_wpnonce:f,updateUsername:e,author:p},success:function(e){"success"===e&&(n("Username Updated!"),$(".edit-profile").removeClass("editing"))}})}var d=$("#list"),c=$("#add-item-form"),l=$("#add-item-input"),p=$("#current-user").val(),m=$("#clear-all"),f=$("#_wpnonce").val(),h=$("#on-load"),v=$("#messages"),y=$("#list-item-template").html(),w=$("#nickname-edit"),g=$("#open-invite"),x;$.ajax("/wp-json/posts?type=todos&filter[author]="+p,{success:function(t){$.each(t,function(t,n){$(d).append(e(n.title,n.ID,n.comment_status))}),window.setTimeout(function(){$(h).addClass("loaded"),window.setTimeout(function(){h.remove()},500)},200),i()},error:function(){$(h).children("span").html("Oops! Something went wrong. :( <br> Try again later.")}});var S=window.setInterval(function(){void 0===x&&$.ajax("/wp-json/posts?type=todos&filter[author]="+p,{success:function(t){0===t.length&&$(".item").length>0&&location.reload(),t.reverse(),$.each(t,function(t,i){1!==$("input[data-id="+i.ID+"]").length&&($(d).prepend(e(i.title,i.ID,i.comment_status)),n("New Item Synced Successfully!"))}),void 0===x&&i()}})},5e3);return c.on("submit",a),d.delegate(".remove","click",s),d.delegate(".item-finished","click",o),m.on("click",t),w.on("click",r),w.html("Edit Profile"),g.magnificPopup({mainClass:"mfp-invite",items:{src:".popup",type:"inline"}}),{currentUser:p,flashSuccess:n}}(jQuery);