## MVP の機能開発

自分がこのプログラムをスクラム開発するつもりで実装していく。

ユースケースは cli と web で共通化できるのか？

- input port と output port の意義がここにある。この port で UseCase が入出力先を意識しないようにする

集約ごとにユースケース作成 -> PHP のような言語では向かない。TSだとメソッドごとにテストファイルを分けるとよさそう
１ユースケース1集約　→ メリット・デメリット両方あり

フロントでは、1コンポーネント 1 fetcher にする。ページ単位でデータを取得する QueryService は作らない
`EmployeeListQueryService`など、コンポーネント名 + QueryService と命名する
-> 全部にcontainer を作る？
-> server component だけでいいものは、client component（presentation component は不要）

zod のエラーにちゃんと対処する。ここはフォームごとのエラーじゃなくて、string[] に変換して、フォームの上にエラーメッセージを出すもいいと思う。

### 11.22

やること

- [x] cli の use case を CliCommand + use case に置き換える（上から順番に）
- [x] cli の scenario から query service を抽出する

## 11.23

細かいリファクタ

- [x] EmployeeId, DeveloperId 型などを作る
- [x] ID を Id 型にする
- [x] コマンド名を刷新する
- [x] web/query-service で page 単位のものをコンポーネント単位に変更する

  - web の xxx page query service を廃止する

- [x] lint を入れて不要なモジュールを削除する
- [x] prettier を入れる

- [ ] テストを書く（全部）
- [ ] Output Port について考えて決める
- [x] Po, Sm, Dev の getId を getEmployeeId にリファクタする

### 完了したページ

2023.11.18

- [ ] チームページ（/team）
- [x] チーム編集ページ（/team/edit）
- [x] 社員一覧ページ（/employees）

コンポーネント

---

- [ ] esbuild watch のログを出す

- [ ] UseCase に応じてパッケージを分ける
  - web -> Next.js
    - パワプロっぽくなるかも？「コマンドが一覧になっている。時間が経つとコマンドが変わる。コマンドを選択すると時間が経つ」
  - CLI -> 何かしらのツール
    - 保存先はローカルファイル
