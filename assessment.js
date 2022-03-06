'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
assessmentButton.onclick = () => {
    const userName = userNameInput.value;

    if (userName.length === 0) {
        return;
    }
    resultDivided.innerText = "";
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
//tweetエリアの作成
    tweetDivided.innerText = "";
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + 
    encodeURIComponent('お前のいいところ診断してやるわ') + 
    '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'tweet #お前の良いところ診断するわ';
    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();//()を付けると関数の中身を呼び出せる。
    }
};

const answers = [
    '{userName}の良いところはありません、日々無力を感じながら生きてください。',
    '{userName}は目が綺麗です！ ですがそれ以外良いところはありません。',
    '{userName}ってとってもユニークですね！でもそれは変人って思われてる証拠、{userName}は皆と距離を置かれていると感じませんか？',
    '{userName}は忍耐力がありますね。それだけです。',
    '{userName}は感受性が豊かですね、でも豊かすぎると「面倒な人」になってしまうので気をつけましょう。',
    '{userName}は馬鹿です、空気が読めません。ですが、側から見れば楽しい人なので芸人を目指してはいかがでしょうか？',
    '{userName}はとてもイケています、みんなの人気者なんでしょうね。ですが人から恨みを買われている可能性もあるので夜道には気をつけましょう。',
    '{userName}、あなたは完璧な人間です。とてもモテモテで、勉強もできて、親に恵まれていて、お金も持っていて、日々ハーレムを享受して...え？真逆だって？',
    '{userName}は普通の人です、普通。',
    '{userName}最強！！！！！！！{userName}最強！！！！！！！{userName}最強！！！！！！！{userName}最強！！！！！！！{userName}最強！！！！！！！{userName}最強！！！！！！！{userName}最強！！！！！！！',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}はゴミです、人間のクズ。生きている意味はありません。...というような事を言ってくる人は、{userName}の近くには居ません。周囲の人間に恵まれていますね。',
    '{userName}君さぁ...空気読んでよ...',
    '{userName}さん、名前で遊ばないでください'
];

function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll('{userName}', userName);
  return result;
}