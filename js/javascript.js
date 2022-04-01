
    $(document).ready(function() {
        $("#mob-next").click(function() {
            $('#choose_2').css('display', 'block');
            $('#choose_1').css('display', 'none');
            $('#mob-back').css('display', 'block');
            $('#mob-next').css('display', 'none');
            $('#game-btn').css('display', 'block');
        });
    });
$(document).ready(function() {
    $("#mob-back").click(function() {
        $('#choose_2').css('display', 'none');
        $('#choose_1').css('display', 'block');
        $('#mob-back').css('display', 'none');
        $('#mob-next').css('display', 'block');
        $('#game-btn').css('display', 'none');
    });
});


var blocks = ["паника", "тревога", "грусть", "злость", "вина", "обида", "агрессия"];
var i = 0;
var blockhello = $('#blockhello');
var blockgame = document.getElementsByClassName("blockgame");

$(document).ready(function() {
    $("#next-btn-1").click(function() {
        {
            i = i + 1;
            if (i >= blocks.length) i = 0;
            blockhello.html(blocks[i]);
            $('.blockgame').each(function() {
                $(this).html(blocks[i]);
            });
        }
    });
});


$(document).ready(function() {
    $("#prev-btn-1").click(function() {
        {
            i = i - 1;
            if (i < 0) i = blocks.length - 1;
            blockhello.html(blocks[i]);
            $('.blockgame').each(function() {
                $(this).html(blocks[i]);
            });
        }
    });
});

var faces = ["url('images/face-1.png')", "url('images/face-2.png')", "url('images/face-3.png')", "url('images/face-4.png')", "url('images/face-5.png')", "url('images/face-6.png')", "url('images/face-7.png')", "url('images/face-8.png')", "url('images/face-9.png')", "url('images/face-10.png')", "url('images/face-11.png')", "url('images/face-12.png')", ];
var k = 0;
var face = document.getElementById("char");
var facegame = document.getElementById("bird");
var putin_vor = false;
button();
$(document).ready(function() {
    $("#next-btn-2").click(function() {
        {
            putin_vor = false;
            button();
            k = k + 1;
            putin();
            $("#game-btn").css("pointer-events", "auto");
            if (k >= faces.length) k = 0;
            face.style.backgroundImage = faces[k];
            facegame.style.backgroundImage = faces[k];


        }
    });
});
$(document).ready(function() {
    $("#prev-btn-2").click(function() {
        {
            putin_vor = false;
            button();
            k = k - 1;
            putin();
            $("#game-btn").css("pointer-events", "auto");
            if (k < 0) k = faces.length - 1;
            face.style.backgroundImage = faces[k];
            facegame.style.backgroundImage = faces[k];


        }
    });
});

function putin() {
    if (k == 5 || k == 6 || k == 7) {
        putin_vor = true;
    } else putin_vor = false;
    return putin_vor;
}

function button() {
    $("#game-btn").click(function() {
        {
            if (putin_vor == true) {
                $(".putin_vor").fadeIn(500);
                $("#game-btn").css("pointer-events", "none");
                setTimeout(function() {
                    $(".putin_vor").fadeOut();

                }, 4000);
            } else if (putin_vor == false) {
                $("#game-btn").css("pointer-events", "auto");
                $(".hello").css("display", "none");
                $(".main_game").css("display", "block");
            }
        }
    });
}
$(document).ready(function() {
    $("#back-btn").click(function() {
        {
            $(".hello").css("display", "flex");
            $(".main_game").css("display", "none");
            location.reload();
        }
    });
});
$(document).ready(function() {
    $("#fin-btn").click(function() {

        location.reload();
    });
});




var score = $('#score');
var result = 100;
var level = $('#level');
var lvl = 1;

$("#game-btn").click(function() {

    var container = $('.wrapper');
    var bird = $('#bird');
    var pole = $('.pole');
    var pole2 = $('.pole2');
    var pole_1 = $('#pole-1');
    var pole_2 = $('#pole-2');
    var pole_3 = $('#pole-3');
    var pole_4 = $('#pole-4');

    var bg = $('.bg');



    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole.css('height'));
    var pole2_initial_position = parseInt(pole2.css('right'));
    var bg_initial_position = parseInt(bg.css('margin-left'));
    var pole2_initial_height = parseInt(pole2.css('height'));
    var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.height());


    var go_up = false;
    var game_over = false;
    var score_updated = false;
    var speed = 20;

    if (window.matchMedia('(max-width: 1366px)').matches) {
        speed = 10;
    }

    $(document).ready(function() {
        $('#help').fadeIn(1000);
        $('#help').delay(600).fadeOut(1000);
        if (putin_vor == false) {

            game();
            sound_bg();
        }

    });

    function game() {
        var the_game = setInterval(function() {


            if (parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) > container_height - bird_height || collision_top(bird, pole_1) || collision_bottom(bird, pole_2) || collision_top(bird, pole_3) || collision_bottom(bird, pole_4)) {

                clearInterval(the_game);
                game_over = true;
                sound_bg_stop();
                sound_error();

                setTimeout(function() {
                    $(".main_game").css("display", "none");
                    $(".level_end").css("display", "block");
                }, 1000);



            } else {



                var pole_current_position = parseInt(pole.css('right'));
                var pole2_current_position = parseInt(pole2.css('right'));
                var bg_current_position = parseInt(bg.css('margin-left'));

                console.log(pole2_current_position);
                console.log(bird_left);
                console.log(container_width);
                if (pole_current_position === container_width - bird_left || pole2_current_position === container_width - bird_left) {


                    result = result - 1;
                    sound_up();
                    score.text(result);
                    $("#result").text(result);

                    if (result == 0) {
                        clearInterval(the_game);
                        game_over = true;
                        sound_bg_stop();
                        sound_error();

                        $('.resourse_end').fadeIn(2000);
                        setTimeout(function() {
                            location.reload();
                        }, 4000);
                    }


                }


                if (pole2_current_position - parseInt(pole_1.css('width')) > container_width) {
                    var new_height = parseInt(Math.random() * 200);


                    pole_1.css('height', pole_initial_height + new_height);
                    pole_2.css('height', pole_initial_height - new_height);



                    pole_3.css('height', pole2_initial_height - new_height);
                    pole_4.css('height', pole2_initial_height + new_height);




                    pole_current_position = pole_initial_position;
                    pole2_current_position = pole2_initial_position;
                }



                pole.css('right', pole_current_position + speed);
                pole2.css('right', pole2_current_position + speed);


                // console.log(bg.css('margin-left'));
                bg.css('margin-left', bg_current_position - speed);
                if ((0 - bg_current_position) > 0.5 * parseInt(bg.css('width'))) {
                    bg.css('margin-left', '-120px');
                }

                if (go_up === false) {
                    go_down();
                }
            }
        }, 40);

    }
    var audio = new Audio();

    function sound_bg() {
        audio.src = 'audio/bg_sound.m4a';
        audio.autoplay = true;
        audio.loop = true;
        audio.muted = false;
    }

    function sound_bg_stop() {
        audio.muted = true;
    }

    function sound_up() {
        var audio = new Audio();
        audio.src = 'audio/up.m4a';
        audio.autoplay = true;
    }

    function sound_error() {
        var audio = new Audio();
        audio.src = 'audio/error.m4a';
        audio.autoplay = true;
    }


    $(document).on('keydown', function(e) {
        var key = e.keyCode;
        if (key === 32 && go_up === false && game_over === false) {
            go_up = setInterval(up, 50);
        }
    });
    $(document).on("tap", function(e) {
        var key = e.keyCode;
        if (go_up === false && game_over === false) {
            go_up = setInterval(up, 50);
        }
    });
    $(document).on('keyup', function(e) {
        var key = e.keyCode;
        if (key === 32) {
            clearInterval(go_up);
            go_up = false;
        }
    });


    function go_down() {
        bird.css('top', parseInt(bird.css('top')) + 5);
    }

    function up() {
        bird.css('top', parseInt(bird.css('top')) - 10);

    }




    function collision_top($div1, $div2) {
        var bird_top = $div1.position().top;
        var pole_top = $div2.position().top + $div2.outerHeight(true);
        var bird_side_1 = $div1.position().left + $div1.outerWidth(true);
        var pole_side_1 = $div2.position().left;
        var bird_side_2 = $div1.position().left;
        var pole_side_2 = $div2.position().left + $div2.width();

        if (bird_side_1 >= pole_side_1 && bird_side_2 < pole_side_2 && bird_top <= pole_top) return true;
        else return false;
    }

    function collision_bottom($div1, $div2) {
        var bird_bottom = $div1.position().top + $div1.height();
        var pole_bottom = $div2.position().top;
        var bird_side_1 = $div1.position().left + $div1.outerWidth(true);
        var pole_side_1 = $div2.position().left;
        var bird_side_2 = $div1.position().left;
        var pole_side_2 = $div2.position().left + $div2.width();

        if (bird_side_1 >= pole_side_1 && bird_side_2 < pole_side_2 && bird_bottom >= pole_bottom) return true;
        else return false;
    }


    $("#lvl-btn").click(function() {
        bird.css('top', '200px');
        pole.css('right', '0px');
        pole2.css('right', '-100vw');


        level.text(parseInt(level.text()) + 1);


        $(".main_game").css("display", "block");
        $(".level_end").css("display", "none");



        console.log(parseInt(level.text));
        var level_name = $('#level_name');

        $(document).ready(function() {
            if (parseInt(level.text()) == 2) {
                level_name.text("рационализации");
                lvl_2();
                $('.bg-img').each(function() {
                    $(this).attr("src", "images/bg-2.png");
                });
            }
            if (parseInt(level.text()) == 3) {
                level_name.text("вытесенения");
                lvl_3();
                $("#what_word").text("рационализация");
                $("#what_text").text("рационализация");
                $("#text_text").text("Рационализа́ция — механизм психологической защиты, при котором в мышлении используется только та часть воспринимаемой информации, и делаются только те выводы, благодаря которым собственное поведение предстаёт как хорошо контролируемое и не противоречащее объективным обстоятельствам. ");
                $('.bg-img').each(function() {
                    $(this).attr("src", "images/bg-3.png");
                });
            }
            if (parseInt(level.text()) == 4) {
                level_name.text("сублимации");
                lvl_4();
                $("#what_word").text("вытеснение");
                $("#what_text").text("вытеснение");
                $("#text_text").text("Как защитный механизм, вытеснение направлено на минимизацию отрицательных переживаний за счёт удаления из сознания того, что эти переживания вызывает. Удалённые из сознания, эти элементы, однако, не пропадают из памяти. ");
                $('.bg-img').each(function() {
                    $(this).attr("src", "images/bg-4.png");
                });
            }
            if (parseInt(level.text()) == 5) {
                level_name.text("проекции");
                lvl_5();
                $("#what_word").text("сублимация");
                $("#what_text").text("сублимация");
                $("#text_text").text(" Сублимация – это тип защитного механизма психики, бессознательная психологическая защита, уменьшающая беспокойство, вызванное неприемлемыми побуждениями или нежелательными стимулами, перевод негативных и неодобряемых обществом мыслей и чувств в полезные дела.  ");
                $('.bg-img').each(function() {
                    $(this).attr("src", "images/bg-5.png");
                });
            }
            if (parseInt(level.text()) == 6) {
                lvl_6();
                $(".game_container").css("display", "none");
                $("#what_word").text("проекция");
                $("#what_text").text("проекция");
                $("#text_text").text("Проекция — это общий психологический механизм, с помощью которого субъективные содержания переносятся на объект. Человек приписывает кому-то или чему-то собственные мысли, чувства, мотивы, черты характера и пр., полагая, что он воспринял что-то приходящее извне, а не изнутри самого себя. ");
                $('.bg-img').each(function() {
                    $(this).attr("src", "images/bg-6.png");
                });
            }

        });

    });



    function lvl_2() {
        $("#lvl_2").css("display", "flex");
        info();
        var lvl2_check1;
        var lvl2_check2;
        console.log(lvl2_check1);
        console.log(lvl2_check2);

        $('#lvl2-h1').draggable({
            stop: function() {
                var hand1 = $("#lvl2-h1");
                var top = hand1.position().top;
                var bottom = hand1.position().bottom;
                var left = hand1.position().left;
                var width = 0.95 * parseInt(hand1.css('height'));
                var height = 0.7 * parseInt(hand1.css('width'));
                if (window.matchMedia('(max-width: 428px)').matches) {
                    width = 0.5 * parseInt(hand1.css('height'));
                }
                console.log(left);
                console.log(width);
                $(document).ready(function() {
                    if ((0 - left) >= width || (0 - top) >= height) {
                        hand1.css('left', '-3000px');
                        hand1.css('transition', '2s');
                        sound_up();
                        lvl2_check1 = true;
                        check();
                    } else {
                        lvl2_check1 = false;
                    }
                    console.log(lvl2_check1);
                    return lvl2_check1;
                });

                var check2 = lvl2_check2;
                console.log(check2);
            }

        });

        $('#lvl2-h2').draggable({
            stop: function() {
                var hand2 = $("#lvl2-h2");
                var top = hand2.position().top;
                var bottom = hand2.position().bottom;
                var left = hand2.position().left;
                var width = parseInt($(".main_game").css("width"));
                var height = 0.7 * parseInt(hand2.css('width'));
                $(document).ready(function() {
                    if (left >= (width - 0.2 * width) || (0 - top) >= height) {
                        hand2.css('left', '2000px');
                        hand2.css('transition', '2s');
                        sound_up();
                        lvl2_check2 = true;
                        check();
                    } else {
                        lvl2_check2 = false;
                    }
                    console.log(lvl2_check2);
                    return lvl2_check2;
                });

            }
        });

        function check() {
            var check1 = lvl2_check1;
            var check2 = lvl2_check2;
            if (check1 == true && check2 == true) {
                game();
                sound_bg();
                game_over = false;
                $("#info").css("display", "none");
                $(".timer").css("display", "none");
                $("#lvl_2").css("display", "none");
            }
        }


    }

    function lvl_3() {
        $("#lvl_3").css("display", "block");
        info();

        $("#line_1").css("left", $("#p1").position().left + 16 + "px");
        $("#line_1").css("top", $("#p1").position().top + 16 + "px");
        $("#line_2").css("left", $("#p2").position().left + 20 + "px");
        $("#line_2").css("top", $("#p1").position().top + 16 + "px");
        $("#line_3").css("left", $("#p4").position().left + 16 + "px");
        $("#line_3").css("top", $("#p3").position().top + 16 + "px");
        $("#line_4").css("left", $("#p1").position().left + 20 + "px");
        $("#line_4").css("top", $("#p3").position().top + 16 + "px");

        var check1 = false;
        var check2 = false;
        var check3 = false;
        $("#point_2").click(function() {
            $("#line_1").animate({
                width: $("#p2").position().left - $("#p1").position().left
            }, 1000);
            sound_up();
            check1 = true;
            return check1;
        });
        console.log(check1);

        $("#point_4").click(function() {
            if (check1 == true) {
                $("#line_2").animate({
                    height: $("#p4").position().top - $("#p2").position().top
                }, 1000);
                sound_up();
                check2 = true;
            }
            return check2;
        });

        $("#point_3").click(function() {
            if (check2 == true) {
                $("#line_3").animate({
                    width: $("#p2").position().left - $("#p1").position().left,
                    left: $("#p3").position().left + 16 + "px"
                }, 1000);
                sound_up();
                check3 = true;
            }
            return check3;
        });

        $("#point_1").click(function() {
            if (check3 == true) {
                $("#line_4").animate({
                    height: $("#p4").position().top - $("#p2").position().top,
                    top: $("#p1").position().top + 16 + "px"
                }, 1000);
                sound_up();
                setTimeout(function() {
                    $("#lvl_3").css("display", "none");
                    game();
                    sound_bg();
                    game_over = false;
                    $("#info").css("display", "none");

                }, 2000);
            }
        });
    }

    function lvl_4() {
        $("#lvl_4").css("display", "flex");
        info();
        $('#lvl4-h').draggable({
            axis: 'x'
        });
        $('#lvl4-h').on('dragstart', function() {
            $('#circle').each(function() {
                $(this).trigger('dragstart');
            });
        });
        $('#lvl4-h').on('drag', function() {
            var mainleft = $(this).css('left');

            $('#circle').each(function() {
                $(this).trigger('drag');
                $(this).addClass('ui-draggable-dragging');
                $(this).css('margin-left', parseInt(mainleft) + 0.5 * parseInt($('#lvl_4').css("width")) + 'px');
            });
            console.log(mainleft);
            if (parseInt(mainleft) >= 0) {

                $('#lvl4-h').css('draggable', 'false');
                $('#lvl4-h').css('transition', '2s');
                $('#circle').css('transition', '2s');
                $('#lvl4-h').css('left', '-100%');
                $('#circle').css("margin-left", 2 * parseInt($('#lvl_4').css("width")) + 'px');

            }

        });

        $('#lvl4-h').on('dragstop', function() {
            var mainleft = $(this).css('left');

            $('#circle').each(function() {
                $(this).trigger('dragstop');
                $(this).removeClass('ui-draggable-dragging');
                $(this).css('margin-left', parseInt(mainleft) + 0.5 * parseInt($('#lvl_4').css("width")) + 'px');
            });
            if (parseInt(mainleft) >= 0) {

                $('#lvl4-h').css('draggable', 'false');
                $('#lvl4-h').css('transition', '2s');
                $('#circle').css('transition', '2s');
                $('#lvl4-h').css('left', '-100%');
                $('#circle').css("margin-left", 2 * parseInt($('#lvl_4').css("width")) + 'px');
                setTimeout(function() {
                    $("#lvl_4").css("display", "none");
                    game();
                    sound_bg();
                    game_over = false;
                    $("#info").css("display", "none");

                }, 2000);

            }
        });
    }

    function lvl_5() {
        $("#lvl_5").css("display", "block");
        info();

        var lvl5_check1 = false;
        var lvl5_check2 = false;
        var lvl5_check3 = false;

        $("#s_1").click(function() {
            sound_up();
            if (lvl5_check1 == false) {
                $("#s_1").attr("src", "images/sublime_1_2.png");
                lvl5_check1 = true;
                check();
            } else {
                $("#s_1").attr("src", "images/sublime_1_1.png");
                lvl5_check1 = false;
            }
            return lvl5_check1;

        });

        $("#s_2").click(function() {
            sound_up();
            if (lvl5_check2 == false) {
                $("#s_2").attr("src", "images/sublime_2_2.png");
                lvl5_check2 = true;
                check();
            } else {
                $("#s_2").attr("src", "images/sublime_2_1.png");
                lvl5_check2 = false;
            }
            return lvl5_check2;
        });

        $("#s_3").click(function() {
            sound_up();
            if (lvl5_check3 == false) {
                $("#s_3").attr("src", "images/sublime_3_2.png");
                lvl5_check3 = true;
                check();
            } else {
                $("#s_3").attr("src", "images/sublime_3_1.png");
                lvl5_check3 = false;
            }
            return lvl5_check3;
        });

        function check() {
            setTimeout(function() {
                if (lvl5_check1 == true && lvl5_check2 == true && lvl5_check3 == true) {
                    $("#lvl_5").css("display", "none");
                    game();
                    sound_bg();
                    game_over = false;
                    $("#info").css("display", "none");
                    $(".timer").css("display", "none");
                }
            }, 1000);
        }

    }

    function lvl_6() {
        info();
        $("#game_container").css("display", "none");
        $(".finish").css("display", "block");
        $("#lvl_6").css("display", "block");

        $(".top_line").css("display", "none");
        $(".hline-2").css("display", "none");

        $(".bottom_line").css("display", "none");

        for (var i = 0; i < 100; i++) {
            $('#lvl_6').append('<img src="images/eye.png"  class="eye">');
            $('.eye').each(function() {
                $(this).css({
                    "left": Math.random() * 0.9 * parseInt($('#lvl_6').css("width")) - 0.05 * parseInt($('#lvl_6').css("width")),
                    "top": Math.random() * parseInt($('#lvl_6').css("height")) - 0.1 * parseInt($('#lvl_6').css("height"))
                });
            });
        }
        var check = 0;
        $(".eye").click(function() {
            $(this).css("display", "none");
            sound_up();
            check++;
            if (check == 100) {
                $("#info").css("display", "none");
                $("#lvl_6").css("display", "none");
                $("#lvl_2").css("display", "none");
            }
        });

    }

    function info() {
        $("#info").css("display", "block");
        $("#what").click(function() {
            $("#text").css("top", "20%");

            $("#close").click(function() {
                $("#text").css("top", "1000px");
            });

        });
    }

});


