//形式を定数化
const Camel = 0;
const UpperCamel = 1;
const LowerCamel = 2;
const Snake = 3;

//検索用正規表現
const CamelReg = /_[a-z]/g;
const SnakeReg = /[A-Z]/g;

//textareaの値変更イベント
$("#txtarea_input").bind("input propertychange",function(){
    convertSwitch();
});

//チェックの変更イベント
$("input[name=convert_mode]").change(function(){
    convertSwitch();
});

/**
 * 変換モード判定
 */
function convertSwitch(){
    //ラヂオボタンの値
    const convertMode = $('input[name=convert_mode]:checked').attr('id');
    
    switch(convertMode){
        //スネークからローワーキャメル
        case "snake_to_Lcamel":
            convert(Snake, LowerCamel);
        break;

        //スネークからアッパーキャメル
        case "snake_to_Ucamel":
            convert(Snake, UpperCamel);
        break;

        //キャメルからスネーク
        case "camel_to_snake":
            convert(Camel, Snake);
        break;
    }
}

/**
 * 変換処理
 * @param {*} from 変換前の形式
 * @param {*} to  変換後の形式
 */
function convert(from, to){

    let text = $('#txtarea_input').val();

    //スネーク→キャメル
    if(from === Snake){

        if(text.match(CamelReg)){

            let matchArray = text.match(CamelReg);

            //該当箇所を置換
            $.each(matchArray,function(index, match){
                let regTxt = match.toUpperCase();
                text = text.replace(match, regTxt);
            })

            //アンダーバー削除
            text = text.replace(/_/g, "");

            //先頭文字置換
            if(to === LowerCamel){
                text = text.charAt().toLowerCase() + text.slice(1);
            }else if (to === UpperCamel){
                text = text.charAt().toUpperCase() + text.slice(1);
            }
        }

    //キャメル→スネーク
    }else if(from === Camel){

        if(text.match(SnakeReg)){

            let matchArray = text.match(SnakeReg);

            //該当箇所を置換
            $.each(matchArray,function(index, match){
                let regTxt =  "_" + match.toLowerCase();
                text = text.replace(match,regTxt);
            })

            //先頭のアンダーバー削除
            if(text.charAt() === "_") text =  text.slice(1);
        }
    }

    //テキストを設定
    $('#txtarea_result').val(text);
}