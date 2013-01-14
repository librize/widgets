# Widgets for Librize.com

ここでは、リブライズ向けのウィジェットを公開しています。[サンプルページはこちら](http://librize.github.com/widgets/sample.html)。

## 新刊本ウィジェット

Librizeに最近登録された書籍を表示します。

ウィジェットを使うには、jQueryとlatest.jsが必要です。次の2行をHTMLのHEADに書きます。(BODYの最後でも構いません)

```html
<script src="http://code.jquery.com/jquery-1.7.js"></script>
<script src="http://librize.github.com/widgets/js/latest.js"></script>
```

新刊本を並べたいところに次のように書きます。```data-bookspot```はブックスポットのユニークURL(またはID)です。(※後述)


```html
<div class="librize-widget latest" data-bookspot="osscafe"></div>
```

HTML全体としては下記のようになるでしょう。

```html
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title>Widget for Librize.com</title>
	<meta name="keywords" content="" />
	<meta name="description" content="" />
	<script src="http://code.jquery.com/jquery-1.7.js"></script>
	<script src="http://librize.github.com/widgets/js/latest.js"></script>
</head>
<body>
	<h1>新刊本ウィジェットの使い方</h1>
	<h2>場所を指定 (必須)</h2>
	<div class="librize-widget latest" data-bookspot="osscafe"></div>
</body>
</html>
```

### ブックスポット

* 必須項目 : YES
* 個別指定 : data-bookspot 属性

ブックスポットのユニークURLは、リブライズのサイトでURLを見ると分かります。例えば、[下北沢オープンソースCafe](http://librize.com/osscafe)の場合「osscafe」を指定します。以下いくつかの場所の例を挙げます。

* 下北沢オープンソースCafe http://librize.com/osscafe →「osscafe」を指定
* Office7F http://librize.com/office7F →「office7F」を指定

ユニークURLを取得していない場合は、下記のように数字を指定します。

* PAX Coworking http://librize.com/places/2 →「2」を指定
* ZEN Coworking http://librize.com/places/6 →「6」を指定

```html
<div class="librize-widget latest" data-place="5"></div>
```

**※ユニークURLついて** : 2012年10月のアップデートで、 http://librize.com/osscafe のようなユニークURLが使えるようになりました。蔵書が29冊以上になると、設定できます。

### 表示する冊数

* 必須項目 : NO
* デフォルトの値 : 5
* 個別指定 : data-limit 属性

```html
<div class="librize-widget latest" data-place="5" data-limit="3"></div>
```

### 表紙画像の縦サイズ (px)

* 必須項目 : NO
* デフォルトの値 : 75
* 個別指定 : data-height 属性

```html
<div class="librize-widget latest" data-place="5" data-height="180"></div>
```

### 表示のテーマ

* 必須項目 : NO
* デフォルトの値 : simple
* 個別指定 : data-theme 属性

現在、設定可能なのは「simple」または「none」のふたつです。

なお、「none」を指定した場合は、CSSスタイルが適用されません。埋め込むサイトのCSSで見た目を調整して下さい。

```html
<div class="librize-widget latest" data-place="5" data-theme="none"></div>
```

### 複数表示するには?

使いたいところに、DIVを並べればOK。(1画面に複数のウィジェットを配置して問題ありません)

```html
<h2>下北沢オープンソースCafe</h2>
<div class="librize-widget latest" data-place="3"></div>
<h2>原宿テラス</h2>
<div class="librize-widget latest" data-place="5"></div>
```