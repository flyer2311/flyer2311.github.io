/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-03-30 23:32:17
 * @version $Id$
 */
$(function() {

       //导航轮播
    (function() {
        var $ca_in=$('#carousel-inner');
        var $item=$ca_in.children();
        $ca_in.append($item.eq(0).clone());
        var num=0;
        aa();
        function aa() {

            num++;
            $ca_in.animate({top:-40*num},1000,'linear',function() {
                if(num%3==0){
                    num=0;
                    $ca_in.css({top:0})
                }
                setTimeout(aa, 2000);
            });

        }
    })();
    //navbar-func背景更换
    (function() {
        var $navbar_func=$('.navbar-func').eq(0);
        var $navbar_tip=$('.navbar-tip').eq(0);
        $(window).scroll(function() {
            if($navbar_tip.css('display')!='none'){
                if($(this).scrollTop()>=100){
                    $navbar_func.css({backgroundColor:'white'});
                }else{
                    $navbar_func.css({backgroundColor:'transparent'});
                }
            }
        });
    })();
    //巨幕背景更换-试用视频
    (function() {
        var clickonoff=false;
        //巨幕背景更换
        (function() {
            var num=0;
            var $length=$('.backgroundvideo video').length;
            var arr=['https://vplscdn.videojj.com/top/vote_bg_video.mp4',
                    'https://vplscdn.videojj.com/top/magic_bg_video.mp4',
                    'https://vplscdn.videojj.com/top/shelves_video.mp4',
                    'https://vplscdn.videojj.com/top/trading_video.mp4'];
            var $video=$('.backgroundvideo video').eq(0);
            $video.trigger('play');
            var $video=$('.backgroundvideo video').eq(num);
            var onoff=true;//控制页面进度
            var progress;
            var $videonext;
            var btnoff_95=false;//按钮开关
            var btnoff_comp=false;//按钮开关
            var videonum=0;//用于点击错开video的方法
            var a=0;//清空读条的变量;
            var $smartul=$('.smart ul').eq(0);
            var $hs_li=$('.hs-flow li');
            for(let i=0,len=$hs_li.length;i<len;i++){
                $hs_li.eq(i).click(function() {
                    btnoff_95=true;
                    num=i;
                    $smartul.animate({top:-73-60*(num%arr.length)},1000,function() {
                        if((num%arr.length)==3){
                            $smartul.css({top:-12});
                        }
                    });
                    for(let j=0,leng=$hs_li.length;j<leng;j++){
                        $('i.hsf').eq(j).css({width:0});
                    }
                });
            }
            (function() {
                //点击隐藏视频暂停重置背景视频和进度条
                if(clickonoff){
                    $video.prop('currentTime','0');
                    $video.trigger('pause');
                }else{
                    //保证重置背景时播放视频
                    progress=$video.prop('currentTime')/$video.prop('duration');
                    if(progress!=1){
                        $video.trigger('play');
                    }
                    //联动hs-flow进度条
                    var pro_clone=progress>=0.95?progress-0.95:progress;
                    var $i_hsf=$('i.hsf').eq(num%arr.length);
                    if(progress>.95&&onoff||btnoff_95){
                        onoff=false;
                        num++;
                        if(btnoff_95){
                            btnoff_95=!btnoff_95;
                            btnoff_comp=true;
                            num-=1;
                        }
                        videonum++;
                        $videonext=$('.backgroundvideo video').eq(videonum%$length);
                        $videonext.animate({opacity:1},500);
                        $videonext.prop('src',arr[num%arr.length]);
                        $videonext.trigger('play');
                        $video.animate({opacity:0},500);
                        //更改.smart的图片
                        $smartul.animate({top:-72-60*(num%arr.length)},1000,function() {
                            if((num%arr.length)==3){
                                $smartul.css({top:-12});
                            }
                        });
                        //hs-flow
                        $i_hsf.css({width:0});
                    }
                    if(progress==1||btnoff_comp){
                        onoff=true;
                        btnoff_comp=false;
                        $video.trigger('pause');
                        $video.prop('src','');
                        $video=$videonext;
                    }
                    $i_hsf=$('i.hsf').eq(num%arr.length);
                    $i_hsf.css({width:63*pro_clone/0.95});
                }
                requestAnimationFrame(arguments.callee);
            })();
        })();
        //试用视频
        (function() {
            var $videofortry=$('#videofortry');
            var $blueball=$('.blueball').eq(0);
            var $btn=$('button').eq(1);
            var $newvideo=$('.newvideo').eq(0);
            var $video=$('.video').eq(0);
            var $asideli=$('aside li')
            var $arr=['https://vplscdn.videojj.com/video/zongyi.mp4',
                'http://vpls.cdn.videojj.com/scene/movie/buy/yingyong_sp2_720p.mp4',
                'http://vpls.cdn.videojj.com/scene/movie/beauty/yingyongmeiz1110_720p.mp4','']

            //改变navbar的背景色
            var $navbar_func=$('.navbar-func').eq(0);
            $blueball.css({top:$btn.offset().top,left:$btn.offset().left});
            $videofortry.click(function() {
                clickonoff=true;
                $('body').eq(0).css({overflowY:'hidden'});
                $videofortry.animate({width:40,opacity:0},500,function() {
                    $blueball.css({display:'block'});
                    $blueball.animate({top:'50%',left:'50%'},500,function(){
                        if($blueball.hasClass('scale-1')){
                            $blueball.removeClass('scale-1');
                        }
                        $blueball.addClass('scale-60').addClass('transition').animate({opacity:1},500,function(){
                            $navbar_func.css({backgroundColor:'#232753'});
                            $asideli.eq(0).css({backgroundColor:'rgba(0,0,0,1)'});
                            $newvideo.css({display:'block'});
                            $('video','.newvideo').prop('src',$arr[0]).trigger('play');
                        });
                    });
                });
            });
            //input播放按钮
            var $icon_play=$('div svg','.resource_search').eq(0);
            var $input=$('input[type="text"]','.resource_search').eq(0);
            $icon_play.click(function(){
                $('video','.newvideo').prop('src',$input.prop('value'));
                $('video','.newvideo').trigger('play');
            })
            //aside li 点击事件
            var $asideul=$('aside ul').eq(0);
            $asideul.click(function(e){
                var ev=e||window.event;
                // console.log(ev.target.parentNode.nodeName==LI);
                if(ev.target.parentNode.nodeName=='LI'){
                    for(var i=0,len=$asideli.length;i<len;i++){
                        $asideli.eq(i).css({backgroundColor:'rgba(0,0,0,.5)'});
                    }
                    ev.target.parentNode.style.backgroundColor='black';
                    $('video','.newvideo').prop('src',$arr[$(ev.target.parentNode).index()]).trigger('play');
                    $input.prop('value',$arr[$(ev.target.parentNode).index()]);
                }
            });

            //搜索框
            var $times=$('.resource_search span').eq(0);
            $times.click(function() {
                $input.prop('value','');
                $(this).css({display:'none'});
            });
            $input.change(function() {
                $times.css({display:'inline-block'});
            });
            //整个视频的点击退出按钮
            var $turn_off=$('.turnoff').eq(0);
            $turn_off.click(function(){
                clickonoff=false;
                $('body').eq(0).css({overflowY:'visible'})
                $('video','.newvideo').trigger('pause');
                $newvideo.css({display:'none'});
                $('video','.newvideo').prop('src','');
                $navbar_func.css({backgroundColor:'transparent'});
                $blueball.removeClass('scale-60').addClass('scale-1');
                $blueball.animate({left:$btn.offset().left,top:$btn.offset().top},500,function(){
                    $videofortry.animate({width:144,opacity:1},500,function(){
                        $blueball.css({display:'none'});
                        $blueball.removeClass('transition');
                    });
                });
            })
        })();
    })();
    //canvas-wave
    (function() {
        var wave_bg=document.getElementById('wave-bg');
        var canvas=document.getElementsByTagName('canvas')[0];
        var ctx=canvas.getContext('2d');
        var ww=canvas.width=wave_bg.offsetWidth;
        var hh=canvas.height=wave_bg.offsetHeight;
        var wave_hh=hh/2;
        var float_hh=wave_hh/3;
        var num=0;//设置角度
        $(window).resize(function() {
            ww=canvas.width=wave_bg.offsetWidth;
            hh=canvas.height=wave_bg.offsetHeight;
            wave_hh=hh/2;
            float_hh=wave_hh/3;
        });

        (function() {
            ctx.clearRect(0,0,ww,hh);
            for(var i=0;i<2;i++){
                num+=.5;
                var degree=num*Math.PI/180+i*20
                var change_sin_hh=float_hh*Math.sin(degree);
                var change_cos_hh=float_hh*Math.cos(degree);

                ctx.beginPath();
                ctx.moveTo(0,wave_hh+change_sin_hh);
                ctx.bezierCurveTo(ww/2,wave_hh+change_sin_hh-float_hh,ww/2,wave_hh+change_cos_hh-float_hh,ww,wave_hh+change_cos_hh);
                ctx.strokeStyle='#efefef';
                ctx.stroke();
                ctx.closePath();
            }
            requestAnimationFrame(arguments.callee);
        })()
    })();
    //worth
    (function() {
        //worth点击
        var $worth=$('#worth li');
        var $ball_bg=$('#ball-bg img').eq(0);
        var num=0;//暂存器
        for(let i=0,len=$worth.length;i<len;i++){
            $worth.eq(i).click(function() {
                $worth.eq(num).attr('id','');
                $ball_bg.prop('src','image/bubble'+(i+1)+'.png');
                $worth.eq(i).attr('id','worth-show');
                num=i;

            });
        }
        //cross旋转
        var $wave=$('#wave');
        var $wave_a=$('#wave a').eq(0);
        var $wave_span=$('#wave span').eq(0);
        var $onoff=false;
        $wave_a.click(function() {
            if($onoff){
                $wave_span.addClass('rotate-45');
                $provide_worth.css({height:700});
                $onoff=false;
            }else{
                $wave_span.removeClass('rotate-45');
                $provide_worth.css({height:0});
                $onoff=true;
            }
        });
        $wave_span.click(function() {
            if($onoff){
                $wave_span.addClass('rotate-45');
                $provide_worth.css({height:700});
                $onoff=false;
            }else{
                $wave_span.removeClass('rotate-45');
                $provide_worth.css({height:0});
                $onoff=true;
            }
        });
        //播放 provide-worth
        var $provide_worth=$('#provide-worth');
        var $video=$('#provide-worth video').eq(0);
        var $img=$('#provide-worth img').eq(0).parent();
        var videoonoff=false;
        $img.click(function() {
            $video.trigger('play');
            $(this).css({display:'none'});
        });
        $video.click(function() {
            $(this).trigger('pause');
            $img.css({display:'block'});
        });
    })();
    //case-solution
    (function() {
        var $p=$('#solution p');
        var $span=$('#solution ul span');
        var $li=$('#solution li');
        var num=0;//暂存器

        //初始化第一位
        $span.eq(0).css({fontSize:16,color:'#4a4a4a'});
        $span.eq(0).prop('stateonoff',true);
        $p.eq(0).css({display:'block',height:42,marginTop:10});
        $li.eq(0).prop('id','show-underline');
        for(let i=0,len=$span.length;i<len;i++){
            $span.eq(i).prop('stateonoff',false);//状态开关
            $span.eq(i).click(function() {
                if($(this).prop('stateonoff')){return;}
                //num
                $span.eq(num).css({fontSize:14,color:'#9b9b9b'});
                $span.eq(num).prop('stateonoff',false);
                $p.eq(num).css({display:'none',height:0,marginTop:0})
                $li.eq(num).prop('id','');
                //i
                $(this).css({fontSize:16,color:'#4a4a4a'});
                $p.eq(i).css({display:'block',height:42,marginTop:10});
                num=i;
                $(this).prop('stateonoff',true);
                //show-underline
                $li.eq(i).prop('id','show-underline');

            });
        }
    })();
    //case-application-system
    (function() {
        var $p=$('#application-system p');
        var $span=$('#application-system ul span');
        var $li=$('#application-system li');
        var num=0;//暂存器

        //初始化第一位
        $span.eq(0).css({fontSize:16,color:'#4a4a4a'});
        $span.eq(0).prop('stateonoff',true);
        $p.eq(0).css({display:'block',height:42,marginTop:10});
        $li.eq(0).prop('id','show-underline');
        for(let i=0,len=$span.length;i<len;i++){
            $span.eq(i).prop('stateonoff',false);//状态开关
            $span.eq(i).click(function() {
                if($(this).prop('stateonoff')){return;}
                //num
                $span.eq(num).css({fontSize:14,color:'#9b9b9b'});
                $span.eq(num).prop('stateonoff',false);
                $p.eq(num).css({display:'none',height:0,marginTop:0})
                $li.eq(num).prop('id','');
                //i
                $(this).css({fontSize:16,color:'#4a4a4a'});
                if(i==1){
                    $p.eq(i).css({display:'block',height:63,marginTop:10})
                }else{
                    $p.eq(i).css({display:'block',height:42,marginTop:10});
                }

                num=i;
                $(this).prop('stateonoff',true);
                //show-underline
                $li.eq(i).prop('id','show-underline');

            });
        }
    })();
    //case-cultural-media
    (function() {
        var $p=$('#cultural-media p');
        var $span=$('#cultural-media ul span');
        var $li=$('#cultural-media li');
        var num=0;//暂存器

        //初始化第一位
        $span.eq(0).css({fontSize:16,color:'#4a4a4a'});
        $span.eq(0).prop('stateonoff',true);
        $p.eq(0).css({display:'block',height:42,marginTop:10});
        $li.eq(0).prop('id','show-underline');
        for(let i=0,len=$span.length;i<len;i++){
            $span.eq(i).prop('stateonoff',false);//状态开关
            $span.eq(i).click(function() {
                if($(this).prop('stateonoff')){return;}
                //num
                $span.eq(num).css({fontSize:14,color:'#9b9b9b'});
                $span.eq(num).prop('stateonoff',false);
                $p.eq(num).css({display:'none',height:0,marginTop:0})
                $li.eq(num).prop('id','');
                //i
                $(this).css({fontSize:16,color:'#4a4a4a'});
                $p.eq(i).css({display:'block',height:42,marginTop:10});
                num=i;
                $(this).prop('stateonoff',true);
                //show-underline
                $li.eq(i).prop('id','show-underline');

            });
        }
    })();
    //data-revenue
    (function() {
        var onoff=true;
        var $span=$('.data-revenue .row span')
        var $customer=$('.data-revenue h3 span').eq(0);
        var value;
        $(window).scroll(function() {
            if($(this).scrollTop()>=3600&&onoff){
                onoff=false;
                var arr=[106779677,340,3.6,16622]
                var time=new Date();
                var t=6;//设定3秒完成该变化
                var progress;//进度
                (function() {
                    var time_new=new Date();
                    var time_diff=time_new-time;
                    time_diff=time_diff>t*1000?t*1000:time_diff;
                    if(time_diff<=1000*t/3){
                        progress=time_diff/(t*1000)*2.7;
                    }else if(time_diff>1000*t/3&&time_diff<=2000*t/3){
                        progress=0.9+(time_diff-1000*t/3)/(t*1000)*0.27;
                    }else{
                        progress=0.99+(time_diff-2000*t/3)/(t*1000)*0.03;
                    }
                    for(let i=0,len=$span.length;i<len;i++){
                        if(i==len-1){
                            value=arr[i]*progress;
                            value=value.toFixed(1);
                        }else{
                           value=Math.floor(arr[i]*progress);
                        }
                        if(i==0){
                            value+='';
                            while(/\d{4}/.test(value)){
                                value=value.replace(/(\d+)(\d{3})/,'$1,$2');
                            }
                        }
                        $span.eq(i).text(value);
                    }
                    value=Math.floor(arr[3]*progress);
                    value+='';
                    while(/\d{4}/.test(value)){
                        value=value.replace(/(\d+)(\d{3})/,'$1,$2');
                    }
                    $customer.text(value);
                    if(time_diff<t*1000){
                        requestAnimationFrame(arguments.callee);
                    }
                })()
            }
        })
    })();
    //helper
    (function() {
        $img=$('.helper img').eq(0);
        (function() {
            $img.animate({left:-1166},20000,function() {
                $img.animate({left:-59},20000);
            });
            setTimeout(arguments.callee, 40000);
        })();
    })();
    //their-story
    (function() {
        var $read_more=$('.read-more').eq(0);
        $read_more.mousedown(function() {
            $(this).addClass('mouseup-a');
        });
        $read_more.mouseup(function() {
            $(this).removeClass('mouseup-a');
        });
        var $li=$('.ts_content li');
        var $span=$('.submenu span');
        var $img=$('.pic img');
        var num=0;
        var timer;


        for(let i=0,len=$span.length;i<len;i++){
            $span.eq(i).click(function() {
                clearTimeout(timer);
                if(num==i){return;}
                $span.eq(num).removeClass('active');
                $img.eq(num).stop(true,true).animate({opacity:0},500);
                $(this).addClass('active');
                $li.eq(num).stop(true,true).animate({top:-200},500);
                $li.eq(i).stop(true,true).animate({top:0},500,function() {
                });
                $img.eq(i).stop(true,true).animate({opacity:1},500);
                num=i;
                timer=setTimeout(aa,3000);
            });
        }
        aa();
        function aa() {
            clearTimeout(timer);
            $span.eq(num).removeClass('active');
            $img.eq(num).stop(true,true).animate({opacity:0},1000);
            $li.eq(num).stop(true,true).animate({top:200},1000,function() {
                $(this).css({top:-200});
            });
            num++;
            num%=4;
            $span.eq(num).addClass('active');
            $img.eq(num).stop(true,true).animate({opacity:1},1000);
            $li.eq(num).stop(true,true).animate({top:0},1000);
            timer=setTimeout(aa,3000);
        };
    })();
    //canvas-loop
    (function() {
        var find_create=document.querySelector('.find-create');
        var canvas=document.getElementById('loop');
        var ctx=canvas.getContext('2d');
        var ww=canvas.width=find_create.offsetWidth;
        var hh=canvas.height=find_create.offsetHeight;
        var num=0;
        var edge=Math.sqrt(Math.pow(ww,2)+Math.pow(hh,2));
        var count=Math.ceil(edge/100);
        var opacity;
        (function() {
            ctx.clearRect(0,0,ww,hh);
            num++;
            var circle=Math.floor(num/100);
            if(circle==count){
                num-=100;
                circle-=1;
            }
            for(let i=0;i<=circle;i++){
                ctx.beginPath();
                ctx.arc(ww/2,hh/2,num-i*100,0,Math.PI*2);
                opacity=1-(num-i*100)/num;
                ctx.lineWidth=(num-i*100)/num*10;
                ctx.strokeStyle='rgba(239,239,239,'+opacity+')';
                ctx.stroke();
                ctx.closePath();
            }

            requestAnimationFrame(arguments.callee);
        })();
    })();
    //发现创造 video
    (function() {
        var $video=$('#contact video').eq(0);
        $(window).scroll(function() {
            if($(this).scrollTop()>=5300){
                $video.trigger('play');
            }
        });
    })();


})
